import { useEffect } from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import { NewsObject } from 'src/models/publicationModel';

import {
  ExploreMenu,
  setCurrentExploreMenu,
} from 'src/redux/slices/exploreSlice';
import { getNewsObject } from 'src/redux/slices/newsObjectSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import { navigate } from 'App';

import ShowMore from '../ShowMore';
import RealtimeFeedItem from './RealtimeFeedItem';

const RealtimeFeed = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const newsObject = useSelector<RootState, NewsObject[]>(
    (state) => state.newsObjectStore.newsObject,
  );

  useEffect(() => {
    dispatch(getNewsObject());
    const interval: any = setInterval(() => {
      dispatch(getNewsObject());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNavigate = (id: string) => {
    navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
      id,
    });
  };

  return (
    <View>
      <ShowMore
        title={t('ExploreScreen.realtimeFeedText')}
        showMoreText={t('ExploreScreen.showMoreRealtimeFeedText')}
        onPress={() =>
          dispatch(setCurrentExploreMenu(ExploreMenu.REALTIME_FEED))
        }
      />
      {newsObject?.map((item, index) => (
        <RealtimeFeedItem
          key={index}
          {...item}
          onPress={() => item?.uuid && handleNavigate(item.uuid)}
        />
      ))}
    </View>
  );
};

export default RealtimeFeed;
