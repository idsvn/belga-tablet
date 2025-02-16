export interface TopicModel {
  data: Daum[];
  _links: any;
  _meta: Meta;
}

export interface Daum {
  id: number;
  content: Content;
  thumbUrl: string;
  coverUrl: string;
  category: string;
}

export interface Content {
  EN: LanguageText;
  FR: LanguageText;
  NL: LanguageText;
}

export interface LanguageText {
  title: string;
}

export interface Meta {
  total: number;
}
