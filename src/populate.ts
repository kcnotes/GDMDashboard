import { DashboardApi } from './api/dashboard_api';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { DWDimensionApiWiki } from './api/dw_dimensions_api_interface';

const api = new DashboardApi();
const DATABASE_LOC = 'data/gdm.sqlite3';

type Wiki = Omit<
  DWDimensionApiWiki,
  'dbname' | 'sitename' | 'url' | 'lang_id' | 'vertical_id' | 'cluster' | 'fc_community_id'
>;

const refreshDatabase = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  // Clear table
  await db.run(`
    drop table if exists Wikis;
  `);
  await db.run(`
    create table if not exists 'Wikis' (
      wiki_id text primary key,
      domain text not null,
      title text,
      founding_user_id text,
      public integer,
      lang text not null,
      vertical_name text,
      created_at text,
      deleted integer,
      is_test_wiki integer,
      is_kid_wiki integer,
      wiki_manager text
    )
  `);
};

const addWikis = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  wikis: DWDimensionApiWiki[],
) => {
  const dbEntries = wikis
    .map((wiki) => {
      return `(
      '${wiki.wiki_id}',
      '${wiki.domain}',
      '${wiki.title.replace(/'/g, '\'\'')}',
      '${wiki.founding_user_id}',
      '${wiki.public}',
      '${wiki.lang}',
      '${wiki.vertical_name}',
      '${wiki.created_at}',
      '${wiki.deleted}',
      '${wiki.is_test_wiki}',
      '${wiki.is_kid_wiki}',
      '${wiki.wiki_manager || 'null'}'
    )`;
    })
    .join(',');

  await db.run(`
    insert into 'Wikis' values ${dbEntries};
  `);
};

(async function() {
  console.log('Retrieving all wikis');
  // open the database
  const db = await open({
    filename: DATABASE_LOC,
    driver: sqlite3.Database,
  });
  // refreshDatabase(db);
  // let afterWikiId = 0;
  // let end = false;
  // while (!end) {
  //   const wikis = await api.getWikiList(afterWikiId, 10000);
  //   if (wikis.length === 0) {
  //     end = true;
  //     break;
  //   }
  //   await addWikis(db, wikis);
  //   afterWikiId = Number(wikis[wikis.length - 1].wiki_id);
  //   console.log(afterWikiId);
  // }
  console.log('Retrieving all reported posts');
  const login = await api.checkLoggedIn();
  if ('userId' in login) {
    console.log(login);
  } else {
    console.log('Not logged in');
    return;
  }
  const wikis = await db.all<Wiki[]>(
    `
      select * from Wikis
      where deleted is '0'
      and is_test_wiki is '0'
      and public is '1'
    `);
  const CONCURRENT_REQUESTS = 20;
  let currentRequest = 0;

  const getReportedPosts = async (wiki: Wiki) => {
    const posts = await api.getReportedPosts(wiki.domain);
    if ('error' in posts) {
      console.log(wiki.domain, posts.error, posts.details);
    } else {
      console.log(wiki.domain, posts._embedded.count[0]);
    }
    if (currentRequest > 600) {
      console.timeEnd();
      return;
    }
    getReportedPosts(wikis[currentRequest++]);
  };

  console.time();
  for (currentRequest = 300; currentRequest < 300 + CONCURRENT_REQUESTS; currentRequest++) {
    getReportedPosts(wikis[currentRequest]);
  }
})();
