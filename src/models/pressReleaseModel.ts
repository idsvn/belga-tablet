import {
  Attachment,
  Content,
  CoverImage,
  Language,
  Topic,
} from './systemModel';

export enum Category {
  SOCIETY_ENVIRONMENT = 'SOCIETY_ENVIRONMENT',
  CONSUMER_HOBBY = 'CONSUMER_HOBBY',
  SCIENCE_INNOVATION_EDUCATION = 'SCIENCE_INNOVATION_EDUCATION',
  CULTURE_LIFESTYLE_MEDIA = 'CULTURE_LIFESTYLE_MEDIA',
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
  content?: object;
}

export interface PressReleaseModel {
  id?: number;
  content?: Content;
  topics?: Topic[];
  thumbUrl?: string;
  coverUrl?: string;
  coverImage?: CoverImage;
  pressContacts?: PressContact[];
  public?: boolean;
  attachments?: Attachment[];
  publishDate?: string;
}
