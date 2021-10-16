import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { DashboardApi } from './api/dashboard_api';
import { addReportCountsIfHasReports } from './report_table';

const uploadConfig = {
  wiki: 'discussions.fandom.com',
  forumDataPage: 'Data:Overview/discussions',
  wrDataPage: 'Data:Overview/wr',
  summaryDataPage: 'Data:Overview/summary',
  countsDataPage: 'Data:Overview/counts',
  summary: 'Updating GDMDashboard data',
};

type WikiReportDetails = {
  wiki_id: string,
  domain: string,
  title: string,
  lang: string,
  vertical_name: string,
  wiki_manager: string,
  article_comment: number,
  forum: number,
  wall: number,
}
const ONE_HOUR_IN_SECONDS = 60 * 60; // in seconds

const api = new DashboardApi();

const getTimestamp = () => (
  `[${new Date().toJSON().replace(/[TZ]/g, ' ').trim()}]`
);

// Retrieve all wikis and reports for GDMs in the format
// wiki_id|domain|title|...|wall\n
export const getWikisWithForumReports = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<string> => {
  const details = await db.all<WikiReportDetails[]>(`
    select r.wiki_id, domain, title, lang, vertical_name, wiki_manager, 
      article_comment, forum, wall, last_reported from Reports r
    join Wikis w on w.wiki_id = r.wiki_id
    where is_test_wiki is '0'
      and public is '1'
      and forum > 0;
  `);
  return '*' + details.map(
    (detail) => Object.values(detail).join('|').replace('|null|', '|0|'),
  ).join('\n*') + '\n[[Category:Dashboard overview data]]';
};

// Retrieve all wikis and reports that are > 1 hour old
// wiki_id|domain|title|...|wall\n
export const getAllWikiReports = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<{ wiki_id: string; domain: string, last_reported: number }[]> => {
  return await db.all<{ wiki_id: string; domain: string, last_reported: number }[]>(`
    select r.wiki_id, w.domain, r.last_reported from Reports r
    join Wikis w on w.wiki_id = r.wiki_id
    where is_test_wiki is '0'
      and public is '1'
      and last_updated < ${Math.floor(Date.now() / 1000) - ONE_HOUR_IN_SECONDS};
  `);
};

export const updateOldWikiReports = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<void> => {
  const reports = await getAllWikiReports(db);
  console.log(`${reports.length} reports to refresh`);

  const CONCURRENT_REQUESTS = 20;
  let currentRequest = 0;

  const getReportedPosts = async (wiki?: {
    wiki_id: string,
    domain: string,
    last_reported: number,
  }) => {
    if (!wiki) {
      return;
    }
    try {
      const posts = await api.getReportedPosts(wiki.domain);
      await addReportCountsIfHasReports(db, wiki, posts, wiki.last_reported);
    } catch (e) {
      // Wiki most likely closed
      await db.run(`
        delete from Reports
        where wiki_id is '${wiki.wiki_id}'
      `);
    }
    await getReportedPosts(reports[currentRequest++]);
  };

  const promises = [];
  for (
    currentRequest = 0;
    currentRequest < CONCURRENT_REQUESTS;
    currentRequest++
  ) {
    promises.push(getReportedPosts(reports[currentRequest]));
  }
  await Promise.allSettled(promises);
};

// Retrieve all wikis and reports for WRs in the format
// wiki_id|domain|title|...|wall\n
export const getWikisWithReportsAndWR = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<string> => {
  const details = await db.all<WikiReportDetails[]>(`
    select r.wiki_id, domain, title, lang, vertical_name, wiki_manager, 
      article_comment, forum, wall, last_reported from Reports r
    join Wikis w on w.wiki_id = r.wiki_id
    where is_test_wiki is '0'
      and public is '1'
      and wiki_manager is not 'null';
  `);
  return '*' + details.map(
    (detail) => Object.values(detail).join('|').replace('|null|', '|0|'),
  ).join('\n*') + '\n[[Category:Dashboard overview data]]';
};

type TotalReportSummary = {
  lang: string,
  vertical_name: string,
  article_comment: number,
  forum: number,
  wall: number,
  wikis: number,
}

// Retrieve summary data
export const getSummaryData = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<string> => {
  const reports = await db.all<TotalReportSummary[]>(`
    select lang, vertical_name,
      sum(article_comment), sum(forum), sum(wall), count(*) from Reports r
    join Wikis w on w.wiki_id = r.wiki_id
    where is_test_wiki is '0'
      and public is '1'
    group by lang, vertical_name
    order by count(*) desc;
  `);
  return '*' + reports.map(
    (detail) => Object.values(detail).join('|'),
  ).join('\n*') + '\n[[Category:Dashboard overview data]]';
};

// Retrieve summary data
export const getCountsData = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<string> => {
  const reports = await db.all(`
    select sum(article_comment), sum(forum), sum(wall), count(*) from Reports r
    join Wikis w on w.wiki_id = r.wiki_id
    where is_test_wiki is '0'
      and public is '1'
    order by count(*) desc;
  `);
  return '*' + reports.map(
    (detail) => Object.values(detail).join('|'),
  ).join('\n*') + '\n[[Category:Dashboard overview data]]';
};

open({
  filename: 'data/gdm.sqlite3',
  driver: sqlite3.Database,
}).then(async function(db) {
  await updateOldWikiReports(db);
  const tokens = await api.getTokens(uploadConfig.wiki);

  // Get forum reports
  const forumData = await getWikisWithForumReports(db);
  const forumResp = await api.edit(
    uploadConfig.wiki,
    uploadConfig.forumDataPage,
    uploadConfig.summary,
    forumData,
    tokens.query.tokens.csrftoken,
  );
  if (forumResp.edit.result === 'Success') {
    console.log(
      `${getTimestamp()} Successfully updated data at '${forumResp.edit.title}'.`,
    );
  }

  // Get reports
  const wrData = await getWikisWithReportsAndWR(db);
  const wrResp = await api.edit(
    uploadConfig.wiki,
    uploadConfig.wrDataPage,
    uploadConfig.summary,
    wrData,
    tokens.query.tokens.csrftoken,
  );
  if (wrResp.edit.result === 'Success') {
    console.log(
      `${getTimestamp()} Successfully updated data at '${wrResp.edit.title}'.`,
    );
  }

  // Get summary numbers
  const summaryData = await getSummaryData(db);
  const summaryResp = await api.edit(
    uploadConfig.wiki,
    uploadConfig.summaryDataPage,
    uploadConfig.summary,
    summaryData,
    tokens.query.tokens.csrftoken,
  );
  if (wrResp.edit.result === 'Success') {
    console.log(
      `${getTimestamp()} Successfully updated data at '${summaryResp.edit.title}'.`,
    );
  }

  // Get summary numbers
  const countsData = await getCountsData(db);
  const countsResp = await api.edit(
    uploadConfig.wiki,
    uploadConfig.countsDataPage,
    uploadConfig.summary,
    countsData,
    tokens.query.tokens.csrftoken,
  );
  if (wrResp.edit.result === 'Success') {
    console.log(
      `${getTimestamp()} Successfully updated data at '${countsResp.edit.title}'.`,
    );
  }
});
