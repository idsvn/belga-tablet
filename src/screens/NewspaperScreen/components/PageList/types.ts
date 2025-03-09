import { DeliverableModel } from 'src/models/publicationModel';

export interface PageListProps {
  publications?: DeliverableModel[];
  activeIndex?: number;
  onChooseIndex?: (index: number) => void;
  onDownloadPress?: () => void;
  isDownloading?: boolean;
}
