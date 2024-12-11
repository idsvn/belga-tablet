export interface ArticleItemProps {
  imageUrl?: string;
  title?: string;
  publishDate?: string;
  unread?: boolean;
  onPress?: () => void;
}
