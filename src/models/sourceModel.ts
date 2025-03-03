export interface SourceModel {
  data: Source[];
  _links: Links;
  _meta: Meta;
}

export interface Source {
  id: number;
  name: string;
  logo?: string;
  country: string;
  language: string;
  publisher?: string;
  sourceGroupId: number;
  sourceGroup: string;
  subSourceGroups: SubSourceGroup[];
  mainSource: boolean;
}

export interface SubSourceGroup {
  id: number;
  mediumTypeGroupId: number;
  nrSubSources: number;
}

export interface Links {
  self: string;
}

export interface Meta {
  total: number;
}
