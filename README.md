# GDMDashboard

Dashboard for Global Discussions Moderators on Fandom, available at https://discussions.fandom.com/wiki/Data:Dashboard. 

## How it works

* IRC relay code is used to send JSON in the `find:raw` schema to GDMDashboard in `src/report_handler.ts`.
* `src/upload_data.ts` is automatically run daily to process data in an sqlite3 database update all the report numbers in the wiki. It will edit the appropriate page on the Discussions Wiki.
* `gdmdashboard.js` is run on the Discussions Wiki and provides the [Dashboard interface](https://discussions.fandom.com/wiki/Data:Dashboard). It manipulates the [raw logs](https://discussions.fandom.com/wiki/Data:Overview) to a sortable table format.

## Setup

Build the TypeScript (e.g. `tsc`).

1. Run `dist/populate_wikis.js` - fast
2. Run `dist/populate_reports.js` - hours long. It goes through all wikis to check for reports. `pm2 start dist/populate_reports.js -n gdmd-pop-rep --no-autorestart`
3. Create environment variable:

```
ACCESS_TOKEN=<fandom access token>
```

4. Run `dist/report_handler.js` in `pm2`, e.g. `pm2 start dist/report_handler.js -n gdmd`
5. Set up a cron job to run `dist/upload_data.js`, e.g. `pm2 start dist/upload_data.js -n gdmd-upload --no-autorestart`
```
0 0 * * * noreplyz pm2 start gdmd-upload >/dev/null 2>&1
```
