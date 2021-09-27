import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { populateDatabase } from './wiki_table';

open({
  filename: 'data/gdm.sqlite3',
  driver: sqlite3.Database,
}).then(function(db) {
  populateDatabase(db);
});
