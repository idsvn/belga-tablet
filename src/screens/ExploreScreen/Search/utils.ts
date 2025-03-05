import { MediumTypeGroup } from 'src/models/mediumTypeGroupModel';
import { SourceGroup } from 'src/models/sourceGroupModel';

import { FilterCategory } from './components/FilterModal';

export const convertMediumTypeToCategories = (
  data: MediumTypeGroup[],
): FilterCategory => {
  return {
    title: 'Content types',
    options: data
      .sort((a, b) => {
        return a.prio - b.prio;
      })
      .map((item) => ({
        label: item.name,
        value: item.id,
      })),
  };
};

export const convertSourceGroupToCategories = (
  data: SourceGroup[],
): FilterCategory => {
  return {
    title: 'Sources',
    options: data.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  };
};
