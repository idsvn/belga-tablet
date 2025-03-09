export interface NewspaperHeaderProps {
  title?: string;
  logoUrl?: string;
  showSideBar?: boolean;
  onPressBack?: () => void;
  onShowSideBar?: () => void;
  onSelectStartAndEnd?: (startDate: string, endDate: string) => void;
}
