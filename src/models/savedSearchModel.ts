export interface SavedSearchModel {
  data: SavedSearch[];
  _links: Links;
  _meta: Meta;
}

export interface SavedSearch {
  id: number;
  name: string;
  image: string;
  createDateTime: string;
  queryObject: QueryObject;
}

export interface QueryObject {
  searchText: string;
  collapseDuplicates: boolean;
  exactQuery: boolean;
  mediaTypes: any[];
  favouriteNewsbrands: boolean;
  languages: any[];
  keyword: any[];
  title: string;
  intro: string;
  author: string;
  publisher: any[];
  pagenr: any[];
  wordcountmin: string;
  wordcountmax: string;
  tagid: any[];
  start: string;
  end: string;
  sourceid: any[];
  subsourceid: any[];
  edition: any[];
  sourcegroupid: any[];
  order: string;
  country: any[];
  searchMode: string;
  isManual: boolean;
  dateRangeType: string;
  topicIds: any[];
}

export interface Links {
  self: string;
}

export interface Meta {
  total: number;
}
