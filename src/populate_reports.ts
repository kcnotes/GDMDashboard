import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { runInitialReportCollection } from './report_table';

open({
  filename: 'data/gdm.sqlite3',
  driver: sqlite3.Database,
}).then(function(db) {
  runInitialReportCollection(db);
});
