import React, { useState } from 'react';

import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import {
  getFavorites,
  getLatestPressRelease,
} from 'src/redux/slices/deliverablesSlice';
import { getNewsObject } from 'src/redux/slices/newsObjectSlice';
import { AppDispatch } from 'src/redux/store';

import ArticleList from '../ArticleList';
import LatestPressRelease from '../LatestPressRelease';
import RealtimeFeed from '../RealtimeFeed';

export function Explore() {
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
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    >
      <ArticleList />
      <RealtimeFeed />
      <LatestPressRelease />
    </ScrollView>
  );
}
