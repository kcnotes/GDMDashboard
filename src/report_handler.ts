import { createListener } from 'messenger';
import { addReportCountsIfHasReports, getReportCountsByDomain } from './report_table';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { DashboardApi } from './api/dashboard_api';
import { addWikis } from './wiki_table';

type FindRaw = {
  wiki: string,
  platform: 'article-comment' | 'discussion' | 'message-wall' | 'report',
  postType?: 'thread' | 'reply',
  action: 'created' | 'modified' | 'moved' | 'deleted',
  url: string,
  title: string,
  userName: string,
  snippet: string,
  category: string,
  size: string,
};

const sub = createListener(11101);
const ONE_HOUR_IN_SECONDS = 60 * 60; // in seconds

(async () => {
  const db = await open({
    filename: 'data/gdm.sqlite3',
    driver: sqlite3.Database,
  });
  const api = new DashboardApi();

  sub.on<FindRaw>('find:raw', (_, post) => {
    if (post.platform === 'report') {
      getReportCountsByDomain(db, post.wiki).then(async (wikis) => {
        let wikiId: number;
        // Add wiki in if not found
        if (wikis.length === 0) {
          const variables = await api.getWikiVariables(post.wiki);
          wikiId = variables.query.variables.find((variable) => variable.id === 'wgCityId')?.['*'] as number;
          const wikis = await api.getWikiList(wikiId - 1, 1);
          await addWikis(db, wikis);
        } else {
          wikiId = Number(wikis[0].wiki_id);
        }

        // Update report numbers if old numbers
        if (wikis.length === 0 || !wikis[0].last_updated) {
          // Wiki is untracked
          const posts = await api.getReportedPosts(post.wiki);
          await addReportCountsIfHasReports(db, {
            wiki_id: wikiId.toString(),
            domain: post.wiki,
          }, posts, Math.floor(Date.now() / 1000));
        } else if (wikis[0].last_updated + ONE_HOUR_IN_SECONDS < Math.floor(Date.now() / 1000)) {
          // More than an hour old - update
          const posts = await api.getReportedPosts(post.wiki);
          await addReportCountsIfHasReports(db, {
            wiki_id: wikiId.toString(),
            domain: post.wiki,
          }, posts, Math.floor(Date.now() / 1000));
        }
      });
    }
  });
})();
