import { useEffect } from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import { DeliverableModel } from 'src/models/publicationModel';
import { UserModel } from 'src/models/userModel';

import { getFavorites } from 'src/redux/slices/deliverablesSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import ArticleItem from 'components/ArticleItem';

import { navigate } from 'App';

import ShowMore from '../ShowMore';

const ArticleList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootState, UserModel>(
    (state) => state.userStore.user,
  );

  const favorites = useSelector<RootState, DeliverableModel[]>(
    (state) => state.deliverablesStore.favorites,
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getFavorites());
    }
  }, [user]);

  return (
    <View>
      <ShowMore
        title={t('ExploreScreen.titleText')}
        showMoreText={t('ExploreScreen.showMoreText')}
        onPress={() => navigate(PATH_SCREEN.FAVORITES_SCREEN)}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {Array.isArray(favorites) &&
          favorites?.map((item, index) => (
            <ArticleItem
              key={index}
              title={item.source}
              imageUrl={item?.attachments?.[0]?.references?.[0]?.href}
              publishDate={item.publishDate}
              unread={item.unread}
              onPress={() => {
                navigate(PATH_SCREEN.NEWSPAPER_SCREEN, {
                  id: item.id,
                  sourceId: item.sourceId,
                });
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default ArticleList;
