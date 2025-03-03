export interface SearchHistoryModel {
  data: SearchHistory[];
  _links: Links;
  _meta: Meta;
}

export interface SearchHistory {
  id: number;
  searchFields: SearchFields;
  queryObject: QueryObject;
  searchDate: string;
}

export interface SearchFields {}

export interface QueryObject {
  searchText: string;
  collapseDuplicates: boolean;
  exactQuery: boolean;
  mediaTypes: string[];
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
  tagid: any;
  start: any;
  end: any;
  sourceid: string[];
  subsourceid: string[];
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
  next: string;
  self: string;
}

export interface Meta {
  total: number;
}
