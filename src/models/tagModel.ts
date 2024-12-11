export interface TagModel {
  id?: number;
  name?: string;
  image?: string | null;
  createDateTime?: string;
  type?: string;
  subscribed?: boolean;
  isPublic?: boolean;
  parentId?: number | null;
  pointerId?: number | null;
  order?: number;
}
