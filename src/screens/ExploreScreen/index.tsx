import React, { memo } from 'react';

import { useSelector } from 'react-redux';

import { ExploreMenu } from 'src/redux/slices/exploreSlice';
import { RootState } from 'src/redux/store';

import SecondLayout from 'components/Layout/SecondLayout';

import BelgaNow from './BelgaNow';
import { Explore } from './Explore';
import { RealTimeFeedPage } from './RealtimeFeed/RealTimeFeedPage';

import styles from './styles';

const ExploreScreen = () => {
  return (
    <SecondLayout style={styles.container}>
      <ExplorePage />
    </SecondLayout>
  );
};

const ExplorePage = memo(() => {
  const currentExploreMenu = useSelector<RootState, ExploreMenu>(
    (state) => state.exploreStore.currentExploreMenu,
  );

  switch (currentExploreMenu) {
    case ExploreMenu.EXPLORE:
      return <Explore />;
    case ExploreMenu.BELGA_NOW:
      return <BelgaNow />;
    case ExploreMenu.REALTIME_FEED:
      return <RealTimeFeedPage />;

    default:
      return <Explore />;
  }
});

export default ExploreScreen;
