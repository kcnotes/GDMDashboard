import requests
import json
from secrets import password


class GDMBot(object):
    """
    GDMBot constructor
    """

    def __init__(self):
        self.site = None
        self.session = None
        self.username = 'Noreports'
        self.pw = password
        self.ua = 'GDMDashboard/1.0, Discussions Reports Bot'
        self.startDate = None
        self.wikis = {}
        self.lastWiki = 0

        self.datauser = 'Noreports'
        self.datapass = password
        self.datasession = None

    def login(self):
        """
        Log in to Wikia via services, requires discussions rights
        """
        login_session = requests.Session()
        result = login_session.post('https://services.wikia.com/auth/token', data={
            'username': self.username,
            'password': self.pw
        })
        cookie = ''
        try:
            cookie = 'access_token=' + result.json()['access_token']
        except KeyError:
            print(
                'Could not log in, username or password incorrect. Please check config.py')
            exit()

        cj = requests.utils.cookiejar_from_dict(
            dict(p.split('=') for p in cookie.split('; ')))

        # Place user agent and login cookie
        self.session = requests.Session()
        self.session.cookies = cj
        self.session.headers.update({'User-Agent': self.ua})

    def datalogin(self):
        """
        Log in to Wikia via services for discussions.fandom.com edits
        """
        login_session = requests.Session()
        result = login_session.post('https://services.wikia.com/auth/token', data={
            'username': self.datauser,
            'password': self.datapass
        })
        cookie = ''
        try:
            cookie = 'access_token=' + result.json()['access_token']
        except KeyError:
            print(
                'Could not log in, username or password incorrect. Please check config.py')
            exit()

        cj = requests.utils.cookiejar_from_dict(
            dict(p.split('=') for p in cookie.split('; ')))

        # Place user agent and login cookie
        self.datasession = requests.Session()
        self.datasession.cookies = cj
        self.datasession.headers.update({'User-Agent': self.ua})
        # TODO: Complete this function
    
    def checkLoggedIn(self):
        userinfo = self.session.get('https://services.wikia.com/whoami')
        return 'userId' in userinfo.json()

    def _getReportedPosts(self, id):
        req = self.session.get('https://services.wikia.com/discussion/' + str(id) + '/posts', params={
            'reported': 'true'
        })
        data = req.json()
        if 'postCount' in data:
            return data
        return None

    def _getModActions(self, id, days):
        req = self.session.get('https://services.wikia.com/discussion/' + str(id) + '/leaderboard/moderator-actions', params={
            'days': days
        })
        data = req.json()
        return data

    def _getTopWAM(self, offset):
        if not self.startDate:
            dates = self.session.get(
                'http://www.wikia.com/api/v1/WAM/MinMaxWamIndexDate')
            self.startDate = dates.json()['min_max_dates']['max_date']

        wams = self.session.get('https://www.wikia.com/api/v1/WAM/WAMIndex', params={
            'vertical_id': 0,
            'sort_column': 'wam',
            'sort_direction': 'DESC',
            'limit': 20,
            'fetch_admins': 'false',
            'fetch_wiki_images': 'false',
            'wam_day': self.startDate,
            'offset': offset
        })
        return wams.json()
    
    def _getWikiDomains(self, fromWiki, amount):
        wikis = self.session.get('https://www.wikia.com/api.php', params={
            'action': 'query',
            'list': 'wkdomains',
            'wkfrom': fromWiki,
            'wkto': fromWiki + amount,
            'format': 'json'
        })
        return wikis.json()
    
    def recordReports(self):
        """
        Record report count into CSV file
        """
        for id, wiki in self.wikis.items():
            id = id.rstrip()
            reports = self._getReportedPosts(id)
            if reports:
                wiki['totalReports'] = reports['postCount']
            else:
                wiki['exists'] = False

    def recordModActions(self):
        for id, wiki in self.wikis.items():
            if not wiki['exists']:
                continue
            modCount = {
                'badge:threadmoderator': 0,
                'badge:sysop': 0,
                'badge:vstf': 0,
                'badge:global-discussions-moderator': 0,
                'badge:staff': 0,
                'badge:helper': 0
            }
            totalCount = 0
            actions = self._getModActions(id, 30)
            if actions and 'users' in actions:
                for user in actions['users']:
                    # Sum up counts
                    totalCount += int(user["totalCount"])
                    if user["userInfo"]["badgePermission"] is '':
                        continue
                    modCount[user["userInfo"]["badgePermission"]
                             ] += int(user["totalCount"])
                wiki['modCount'] = modCount['badge:threadmoderator'] + \
                    modCount['badge:sysop']
                wiki['nonModCount'] = totalCount - wiki['modCount']

    def getTopWikis(self, i):
        wikis = self._getTopWAM(i)
        for id in wikis['wam_index']:
            self.wikis[id] = {
                'wiki': wikis['wam_index'][id]['url'],
                'modCount': 0,
                'nonModCount': 0,
                'totalReports': 0,
                'exists': True
            }
    
    def getAllWikis(self, fromWiki, amount):
        wikis = self._getWikiDomains(fromWiki, amount)
        for id, wiki in wikis['query']['wkdomains'].items():
            self.wikis[id] = {
                'wiki': wiki['domain'],
                'modCount': 0,
                'nonModCount': 0,
                'totalReports': 0,
                'exists': True
            }

    def recordToWiki(self):
        """
        For recording data, use another account (if required)
        """
        with open("data/reports.csv", "a") as dataFile:
            for id, wiki in self.wikis.items():
                if not wiki['exists']:
                    continue
                dataFile.write(str(id) + ',' + wiki['wiki'] + ','
                               + str(wiki['modCount']) + ',' +
                               str(wiki['nonModCount']) + ','
                               + str(wiki['totalReports']) + '\n')
        del self.wikis
        self.wikis = {}


if __name__ == '__main__':
    bot = GDMBot()
    bot.login()
    i = 1
    while i < 1932083:
        if not bot.checkLoggedIn():
            bot.login()
        # bot.getTopWikis(i)
        bot.getAllWikis(i, 50)
        bot.recordReports()
        bot.recordModActions()
        bot.recordToWiki()
        print('Done recording, offset ' + str(i))
        i = i + 50
