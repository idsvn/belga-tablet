import { useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  getFavorites,
  getLatestPressRelease,
} from 'src/redux/slices/deliverablesSlice';
import { getNewsObject } from 'src/redux/slices/newsObjectSlice';
import { AppDispatch } from 'src/redux/store';

import RefreshControl from 'components/customs/RefreshControl';
import ScrollView from 'components/customs/ScrollView';
import SecondLayout from 'components/Layout/SecondLayout';

import ArticleList from './ArticleList';
import LatestPressRelease from './LatestPressRelease';
import RealtimeFeed from './RealtimeFeed';

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
        <ArticleList />
        <RealtimeFeed />
        <LatestPressRelease />
      </ScrollView>
    </SecondLayout>
  );
};

export default ExploreScreen;
