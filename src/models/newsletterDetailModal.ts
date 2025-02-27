export interface NewsletterDetailModal {
  excludedListId: any;
  public: boolean;
  id: number;
  name: string;
  description: string;
  createDate: string;
  updatedAt: string;
  publishDate: string;
  organizationName: any;
  status: string;
  type: string;
  items: Item[];
  collaboration: Collaboration;
  brand: Brand;
  templateId: number;
  recurringId: number;
  originalId: any;
  draftId: any;
  coverImage: CoverImage2;
  noCoverImage: boolean;
}

export interface Item {
  id: number;
  newsletterId: number;
  title: string;
  note?: string;
  type: string;
  fields: Fields;
  order: number;
}

export interface Fields {
  assetType?: string;
  assetUrl?: string;
  imageUuid?: string;
  body?: string;
  labelIds?: number[];
  order?: string;
  orderArray?: any[];
  count?: number;
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

export interface CoverImage2 {
  id: number;
  url: string;
}
