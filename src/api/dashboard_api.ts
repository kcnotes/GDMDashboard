import { ApiInterface, config } from './api_interface';
import {
  LoggedInResponse,
  LoggedOutResponse,
  ModeratorActionsResponse,
  ReportedPostsErrorResponse,
  ReportedPostsResponse,
} from './discussions_interface';
import { DWDimensionApiGetWikisResponse } from './dw_dimensions_api_interface';
import { EditResponse, ListUsersSearchUserResponse, QuerySiteInfoVariablesResponse, QueryTokensResponse, TokensResponse } from './query_interface';

export class DashboardApi extends ApiInterface {
  checkLoggedIn(): Promise<LoggedInResponse | LoggedOutResponse> {
    return this.request<LoggedInResponse | LoggedOutResponse>({
      method: 'GET',
      path: `${config.SERVICES}/whoami`,
    });
  }

  getReportedPosts(wiki: string): Promise<ReportedPostsResponse | ReportedPostsErrorResponse> {
    return this.wikiaGet<ReportedPostsResponse>(wiki, {
      controller: 'DiscussionModeration',
      method: 'getReportedPosts',
      cb: Math.random(),
    });
  }

  getModActions(wiki: string, days: '30' | '90'): Promise<ModeratorActionsResponse> {
    return this.wikiaGet<ModeratorActionsResponse>(wiki, {
      controller: 'DiscussionLeaderboard',
      method: 'getModeratorActions',
      days,
    });
  }

  getWikiList(afterWikiId: number, limit: number): Promise<DWDimensionApiGetWikisResponse> {
    return this.wikiaGet<DWDimensionApiGetWikisResponse>('community.fandom.com', {
      controller: 'DWDimensionApi',
      method: 'getWikis',
      after_wiki_id: afterWikiId,
      limit,
    });
  }

  getWikiVariables(wiki: string): Promise<QuerySiteInfoVariablesResponse> {
    return this.mwGet<QuerySiteInfoVariablesResponse>(wiki, {
      action: 'query',
      meta: 'siteinfo',
      siprop: 'variables',
      format: 'json',
    });
  }

  getToken(wiki: string): Promise<QueryTokensResponse> {
    return this.mwGet<QueryTokensResponse>(wiki, {
      action: 'query',
      meta: 'tokens',
      format: 'json',
    });
  }

  // limit = 138 at time of run. Doubt the number will go up unless we add more groups
  listUsersSearch(limit: number, offset: number): Promise<ListUsersSearchUserResponse> {
    return this.mwGet<ListUsersSearchUserResponse>('community.fandom.com', {
      action: 'listuserssearchuser',
      username: '',
      groups: config.RELEVANT_GROUPS.join(','),
      contributed: 0,
      limit: limit || 500,
      order: 'cnt_groups',
      sort: 'asc',
      offset: offset || 0,
      format: 'json',
    });
  }

  // Get CSRF token to edit a page
  getTokens(wiki: string): Promise<TokensResponse> {
    return this.mwGet<TokensResponse>(wiki, {
      action: 'query',
      meta: 'tokens',
      format: 'json',
    });
  }

  // Edit a page
  edit(wiki: string, title: string, summary: string, text: string, token: string): Promise<EditResponse> {
    return this.mwPost<EditResponse>(wiki, undefined, {
      action: 'edit',
      title,
      summary,
      text,
      format: 'json',
      token,
    });
  }
}
