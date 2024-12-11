export interface FavoritesItemProps {
  title?: string;
  source?: string;
  sourceLogo?: string;
  lead?: string | null;
  body?: string;
  wordCount?: number;
  subSource?: string;
  publishDate?: string;
  page?: string;
  checked?: boolean;
  onPress?: () => void;
  onPressCheckBox?: () => void;
}
