/**
 * <nowiki>
 * Dashboard for Global Discussions Moderators
 * 
 * @author Noreplyz
 */

;(function (window, $, mw, Mustache) {
    // if (window.GDMDashboardLoaded) return;
    if ($('#gdm-dashboard').length == 0) return;
    var groups = mw.config.get('wgUserGroups');
    if (groups.indexOf('staff') < 0 && groups.indexOf('vstf') < 0 &&
        groups.indexOf('helper') < 0 && groups.indexOf('global-discussions-moderator') < 0) {
        $('#gdm-dashboard').append('You do not have sufficient rights to use this tool.');
    }
    window.GDMDashboardLoaded = true;

    var GDMD = {};

    /* Pages */
    GDMD.PAGES = {
        OVERVIEW: 'Data:Overview/'
    };
    GDMD.MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    GDMD.discussionAPI = 'https://services.wikia.com/discussion/';

    /* View */
    GDMD.templates = {};

    // TODO: Change array in array to object
    GDMD.templates.dashboardTable = 
        '<table class="article-table sortable">' +
            '<thead>' +
                '<th>Wiki</th>' +
                '<th>Language</th>' +
                '<th>Hub</th>' +
                '<th>Mod actions</th>' +
                '<th>Our actions</th>' +
                '<th>Unreviewed reports</th>' +
            '</thead>' +
            '<tbody>' +
                '{{#wikis}}' +
                    '<tr>' +
                        '{{#.}}{{#exists}}' +
                            '<td><a href="http://{{url}}/d" target="_blank">{{wikiname}}</a></td>' + 
                            '<td>{{lang}}</td>' + 
                            '<td>{{hub}}</td>' + 
                            '<td>{{modCount}}</td>' + 
                            '<td>{{nonModCount}}</td>' + 
                            '<td>{{totalReports}}</td>' + 
                        '{{/exists}}{{/.}}' +
                    '</tr>' +
                '{{/wikis}}' +
            '</tbody>' +
        '</table>';

    /**
     * Get a page's wikitext
     * @param {String} page the page to get wikitext from
     * @return {Promise} jQuery Promise
     */
    GDMD.getPageContents = function (page) {
        return $.ajax({
            url: '/api.php',
            type: 'GET',
            format: 'json',
            data: {
                action: 'query',
                prop: 'revisions',
                titles: page,
                rvprop: 'content',
                cb: Math.random(),
                format: 'json'
            }
        }).then(function(data) {
            if (!data.query || !data.query.pages) {
                console.warn('Could not get page ' + page);
                return;
            }
            for (var pageid in data.query.pages) {
                if (!data.query.pages[pageid] || !data.query.pages[pageid].revisions ||
                    !data.query.pages[pageid].revisions.length) {
                        console.warn('Could not get page ' + page);
                        return;
                    }
                return data.query.pages[pageid].revisions[0]['*'];
            }
        });
    };

    GDMD.init = function () {
        var year = new Date().getUTCFullYear();
        var month = new Date().getUTCMonth();
        $.when(GDMD.getPageContents(GDMD.PAGES.OVERVIEW + year + ' ' + GDMD.MONTHS[month])).then(function(content) {
            var wikis = content.split('\n');
            wikis.forEach(function(wiki, i) {
                var logComponents = wiki.split('|');
                if (!logComponents[0].startsWith('*')) {
                    wikis[i] = {
                        exists: false
                    };
                    return;
                }
                wikis[i] = {
                    wikiid: logComponents[0].replace('*\s?', ''),
                    url: logComponents[1],
                    wikiname: logComponents[2],
                    hub: logComponents[3] == 'None' ? '' : logComponents[3],
                    lang: logComponents[4],
                    modCount: logComponents[5],
                    nonModCount: logComponents[6],
                    totalReports: logComponents[7],
                    exists: true
                };
            });
            var table = $(Mustache.render(GDMD.templates.dashboardTable, {
                wikis: wikis
            }));
            $('#gdm-dashboard').append(table);
            mw.loader.using('jquery.tablesorter', function () {
                table.tablesorter();
            });
        });
    };

    GDMD.init();

    // Debugging
    window.GDMD = GDMD;

})(window, jQuery, mediaWiki, window.Mustache);