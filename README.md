# GDMDashboard
Dashboard for Global Discussions Moderators on Fandom, available at https://discussions.fandom.com/wiki/Data:Dashboard. 

## How it works
* IRC relay code is used to log any new reports into `discussionsreports.log`. This code is not available here yet.
* `reports.py` is automatically run twice a week to process logs in `discussionsreports.log` and update all the report numbers. It will edit the appropriate page on the Discussions Wiki.
* `gdmdashboard.js` is run on the Discussions Wiki and provides the [Dashboard interface](https://discussions.fandom.com/wiki/Data:Dashboard). It manipulates the [raw logs](https://discussions.fandom.com/wiki/Data:Overview) to a sortable table format.

## Setup
The scripts do not have a user friendly way of setting up the Dashboard yet to identify old reports. To gather new reports:

1. Set up a way to store logs of new reports into `discussionsreports.log`. Each line must only contain at most one link to the reported post, and can contain any other text, e.g.:
```
2020-03-03T01:54:05Z; New report: https://feedsautomation.fandom.com/f/p/3100000000000098351/r/3080689679092333534
2020-03-03T01:59:36Z; New report: https://harrypotter.fandom.com/f/p/3343172654596407791/r/3344233352138418999
2020-03-03T02:07:26Z; New report: https://assassinscreed.fandom.com/f/p/3116142931476488663
```
2. Modify `reports.py` with the appropriate username, and add `password = "<password>"` to a new file, `secrets.py`.
3. Set up a cron job to run `reports.py`. For example, to run every day on Sunday and Wednesday at 12am:
`0 0 * * 0,3 noreplyz python3 -u reports.py >/dev/null 2>&1`
