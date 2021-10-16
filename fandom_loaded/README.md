`fandom_loaded` are scripts that are converted to JS and uploaded to a MediaWiki: page. To help make these scripts more readable for JS review, there's a few unspoken rules:

* No `async`, `await` - use normal promises (e.g. `.then`)
* Run `prettier` on the built JS before copying to the wiki
* No importing or exporting modules.

## Development
Tampermonkey:

```
// ==UserScript==
// @name         gdmdashboard.js
// @version      2.0
// @description  GDMDashboard
// @author       Noreplyz
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @match        https://discussions.fandom.com/wiki/Data:Dashboard*
// @resource g1  file:///C:/Users/<path-to>/GDMDashboard/dist/fandom_loaded/gdmdashboard.js
// @run-at       document-idle
// ==/UserScript==

;(function() {
    console.log('Loading Tampermonkey scripts for GDMDashboard');
    function checkmwLoad() {
        if (typeof mw !== 'undefined' && typeof mw.hook !== 'undefined') {
            eval(GM_getResourceText('g1'));
        }
    }
    setTimeout(checkmwLoad, 1000);
})();
```