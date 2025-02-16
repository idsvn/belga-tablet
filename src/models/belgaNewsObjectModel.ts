export interface BelgaNewsObjectModel {
  data: Daum[];
  _links: Links;
  _meta: any;
}

export interface Daum {
  uuid: string;
  title: string;
  sourceId: number;
  publishDate: string;
  mediumType: string;
  attachments: Attachment[];
  source: string;
  tags: Tag[];
}

export interface Attachment {
  title?: string;
  type: string;
  date: string;
  source: any;
  from: number;
  to: number;
  duration: number;
  references: Reference[];
}

export interface Reference {
  mimeType: string;
  representation: string;
  href: string;
}

export interface Tag {
  id: number;
  name: string;
  image: string;
  createDateTime: any;
  queryObject: QueryObject;
  type: string;
  subscribed: any;
  isPublic: boolean;
  parentId: any;
  pointerId: any;
  order: number;
}

export interface QueryObject {
  searchText: any;
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
  next: string;
  self: string;
}
