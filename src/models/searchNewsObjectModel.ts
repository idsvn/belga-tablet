export interface SearchNewsObjectModel {
  data: NewsObject[];
  _links: Links;
  _meta: Meta;
}

export interface NewsObject {
  uuid: string;
  type: string;
  title: string;
  lead: any;
  body: string;
  createDate: any;
  publishDate: string;
  sourceLogo: string;
  source: string;
  sourceGroup: any;
  mediumType: string;
  mediumTypeGroup: string;
  subSource: string;
  editions: any[];
  page: any;
  language: string;
  authors: any[];
  attachments: Attachment[];
  wordCount: number;
  account: any;
  sentiment: number;
  mediaValue?: MediaValue;
  audience: number;
  subSourceId: number;
  sourceGroupId: number;
  subSourceGroupId: number;
  mediumTypeId: number;
  mediumTypeGroupId: number;
  sourceId: number;
  publisher: any;
  categories: any[];
  entities: any[];
  topic: any;
  tags: Tag[];
  topics: any[];
  duplicates: number;
  accessStatus: string;
  section: any;
  retentionPeriod: any;
  country: any;
  city: any;
  parentUuid: any;
}

export interface Attachment {
  title: string;
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

export interface MediaValue {
  amount: string;
  currency: string;
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
  self: string;
}

export interface Meta {
  total: number;
}
