import { MediumTypeGroup } from 'src/models/mediumTypeGroupModel';

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
