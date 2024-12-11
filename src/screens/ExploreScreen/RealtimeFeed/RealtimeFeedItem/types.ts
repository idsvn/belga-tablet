import { TagModel } from 'src/models/tagModel';

export interface RealtimeFeedItemProps {
  uuid?: string;
  title?: string;
  source?: string;
  sourceLogo?: string;
  lead?: string | null;
  body?: string;
  wordCount?: number;
  subSource?: string;
  publishDate?: string;
  tags?: TagModel[];
  onPress?: () => void;
}
