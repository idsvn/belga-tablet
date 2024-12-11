import { NewsObject } from 'src/models/publicationModel';

export interface SidebarProps {
  pageNumber?: number;
  showSidebar?: boolean;
  newsObjects?: NewsObject[];
  onClose?: () => void;
}
