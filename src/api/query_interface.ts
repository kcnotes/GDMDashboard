export interface QueryTokensResponse {
  batchcomplete: string;
  query: {
    tokens: {
      csrftoken: string,
    }
  }
}

export interface ListUsersSearchUserResponse {
  listuserssearchuser: {
    [key: string]: ListUserSearchUser | number;
  };
}

interface ListUserSearchUser {
  user_id: string;
  username: string;
  groups_nbr: number;
  groups: string;
  edit_count: string;
  last_edit_date: string;
  last_edit_url: string | null;
  diff_edit_url: string | null;
  blockuserURL: string;
  userRightsURL: string | null;
}

export interface QuerySiteInfoVariablesResponse {
  query: {
    variables: QuerySiteInfoVariable[],
  };
}

interface QuerySiteInfoVariable {
  id: string;
  '*': unknown;
}

export interface TokensResponse {
  query: {
    tokens: {
      csrftoken: string,
    }
  }
}

export interface EditResponse {
  edit: {
    new?: string,
    result: string,
    pageid: number,
    title: string,
    contentmodel: string,
    oldrevid?: number,
    newrevid: number,
    newtimestamp: string,
  },
}
