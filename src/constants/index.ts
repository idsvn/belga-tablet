import * as ApiURL from 'src/constants/apiURL';
import * as LocalStorageKey from 'src/constants/localStorageKey';
import * as PathName from 'src/constants/pathName';

export const LANGUAGES = [
  { label: 'Dutch', value: 'NL' },
  { label: 'French', value: 'FR' },
  { label: 'German', value: 'DE' },
  { label: 'English', value: 'EN' },
];

export const COUNTRIES = [
  { label: 'Belgium', value: 'BE' },
  { label: 'Other', value: 'ZZ' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'France', value: 'FR' },
  { label: 'Luxembourg', value: 'LU' },
  { label: 'Italy', value: 'IT' },
  { label: 'United Kingdom', value: 'GB' },
];

export { ApiURL, LocalStorageKey, PathName };
