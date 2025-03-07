import { useEffect } from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PressReleaseModel } from 'src/models/pressReleaseModel';
import { UserModel } from 'src/models/userModel';

import { getLatestPressRelease } from 'src/redux/slices/deliverablesSlice';
import {
  ExploreMenu,
  setCurrentExploreMenu,
} from 'src/redux/slices/exploreSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import LatestPressReleaseItem from './components/LatestPressReleaseItem';

import ShowMore from '../ShowMore';

const LatestPressRelease = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootState, UserModel>(
    (state) => state.userStore.user,
  );

  const latestPressRelease = useSelector<RootState, PressReleaseModel[]>(
    (state) => state.deliverablesStore.latestPressRelease,
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getLatestPressRelease());
    }
  }, [user]);

  return (
    <View>
      <ShowMore
        title={t('ExploreScreen.latestPressReleaseTitleText')}
        showMoreText={t('ExploreScreen.showMoreTextLatestPressRelease')}
        onPress={() => dispatch(setCurrentExploreMenu(ExploreMenu.NEWSLETTERS))}
      />
      {Array.isArray(latestPressRelease) &&
        latestPressRelease?.map((item, index) => (
          <LatestPressReleaseItem key={index} pressRelease={item} />
        ))}
    </View>
  );
};

export default LatestPressRelease;
