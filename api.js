const fetch = require('node-fetch');
require('dotenv').config();

const api = {};

const config = {
  UA: 'GDMDashboardBot/2.0, Discussions Reports Bot',
  HOME_WIKI: 'https://discussions.fandom.com',
  HOME_ROOT_PAGE: 'Data:Overview',
  SERVICES: 'https://services.fandom.com',
  EDIT_SUMMARY: 'Automatic: Updating GDMDashboard data',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  RELEVANT_GROUPS: [
    'global-discussions-moderator',
    'soap',
    'wiki-manager',
    'helper'
  ]
};

api.get = async (wiki, data) => {
  var options = {
    method: 'GET',
    headers: {
      'User-Agent': config.UA,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: `access_token=${config.ACCESS_TOKEN}`
    }
  };
  const dataString = new URLSearchParams(data).toString();
  const resp = await fetch(`https://${wiki}/api.php?${dataString}`, options);
  return await resp.json();
};

api.post = async (wiki, data) => {
  var options = {
    method: 'POST',
    headers: {
      'User-Agent': config.UA,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: `access_token=${config.ACCESS_TOKEN}`
    },
    body: new URLSearchParams(data).toString()
  };
  const resp = await fetch(`https://${wiki}/api.php`, options);
  return await resp.json();
};

api.wikiaGet = async (wiki, data) => {
  var options = {
    method: 'GET',
    headers: {
      'User-Agent': config.UA,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: `access_token=${config.ACCESS_TOKEN}`
    }
  };
  const dataString = new URLSearchParams(data).toString();
  const resp = await fetch(`https://${wiki}/wikia.php?${dataString}`, options);
  return await resp.json();
};

api.wikiaPost = async (wiki, data) => {
  var options = {
    method: 'POST',
    headers: {
      'User-Agent': config.UA,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: `access_token=${config.ACCESS_TOKEN}`
    },
    body: new URLSearchParams(data).toString()
  };
  const resp = await fetch(`https://${wiki}/wikia.php`, options);
  return await resp.json();
};

api.checkLoggedIn = async () => (
  await fetch(`${config.SERVICES}/whoami`, {
    headers: {
      'User-Agent': config.UA,
      cookie: `access_token=${config.ACCESS_TOKEN}`
    }
  }).then(res => res.json())
);

api.getReportedPosts = async (wiki) => (
  await api.wikiaGet(wiki, {
    controller: 'DiscussionModeration',
    method: 'getReportedPosts',
  })
);

api.getModActions = async (wiki) => (
  await api.wikiaGet(wiki, {
    controller: 'DiscussionLeaderboard',
    method: 'getModeratorActions',
  })
);

api.getWikiList = async (afterWikiId, limit) => (
  await api.wikiaGet('community.fandom.com', {
    controller: 'DWDimensionApi',
    method: 'getWikis',
    after_wiki_id: afterWikiId,
    limit
  })
);

api.getToken = async (wiki) => (
  await api.get(wiki, {
    action: 'query',
    meta: 'tokens',
    format: 'json'
  })
);

// limit = 138 at time of run. Doubt the number will go up unless we add more groups
api.listUsersSearch = async (limit, offset) => (
  await api.get('community.fandom.com', {
    action: 'listuserssearchuser',
    username: '',
    groups: config.RELEVANT_GROUPS.join(','),
    contributed: 0,
    limit: limit || 500,
    order: 'cnt_groups',
    sort: 'asc',
    offset: offset || 0,
    format: 'json'
  })
);

module.exports = api;