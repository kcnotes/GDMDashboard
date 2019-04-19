import requests
import json
import re
import os
from datetime import datetime
from qa import ignorewikis
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
        self.ua = 'GDMDashboardBot/1.0, Discussions Reports Bot'
        self.startDate = None
        self.wikis = {}
        self.lastWiki = 0

        self.datajson = 'data/wikiinfo.json'

        self.datauser = 'Noreports'
        self.datapass = password
        self.datawiki = 'https://discussions.fandom.com'
        self.datarootpage = 'Data:Overview/'
        self.datasummary = 'Automatic: Updating GDMDashboard data'
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
    
    def checkLoggedIn(self):
        userinfo = self.session.get('https://services.wikia.com/whoami')
        return 'userId' in userinfo.json()

    def checkDataLoggedIn(self):
        userinfo = self.datasession.get('https://services.wikia.com/whoami')
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
    
    def _getWikiDomains(self, fromWiki, amount):
        wikis = self.session.get('https://www.wikia.com/api.php', params={
            'action': 'query',
            'list': 'wkdomains',
            'wkfrom': fromWiki,
            'wkto': fromWiki + amount,
            'format': 'json'
        })
        return wikis.json()

    def _getBasicWikiData(self, url):
        req = self.session.get('https://www.wikia.com/api/v1/Wikis/ByString', params={
            'string': url,
            'includeDomain': 'true'
        })
        data = req.json()
        if data['items']:
            for wiki in data['items']:
                if wiki['domain'].lower() == url.lower():
                    return wiki
        return None
    
    def recordReports(self):
        """
        Record report count into CSV file
        """
        for url, wiki in self.wikis.items():
            wikiid = wiki['id'].rstrip()
            reports = self._getReportedPosts(wikiid)
            if reports:
                wiki['exists'] = True
                wiki['totalReports'] = reports['postCount']
            else:
                wiki['exists'] = False

    def recordModActions(self):
        for url, wiki in self.wikis.items():
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
            actions = self._getModActions(wiki['id'], 30)
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
            else:
                wiki['modCount'] = 0
                wiki['nonModCount'] = 0
    
    def getAllWikis(self, fromWiki, amount):
        wikis = self._getWikiDomains(fromWiki, amount)
        for wikiid, wiki in wikis['query']['wkdomains'].items():
            self.wikis[wiki['domain']] = {
                'wiki': wiki['domain'],
                'id': wikiid,
                'modCount': 0,
                'nonModCount': 0,
                'totalReports': 0,
                'exists': True
            }

    def recordReportsToCSV(self):
        """
        For recording data, use another account (if required)
        """
        with open("data/reports.csv", "a") as dataFile:
            for url, wiki in self.wikis.items():
                if url in ignorewikis:
                    continue
                if not wiki['exists']:
                    continue
                dataFile.write('*' + str(wiki['id']) + '|' + str(wiki['domain']) + '|'
                               + str(wiki['name']) + '|' + str(wiki['hub']) + '|' 
                               + str(wiki['language']) + '|' 
                               + str(wiki['modCount']) + '|'
                               + str(wiki['nonModCount']) + '|'
                               + str(wiki['totalReports']) + '\n')
        del self.wikis
        self.wikis = {}

    def recordReportsToWiki(self):
        """
        For recording data, use another account (if required)
        """
        text = ""
        for url, wiki in sorted(self.wikis.items()):
            if url in ignorewikis:
                continue
            if not wiki['exists']:
                continue
            text += ('*' + str(wiki['id']) + '|' + str(wiki['domain']) + '|'
                        + str(wiki['name']) + '|' + str(wiki['hub']) + '|' 
                        + str(wiki['language']) + '|' 
                        + str(wiki['modCount']) + '|'
                        + str(wiki['nonModCount']) + '|'
                        + str(wiki['totalReports']) + '\n')
        
        text += '[[Category:Dashboard overview data]]'
        if not self.datasession or self.checkDataLoggedIn():
            self.datalogin()
        tokendata = self.datasession.get(self.datawiki + '/api.php', params={
            'action': 'query',
            'prop': 'info',
            'titles': 'Main Page',
            'intoken': 'edit',
            'format': 'json'
        }).json()
        token = ''
        for key in tokendata['query']['pages']:
            token = tokendata['query']['pages'][key]['edittoken']
        
        today = datetime.utcnow().date()
        self.datasession.post(self.datawiki + '/api.php', data={
            'action': 'edit',
            'title': self.datarootpage + today.strftime("%Y") + ' ' + today.strftime("%B"),
            'summary': self.datasummary,
            'text': text,
            'token': token
        })
        
        del self.wikis
        self.wikis = {}
    
    def getWikisReportsLog(self):
        """
        Gets from discussionsreports.log
        Returns a unique set of wikis
        """
        try:
            with open("discussionsreports.log", "r") as dataFile:
                urls = []
                for line in dataFile:
                    line = line.rstrip()
                    if not line: continue
                    wikiurl = re.search(r"https?:\/\/(.*?)\/d\/p\/", line)
                    if wikiurl is not None and wikiurl.group(1) not in urls:
                        if wikiurl.group(1) in ignorewikis:
                            continue
                        urls.append(wikiurl.group(1))
                return urls
            return None
        except FileNotFoundError as e:
            return None
    
    def deleteWikisReportsLog(self):
        """
        Deletes discussionsreports.log
        """
        if os.path.isfile('discussionsreports.log'):
            os.remove('discussionsreports.log')
        else:
            print('Error: discussionsreports.log was not found and was not deleted.')

    def storeNewWikiData(self, urls):
        """
        Store a 'cache' of basic data for new wikis
        TODO: clear this data later
        """
        if not urls:
            urls = []
        data = None
        with open(self.datajson, 'r') as jsonFile:
            data = json.load(jsonFile)
            for url in urls:
                if url not in data['items']:
                    if not self.checkLoggedIn():
                        self.login()
                    print('New url: ' + url)
                    wiki = self._getBasicWikiData(url)
                    if wiki:
                        data['items'][url] = wiki
        
        if data:
            with open(self.datajson, 'w') as jsonFile:
                jsonFile.write(json.dumps(data, indent=4, sort_keys=True))
        
        return data

def getAllWikiReports():
    """
    Gets all wikis with reports
    """
    bot = GDMBot()
    bot.login()
    i = 1
    while i < 1932083:
        if not bot.checkLoggedIn():
            bot.login()
        bot.getAllWikis(i, 500)
        bot.recordReports()
        bot.recordModActions()
        bot.recordReportsToCSV()
        print('Done recording, offset ' + str(i))
        i = i + 50


# Loop through new reports
# If report not in url.csv:
#     add to the list (site name, ID, topic)
# get wiki info of all URLs (discussions, admins, wam, activeUsers)
# get modCount, nonModCount and totalReports
# write straight to wiki

# If new month, delete wikis with 0 reports?

if __name__ == '__main__':
    bot = GDMBot()
    bot.login()
    urls = bot.getWikisReportsLog()
    bot.deleteWikisReportsLog()
    print('Logs recorded and deleted')
    wikiData = bot.storeNewWikiData(urls)
    bot.wikis = wikiData['items']
    bot.recordReports()
    bot.recordModActions()
    print('Data all collected')
    bot.recordReportsToWiki()
