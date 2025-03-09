import { DeliverableModel } from 'src/models/publicationModel';

export interface ArticleItemProps {
  imageUrl?: string;
  title?: string;
  publishDate?: string;
  unread?: boolean;
  onPress?: () => void;
  deliverableModel?: DeliverableModel;
  isDownloaded?: boolean;
  isChecked?: boolean;
  onCheck?: () => void;
}
