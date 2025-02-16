import React, { memo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getFavorites,
  getLatestPressRelease,
} from 'src/redux/slices/deliverablesSlice';
import { ExploreMenu } from 'src/redux/slices/exploreSlice';
import { getNewsObject } from 'src/redux/slices/newsObjectSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import RefreshControl from 'components/customs/RefreshControl';
import ScrollView from 'components/customs/ScrollView';
import SecondLayout from 'components/Layout/SecondLayout';

import BelgaNow from './BelgaNow';
import { Explore } from './Explore';

import styles from './styles';

const ExploreScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRefresh = async () => {
    setIsLoading(true);
    await Promise.all([
      dispatch(getFavorites()),
      dispatch(getNewsObject()),
      dispatch(getLatestPressRelease()),
    ]);
    setIsLoading(false);
  };

  return (
    <SecondLayout style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <ExplorePage />
      </ScrollView>
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

    default:
      return <Explore />;
  }
});

export default ExploreScreen;
