export interface NewsLettersResponse {
  data: Letter[];
  _links: Links;
  _meta: Meta;
}

export interface Letter {
  id: number;
  name: string;
  description: string;
  createDate: string;
  updatedAt: any;
  publishDate: string;
  organizationName: any;
  status: string;
  type: string;
  collaboration: Collaboration;
  brand: Brand;
  brandId: number;
  templateId: number;
  recurringId: number;
  originalId: any;
  draftId: any;
  coverImage: any;
}

export interface Collaboration {
  type: string;
  owners: Owner[];
  editors: Editor[];
}

export interface Owner {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
}

export interface Editor {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
}

export interface Brand {
  id: number;
  logo: Logo;
  name: string;
  description: any;
  updateDate: string;
  coverImage: CoverImage;
  accentColor: string;
}

export interface Logo {
  url: string;
  id: number;
}

export interface CoverImage {
  id: number;
  url: string;
}

export interface Links {
  next: string;
  self: string;
}

export interface Meta {
  total: number;
}
