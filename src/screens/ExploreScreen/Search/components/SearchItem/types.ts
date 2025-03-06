import { TagModel } from 'src/models/tagModel';

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
  tags?: TagModel[];
  uuid?: string;
  onPress?: () => void;
  onPressCheckBox?: () => void;
  onPressShare?: () => void;
}
