import React from 'react';

import { ExploreMenu } from 'src/redux/slices/exploreSlice';

import NewslettersIcon from 'src/assets/svg/newsletters-icon.svg';
import PublicationIcon from 'src/assets/svg/publication-icon.svg';
import RealTimeFeedIcon from 'src/assets/svg/realtime-feed-icon.svg';
import SearchMenuIcon from 'src/assets/svg/search-menu-icon.svg';

import BelgaNowIconSvg from 'components/svg/BelgaNowIconSvg';
import ExploreSvg from 'components/svg/ExploreSvg';

export const MenuIcon = ({
  menu,
  iconSize = '28',
}: {
  menu: ExploreMenu;
  iconSize?: string;
}): JSX.Element => {
  switch (menu) {
    case ExploreMenu.EXPLORE:
      return <ExploreSvg width={iconSize} height={iconSize} />;
    case ExploreMenu.BELGA_NOW:
      return <BelgaNowIconSvg width={iconSize} height={iconSize} />;
    case ExploreMenu.PUBLICATIONS:
      return <PublicationIcon width={iconSize} height={iconSize} />;
    case ExploreMenu.REALTIME_FEED:
      return <RealTimeFeedIcon width={iconSize} height={iconSize} />;
    case ExploreMenu.NEWSLETTERS:
      return <NewslettersIcon width={iconSize} height={iconSize} />;
    case ExploreMenu.SEARCH:
      return <SearchMenuIcon width={iconSize} height={iconSize} />;
    default:
      return <></>;
  }
};
