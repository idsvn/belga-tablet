export interface MediumTypeGroupModel {
  data: MediumTypeGroup[];
  _links: Links;
  _meta: Meta;
}

export interface MediumTypeGroup {
  id: number;
  name: string;
  prio: number;
  types: any[];
}

export interface Links {
  self: string;
}

export interface Meta {
  total: number;
}
