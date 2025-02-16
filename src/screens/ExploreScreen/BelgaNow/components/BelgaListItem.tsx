import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import { useGetBelgaNewsObject } from 'src/services/newsObjectService';

import { getFormattedCurrentDate } from 'src/helpers/utils';

import { RootState } from 'src/redux/store';

import BelgaItem from './BelgaItem';

interface BelgaListItemProps {
  topics?: string;
}

const BelgaListItem = ({ topics }: BelgaListItemProps) => {
  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data } = useGetBelgaNewsObject({
    userId,
    count: 20,
    offset: 0,
    topicids: topics,
    enddate: getFormattedCurrentDate(),
  });

  console.log(data);

  return (
    <ScrollView>
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
      <BelgaItem />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default memo(BelgaListItem);
