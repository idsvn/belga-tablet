import { MediumTypeGroup } from 'src/models/mediumTypeGroupModel';
import { SourceGroup } from 'src/models/sourceGroupModel';

import BelgaMiniIconSvg from 'components/svg/BelgaMiniIconSvg';
import MediaIconSvg from 'components/svg/MediaIconSvg';
import OnlineIconSvg from 'components/svg/OnlineIconSvg';
import OtherIconSvg from 'components/svg/OtherIconSvg';
import PrintIconSvg from 'components/svg/PrintIconSvg';

import { FilterCategory } from './components/FilterModal';

const mediumTypeIcon = {
  PRINT: PrintIconSvg,
  ONLINE: OnlineIconSvg,
  BELGA: BelgaMiniIconSvg,
  OTHER: OtherIconSvg,
  MULTIMEDIA: MediaIconSvg,
};

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
        value: item.name,
        icon: mediumTypeIcon[item.name],
      }))
      .filter((item) => item.icon),
  };
};

export const convertSourceGroupToCategories = (
  data: SourceGroup[],
): FilterCategory => {
  return {
    title: 'Newsbrands groups',
    options: data.map((item) => ({
      label: item.name,
      value: item.sourceGroup,
    })),
  };
};
