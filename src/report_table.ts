import { DashboardApi } from './api/dashboard_api';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { DWDimensionApiWiki } from './api/dw_dimensions_api_interface';
import { ReportedPostsErrorResponse, ReportedPostsResponse } from './api/discussions_interface';

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
};

// Drops and creates a new fresh table
const createReportsTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.run(`
    create table if not exists 'Reports' (
      wiki_id text primary key,
      article_comment number,
      forum number,
      wall number,
      last_updated datetime
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
      ${reports.last_updated}
    );
  `);
};

// Adds wikis provided into the database in one go
export const getReportCountsByDomain = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  domain: string,
): Promise<WikiReportCount[]> => {
  return await db.all<WikiReportCount[]>(`
    select Wikis.wiki_id, article_comment, forum, wall, last_updated from Wikis
    left join Reports on Reports.wiki_id = Wikis.wiki_id
    where Wikis.domain is '${domain}'`);
};

export const addReportCountsIfHasReports = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  wiki: {
    wiki_id: string,
    domain: string,
  },
  posts: ReportedPostsResponse | ReportedPostsErrorResponse,
): Promise<void> => {
  if ('error' in posts) {
    if (posts.error !== 'ControllerNotFoundException') {
      console.log(wiki.domain, posts.error, posts.details);
      return;
    }
  } else {
    // Wiki is dodgy
    if (!posts._embedded) {
      return;
    }

    // No reports - no need to add an entry
    if (posts._embedded.count[0].total === 0) {
      return;
    }

    await addReportCounts(db, {
      wiki_id: wiki.wiki_id,
      article_comment: posts._embedded.count[0].ARTICLE_COMMENT,
      forum: posts._embedded.count[0].FORUM,
      wall: posts._embedded.count[0].WALL,
      last_updated: Math.floor(Date.now() / 1000),
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
    await addReportCountsIfHasReports(db, wiki, posts);
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