/**
 * <nowiki>
 * Dashboard for Global Discussions Moderators
 * 
 * @author Noreplyz
 */

 ;(function(window, $, mw, Mustache) {
    if (window.GDMDashboardLoaded) return;
    if ($('#gdm-dashboard').length == 0) return;
    var groups = mw.config.get('wgUserGroups');
    if (groups.indexOf('staff') < 0 && groups.indexOf('vstf') < 0
        && groups.indexOf('helper') < 0 && groups.indexOf('global-discussions-moderator') < 0) {
            $('#gdm-dashboard').append('You do not have sufficient rights to use this tool.');
        }
    window.GDMDashboardLoaded = true;
    
    var GDMD = {};

    /* Pages */
    GDMD.PAGES = {
        OVERVIEW: 'Data:Overview',
        REPORTS: 'Data:Reports'
    };

    GDMD.discussionAPI = 'https://services.wikia.com/discussion/';

    // Debugging
    window.GDMD = GDMD;
    
 })(window, jQuery, mediaWiki, window.Mustache);