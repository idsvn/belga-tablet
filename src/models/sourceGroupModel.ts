export interface SourceGroupModel {
  data: SourceGroup[];
  _links: Links;
  _meta: Meta;
}

export interface SourceGroup {
  id: number;
  sourceGroup: string;
  name: string;
  count: number;
}

export interface Links {
  self: string;
}

export interface Meta {
  total: number;
}
