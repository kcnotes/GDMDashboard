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
                '<th>Wiki ID</th>' +
                '<th>Wiki URL</th>' +
                '<th>Mod actions</th>' +
                '<th>Staff/GDM actions</th>' +
                '<th>Reports</th>' +
            '</thead>' +
            '<tbody>' +
                '{{#wikis}}' +
                    '<tr>' +
                        '{{#.}}<td>{{.}}</td>{{/.}}' +
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
                wikis[i] = wiki.split(',');
                wikis[i][0] = wikis[i][0].replace('*', '');
            });
            var table = $(Mustache.render(GDMD.templates.dashboardTable, {
                wikis: wikis
            }));
            $('#gdm-dashboard').append(table);
        });
    };

    GDMD.init();

    // Debugging
    window.GDMD = GDMD;

})(window, jQuery, mediaWiki, window.Mustache);