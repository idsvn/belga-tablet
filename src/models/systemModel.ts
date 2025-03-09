import { DeliverableModel, Representation } from './publicationModel';

export enum Language {
  NL = 'NL',
  FR = 'FR',
  EN = 'EN',
}

export enum AttachmentType {
  Attachment = 'Attachment',
  Image = 'Image',
  Page = 'Page',
  Audio = 'Audio',
  Video = 'Video',
  Webpage = 'Webpage',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  Rtv = 'Rtv',
  Youtube = 'Youtube',
}

export enum FileType {
  DOCX = 'DOCX',
  XLSX = 'XLSX',
  PNG = 'PNG',
  JPG = 'JPG',
  PDF = 'PDF',
  M3U8 = 'M3U8',
  HTML = 'HTML',
  IMAGE_JPG = 'IMAGE_JPG',
  IMAGE_PNG = 'IMAGE_PNG',
  NOT_SPECIFIED = 'NOT_SPECIFIED',
}

export interface ContentBody {
  body?: string;
  lead?: string;
  title?: string;
}

export interface Content {
  [Language.EN]?: ContentBody;
  [Language.FR]?: ContentBody;
  [Language.NL]?: ContentBody;
}

export interface AttachmentFile {
  id?: number;
  url?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: FileType;
  language?: Language;
}

export interface Embed {
  name?: string;
  url?: string;
  createDate?: string;
  updateDate?: string;
  publishDate?: string;
}

export interface Attachment {
  id?: number;
  type?: AttachmentType;
  file?: AttachmentFile;
  date?: string;
  embed?: Embed;
  references?: AttachmentReference[];
}

export enum MediumType {
  ANALYSIS = 'ANALYSIS',
  NEWSPAPER = 'NEWSPAPER',
  WEBSITE = 'WEBSITE',
  BELGANEWS = 'BELGANEWS',
  WIRE = 'WIRE',
  MAGAZINE = 'MAGAZINE',
  RADIO = 'RADIO',
  TELEVISION = 'TELEVISION',
  BELGAALERT = 'BELGAALERT',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  YOUTUBE = 'YOUTUBE',
  TWITTER = 'TWITTER',
  VIDEO = 'VIDEO',
  PHOTOCOVERAGE = 'PHOTOCOVERAGE',
  AUDIO = 'AUDIO',
  PRESS_RELEASE = 'PRESS_RELEASE',
  AGENDA = 'AGENDA',
  ALERTS = 'ALERTS',
  COMING_UP = 'COMING_UP',
  TODAY_IN_HISTORY = 'TODAY_IN_HISTORY',
}

export enum Country {
  BE = 'BE',
  NL = 'NL',
  FR = 'FR',
  LU = 'LU',
  OTHER = 'OTHER',
  UNDEFINED = 'UNDEFINED',
}

export enum ContentType {
  ATTACHMENT = 'Attachment',
  IMAGE = 'Image',
  PAGE = 'Page',
  AUDIO = 'Audio',
  VIDEO = 'Video',
  WEBPAGE = 'Webpage',
  TWITTER = 'Twitter',
  INSTAGRAM = 'Instagram',
  RTV = 'Rtv',
  YOUTUBE = 'Youtube',
}

export interface CoverImage {
  id: number;
  url: string;
}

export enum Category {
  SOCIETY_ENVIRONMENT = 'SOCIETY_ENVIRONMENT',
  CONSUMER_HOBBY = 'CONSUMER_HOBBY',
  SCIENCE_INNOVATION_EDUCATION = 'SCIENCE_INNOVATION_EDUCATION',
  CULTURE_LIFESTYLE_MEDIA = 'CULTURE_LIFESTYLE_MEDIA',
}

export interface Topic {
  id?: number;
  content?: Content;
  category?: Category;
  thumbUrl?: string;
  coverUrl?: string;
  coverImage?: CoverImage;
}

export interface Links {
  next?: string;
  prev?: string;
  self: string;
}

export interface Meta {
  total: number;
}

export interface AttachmentReference {
  fileSize?: number;
  href?: string;
  mimeType?: MediumType;
  representation?: Representation;
}

export interface APIResponse {
  _links: Links;
  _meta: Meta;
  data: DeliverableModel[];
}

export enum QueryParamType {
  LABEL = 'LABEL',
  SAVED_SEARCH = 'SAVED_SEARCH',
  STORY_TAG = 'STORY_TAG',
  SAVED_NEWS = 'SAVED_NEWS',
  PRESS_REVIEW = 'PRESS_REVIEW',
  AUTO_TAG = 'AUTO_TAG',
  POINTER = 'POINTER',
  STREAM = 'STREAM',
  CLIPPING = 'CLIPPING',
  NEWS = 'NEWS',
  DOCUMENT = 'DOCUMENT',
  BELGA_COVERAGE = 'BELGA_COVERAGE',
  BELGA_PHOTO = 'BELGA_PHOTO',
}

export interface QueryParams {
  count?: number;
  offset?: number;
  public?: boolean;
  searchtext?: string;
  subscribed?: boolean;
  subscription?: boolean;
  start?: string | null;
  end?: string | null;
  type?: string;
  order?: string;

  [key: string]: any;
}
