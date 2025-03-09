export interface Menu {
  type: 'accountSetting' | 'changePassword' | 'help' | 'logout' | 'download';
  label?: string;
  icon?: any;
  link?: any;
}
