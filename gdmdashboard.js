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
    GDMD.LANGUAGES = [
        'de',
        'en',
        'es',
        'fr',
        'id',
        'it',
        'ja',
        'ko',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'vi',
        'zh',
        'zh-hk'
    ];
    GDMD.wikis = [];

    GDMD.discussionAPI = 'https://services.wikia.com/discussion/';

    /* View */
    GDMD.templates = {};

    GDMD.templates.search = 
        '<div class="gdm-dashboard-search">' +
            '<p class="tag">Search for a Community:</p>' +
            '<input type="text" id="gdm-dashboard-search-input" placeholder="Community url">' +
            '<a class="wds-button" id="gdm-dashboard-search-button" value="Search">' +
                '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21">' +
            '</a>' +
        '</div>';
    GDMD.templates.filters =
        '<p class="tag">Filter:</p>' +
        '<div id="filter-languages" class="wds-dropdown">' +
            '<div class="gdm-dashboard-filter wds-button wds-is-secondary wds-dropdown__toggle">' +
                'Lang:&nbsp;<span class="filter-default">All</span>' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"></use></svg>' +
            '</div>' +
            '<div class="wds-dropdown__content wds-is-left-aligned wds-is-right-aligned">' +
                '<ul class="wds-list wds-is-linked">' +
                    '<li><a><label class="filter-language" data-cat="all"><input type="checkbox" checked/>all</label></a></li>' +
                    '{{#languages}}<li><a><label class="filter-language" data-cat="{{.}}"><input type="checkbox" />{{.}}</label></a></li>{{/languages}}' +
                '</ul>' +
            '</div>' +
        '</div>' +
        '&nbsp;<div id="filter-hubs" class="wds-dropdown">' +
            '<div class="gdm-dashboard-filter wds-button wds-is-secondary wds-dropdown__toggle">' +
                'Hub:&nbsp;<span class="filter-default">All</span>' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"></use></svg>' +
            '</div>' +
            '<div class="wds-dropdown__content wds-is-left-aligned">' +
                '<ul class="wds-list wds-is-linked">' +
                    '<li><a><label class="filter-hub" data-cat="all"><input type="checkbox" checked />All</label></a></li>' +
                    '{{#hubs}}<li><a><label class="filter-hub" data-cat="{{.}}"><input type="checkbox" />{{.}}</label></a></li>{{/hubs}}' +
                '</ul>' +
            '</div>' +
        '</div>';
    GDMD.templates.dashboardTable = 
        '<table class="article-table sortable">' +
            '<thead>' +
                '<th>Wiki</th>' +
                '<th>Language</th>' +
                '<th>Hub</th>' +
                '<th>Local mod actions</th>' +
                '<th>Global mod actions</th>' +
                '<th>Unreviewed reports</th>' +
            '</thead>' +
            '<tbody>' +
                '{{#wikis}}' +
                    '<tr>' +
                        '{{#exists}}' +
                            '<td><a href="http://{{url}}/d" target="_blank">{{wikiname}}</a></td>' + 
                            '<td>{{lang}}</td>' + 
                            '<td>{{hub}}</td>' + 
                            '<td><a href="http://{{url}}/d/m/insights/moderations" target="_blank">{{modCount}}</a></td>' + 
                            '<td>{{nonModCount}}</td>' + 
                            '<td><a href="http://{{url}}/d/reported" target="_blank">{{totalReports}}</a></td>' + 
                        '{{/exists}}' +
                    '</tr>' +
                '{{/wikis}}' +
                '{{#nowikis}}<tr><td colspan="6" style="text-align:center">No wikis found with unreviewed reports and the applied filters.</td></tr>{{/nowikis}}' +
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
                return null;
            }
            for (var pageid in data.query.pages) {
                if (!data.query.pages[pageid] || !data.query.pages[pageid].revisions ||
                    !data.query.pages[pageid].revisions.length) {
                        console.warn('Could not get page ' + page);
                        return null;
                    }
                return data.query.pages[pageid].revisions[0]['*'];
            }
        });
    };

    GDMD.showWikis = function() {
        // Get filters for language
        var languageFilters = [];
        var noLanguageFilters = true;
        $('#filter-languages input:checkbox').each(function() {
            if ($(this).attr('checked') && $(this).parent().attr('data-cat') !== 'all') {
                languageFilters.push($(this).parent().attr('data-cat'));
                noLanguageFilters = false;
            }
        });

        // Get filters for hub
        var hubFilters = [];
        var noHubFilters = true;
        $('#filter-hubs input:checkbox').each(function () {
            if ($(this).attr('checked') && $(this).parent().attr('data-cat') !== 'all') {
                if ($(this).parent().attr('data-cat') === 'None') {
                    hubFilters.push("");
                }
                hubFilters.push($(this).parent().attr('data-cat'));
                noHubFilters = false;
            }
        });

        var shownWikis = GDMD.wikis.filter(function(wiki) {
            if (noLanguageFilters && noHubFilters) return true;
            if (noLanguageFilters) {
                return (hubFilters.indexOf(wiki.hub) >= 0);
            }
            else if (noHubFilters) {
                return (languageFilters.indexOf(wiki.lang) >= 0);
            } else {
                return (hubFilters.indexOf(wiki.hub) >= 0) && (languageFilters.indexOf(wiki.lang) >= 0);
            }
        });
        var table = $(Mustache.render(GDMD.templates.dashboardTable, {
            wikis: shownWikis,
            nowikis: shownWikis.length == 0 ? true : false
        }));
        $('#gdm-dashboard').empty().append(table);
        mw.loader.using('jquery.tablesorter', function () {
            table.tablesorter();
        });
    }

    GDMD.init = function () {
        // TODO: Add search box
        // $('#gdm-dashboard-search').empty().append(Mustache.render(GDMD.templates.search));
        var year = new Date().getUTCFullYear();
        var month = new Date().getUTCMonth();
        $.when(GDMD.getPageContents(GDMD.PAGES.OVERVIEW + year + ' ' + GDMD.MONTHS[month])).then(function(content) {
            var badDatePromise = $.Deferred().resolve(content);
            if (content === null) {
                month = month === 0 ? 11 : month - 1;
                if (month == 11) year -= 1;
                badDatePromise = GDMD.getPageContents(GDMD.PAGES.OVERVIEW + year + ' ' + GDMD.MONTHS[month]);
            }
            $.when(badDatePromise).then(function (content) {
                var wikis = content.split('\n');
                var hubs = [];
                wikis.forEach(function (wiki, i) {
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
                    if (hubs.indexOf(logComponents[3]) < 0) {
                        hubs.push(logComponents[3]);
                    }
                });
                $('#gdm-dashboard-loading').remove();
                $('#gdm-dashboard-search').append(Mustache.render(GDMD.templates.filters, {
                    languages: GDMD.LANGUAGES,
                    hubs: hubs
                }));
                GDMD.addFilterEvents();
                GDMD.wikis = wikis;
                GDMD.wikis.sort(function (a, b) {
                    return parseInt(b.totalReports) - parseInt(a.totalReports);
                })
                GDMD.showWikis();
            });
        });
    };

    GDMD.addFilterEvents = function() {
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content label[data-cat="all"] input:checkbox', function () {
            if (!this.checked) {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
            } else {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
                $(this).attr('checked', 'checked');
            }
        });
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content label[data-cat!="all"] input:checkbox', function () {
            if ($(this).closest('.wds-dropdown').find('label[data-cat="all"] input:checkbox').attr('checked')) {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
                $(this).attr('checked', 'checked');
            }
        });
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content input:checkbox', function () {
            var languageFilters = [];
            $('#filter-languages input:checkbox').each(function () {
                if ($(this).attr('checked')) {
                    languageFilters.push($(this).parent().attr('data-cat'));
                }
            });
            $('#filter-languages .filter-default').text(languageFilters.join(', '));
            var hubFilters = [];
            $('#filter-hubs input:checkbox').each(function () {
                if ($(this).attr('checked')) {
                    hubFilters.push($(this).parent().attr('data-cat'));
                }
            });
            $('#filter-hubs .filter-default').text(hubFilters.join(', '));
            GDMD.showWikis();
        });
    }

    GDMD.init();

})(window, jQuery, mediaWiki, window.Mustache);