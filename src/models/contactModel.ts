export interface ContactResponse {
  data: Contact[];
  _links: Links;
  _meta: Meta;
}

export interface Contact {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  organizationName: any;
  role?: string;
  phone?: string;
  linkedin: any;
  twitter: any;
  notes: any;
  invited: boolean;
  createdUserId?: number;
  contactType: string;
  contactGroupIds: any[];
  contactTagIds: any[];
  contactGroups: any[];
  contactTags: any[];
  collaboration: string;
}

export interface Links {
  next: string;
  self: string;
}

export interface Meta {
  total: number;
}
