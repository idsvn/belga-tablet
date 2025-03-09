import {
  Attachment,
  AttachmentReference,
  Content,
  ContentType,
  Country,
  CoverImage,
  FileType,
  Language,
  MediumType,
  Topic,
} from './systemModel';
import { TagModel } from './tagModel';

export enum Representation {
  ORIGINAL = 'ORIGINAL',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  CROPTOP = 'CROPTOP',
  DETAIL = 'DETAIL',
  SCREENSHOT = 'SCREENSHOT',
  MD_PLAYER = 'MD_PLAYER',
  YT_PLAYER = 'YT_PLAYER',
  STREAM = 'STREAM',
}

export interface PressContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  language?: Language;
  phoneNumber?: string;
  websiteUrl?: string;
  profilePicture?: object;
  content?: Content;
}

export interface MainContent {
  id?: number;
  content?: Content;
  topics?: Topic[];
  thumbUrl?: string;
  coverUrl?: string;
  coverImage?: CoverImage;
  pressContacts?: PressContact[];
  public?: boolean;
  attachments?: Attachment[];
}

export interface DeliverableModel {
  attachments?: Attachment[];
  date?: string;
  duration?: number;
  from?: number;
  references?: AttachmentReference[];
  fileSize?: number;
  href?: string;
  mimeType?: FileType;
  representation?: Representation;
  source?: string;
  title?: string;
  to?: number;
  type?: ContentType;
  country?: Country;
  id: number;
  uuid: string;
  deliverableId: number;
  language?: string;
  mediumType?: MediumType;
  publishDate?: string;
  sourceId?: number;
  sourceLogo?: string;
  subSource?: string;
  unread?: boolean;
  newsObjects?: NewsObject[];
  page?: number;
  sourceGroup?: string;
  wordCount?: number;
  sentiment?: number;
  mediaValue?: MediaValue;
  audience?: number;
  body?: string;
  tags?: TagModel[];
}

export interface MediaValue {
  amount?: string;
  currency?: string;
}

export interface NewsObject {
  title?: string;
  uuid?: string;
  zones?: Zone[];
}

export interface Zone {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface PublicationsDownloadedModel {
  deliverableid?: number;
  deliverableModel?: DeliverableModel[];
}

export interface PublicationModel {
  id?: number;
  content?: Content;
  topics?: Topic[];
  thumbUrl?: string;
  coverUrl?: string;
  coverImage?: CoverImage;
  pressContacts?: PressContact[];
  public?: boolean;
  attachments?: Attachment[];
}
