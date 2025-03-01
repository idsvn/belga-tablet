export interface KioskNewsObjectModel {
  data: KioskNewsObject[];
  _links: Links;
  _meta: Meta;
}

export interface KioskNewsObject {
  uuid: string;
  type: string;
  title: string;
  customTitle: any;
  lead?: string;
  publishDate: string;
  sourceLogo: string;
  source: string;
  mediumTypeGroup: string;
  mediumType: string;
  thumbUrl?: string;
  order: any;
  note: any;
  language: string;
  customBody: any;
  customLead: any;
  serializedTextMarks: any;
}

export interface Links {
  next: string;
  self: string;
}

export interface Meta {
  total: number;
}
