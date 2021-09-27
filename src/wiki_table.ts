import { DashboardApi } from './api/dashboard_api';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { DWDimensionApiWiki } from './api/dw_dimensions_api_interface';

const api = new DashboardApi();

// Drops and creates a new fresh table
const dropAndCreateWikisTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
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

// Adds wikis provided into the database in one go
export const addWikis = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  wikis: DWDimensionApiWiki[],
): Promise<void> => {
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

export const populateDatabase = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<void> => {
  await dropAndCreateWikisTable(db);
  let afterWikiId = 0;
  let end = false;
  while (!end) {
    const wikis = await api.getWikiList(afterWikiId, 10000);
    if (wikis.length === 0) {
      end = true;
      break;
    }
    await addWikis(db, wikis);
    afterWikiId = Number(wikis[wikis.length - 1].wiki_id);
    // eslint-disable-next-line no-console
    console.log(`Up to wiki ID: ${afterWikiId}`);
  }
};
