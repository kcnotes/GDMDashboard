import { DashboardApi } from './api/dashboard_api';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { DWDimensionApiWiki } from './api/dw_dimensions_api_interface';
import { ReportedPostsErrorResponse, ReportedPostsResponse } from './api/discussions_interface';
import { allowlist } from './allowlist.json';

const api = new DashboardApi();

type Wiki = Omit<
  DWDimensionApiWiki,
  | 'dbname'
  | 'sitename'
  | 'url'
  | 'lang_id'
  | 'vertical_id'
  | 'cluster'
  | 'fc_community_id'
>;

type WikiReportCount = {
  wiki_id: string,
  article_comment: number,
  forum: number,
  wall: number,
  last_updated: number,
  last_reported: number | null,
};

// Drops and creates a new fresh table
const createReportsTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.run(`
    create table if not exists 'Reports' (
      wiki_id text primary key,
      article_comment number,
      forum number,
      wall number,
      last_updated datetime,
      last_reported datetime
    )
  `);
};

// Adds wikis provided into the database in one go
export const addReportCounts = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  reports: WikiReportCount,
): Promise<unknown> => {
  return await db.run(`
    insert or replace into 'Reports' values (
      ${reports.wiki_id},
      ${reports.article_comment},
      ${reports.forum},
      ${reports.wall},
      ${reports.last_updated},
      ${reports.last_reported || 'null'}
    );
  `);
};

// Adds wikis provided into the database in one go
export const getReportCountsByDomain = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  domain: string,
): Promise<WikiReportCount[]> => {
  return await db.all<WikiReportCount[]>(`
    select Wikis.wiki_id, article_comment, forum, wall, last_updated, last_reported from Wikis
    left join Reports on Reports.wiki_id = Wikis.wiki_id
    where Wikis.domain is '${domain}'`);
};

// last_reported should be null in initial data collection
export const addReportCountsIfHasReports = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  wiki: {
    wiki_id: string,
    domain: string,
  },
  posts: ReportedPostsResponse | ReportedPostsErrorResponse,
  lastReported: number | null,
): Promise<void> => {
  if (allowlist.includes(wiki.domain)) {
    return;
  }
  if ('error' in posts) {
    if (posts.error !== 'ControllerNotFoundException') {
      console.log(wiki.domain, posts.error, posts.details);
    }
    // Some sort of error - remove from Reports anyway
    await db.run(`
      delete from Reports
      where wiki_id is '${wiki.wiki_id}'
    `);
    return;
  } else {
    // Wiki is dodgy - delete existing entry
    if (!posts._embedded) {
      await db.run(`
        delete from Reports
        where wiki_id is '${wiki.wiki_id}'
      `);
      return;
    }

    // No reports - delete existing entry
    if (posts._embedded.count[0].total === 0) {
      await db.run(`
        delete from Reports
        where wiki_id is '${wiki.wiki_id}'
      `);
      return;
    }

    await addReportCounts(db, {
      wiki_id: wiki.wiki_id,
      article_comment: posts._embedded.count[0].ARTICLE_COMMENT,
      forum: posts._embedded.count[0].FORUM,
      wall: posts._embedded.count[0].WALL,
      last_updated: Math.floor(Date.now() / 1000),
      last_reported: lastReported,
    });
  }
};

export const runInitialReportCollection = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<void> => {
  console.log('Retrieving all reported posts');
  await createReportsTable(db);
  const login = await api.checkLoggedIn();
  if ('userId' in login) {
    console.log('Logged in as: ', login);
  } else {
    console.log('Not logged in');
    return;
  }
  const wikis = await db.all<Wiki[]>(`
    select * from Wikis
    where deleted is '0'
    and is_test_wiki is '0'
    and public is '1'`);

  const CONCURRENT_REQUESTS = 20;
  let currentRequest = 0;

  const getReportedPosts = async (wiki: Wiki) => {
    const posts = await api.getReportedPosts(wiki.domain);
    await addReportCountsIfHasReports(db, wiki, posts, null);
    getReportedPosts(wikis[currentRequest++]);
  };

  for (
    currentRequest = 0;
    currentRequest < CONCURRENT_REQUESTS;
    currentRequest++
  ) {
    getReportedPosts(wikis[currentRequest]);
  }
};
