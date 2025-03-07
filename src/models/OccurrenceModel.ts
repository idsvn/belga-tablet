export interface OccurrenceModel {
  data: Occurrence[];
  _links: Links;
  _meta: Meta;
}

export interface Occurrence {
  date: string;
  newsletterId?: number;
  publications?: number;
  deliverableId?: number;
}

export interface Links {
  self: string;
}

export interface Meta {
  total: number;
}
