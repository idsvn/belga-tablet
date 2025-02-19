export interface Menu {
  type: 'accountSetting' | 'changePassword' | 'help' | 'logout';
  label?: string;
  icon?: any;
  link?: any;
}
