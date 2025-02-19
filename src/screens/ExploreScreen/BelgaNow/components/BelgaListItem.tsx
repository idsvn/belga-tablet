import { memo, useCallback } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { useGetBelgaNewsObject } from 'src/services/newsObjectService';

import { getFormattedCurrentDate } from 'src/helpers/utils';

import { RootState } from 'src/redux/store';

import BelgaItem from './BelgaItem';
import { BelgaLoadingView } from './LoadingView';

interface BelgaListItemProps {
  topics?: string;
  search?: string;
  languages?: string;
  sourceids?: string;
  subsourceids?: string;
}

const BelgaListItem = ({
  topics,
  search,
  languages,
  sourceids,
  subsourceids,
}: BelgaListItemProps) => {
  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const isFocused = useIsFocused();

  const { data, isLoading } = useGetBelgaNewsObject({
    userId,
    count: 20,
    offset: 0,
    topicids: topics,
    enddate: getFormattedCurrentDate(),
    search,
    languages,
    sourceids,
    subsourceids,
    enabled: isFocused,
  });

  const renderItem = useCallback(({ item }) => {
    return <BelgaItem data={item} />;
  }, []);

  if (isLoading || !data?.data) {
    return <BelgaLoadingView />;
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data.data}
      renderItem={renderItem}
    />
  );
};

export default memo(BelgaListItem);
