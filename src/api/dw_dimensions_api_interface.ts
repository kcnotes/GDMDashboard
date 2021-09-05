export interface DWDimensionApiWiki {
  wiki_id: string;
  dbname: string;
  sitename: string;
  url: string;
  domain: string;
  title: string;
  founding_user_id: string;
  public: string;
  lang: string;
  lang_id: string;
  vertical_id: string;
  vertical_name: string;
  cluster: string;
  created_at: string;
  deleted: string;
  is_test_wiki: string;
  fc_community_id: string | null;
  is_kid_wiki: string;
  wiki_manager: string | null;
}

export type DWDimensionApiGetWikisResponse = DWDimensionApiWiki[];
