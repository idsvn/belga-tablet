import { View } from 'react-native';

import Skeleton from 'react-native-skeleton-placeholder';

import theme from 'src/themes';

const NewspaperDetailSkeleton = () => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <Skeleton>
        <View
          style={{
            height: 30,
            marginTop: 10,
            borderRadius: 4,
            marginHorizontal: theme.spacing.marginHorizontalContent,
          }}
        />
      </Skeleton>
      <Skeleton>
        <View
          style={{
            height: 100,
            marginTop: 10,
            borderRadius: 4,
            marginHorizontal: theme.spacing.marginHorizontalContent,
          }}
        />
      </Skeleton>
      <Skeleton>
        <View
          style={{
            height: 400,
            marginTop: 10,
            borderRadius: 6,
            marginHorizontal: theme.spacing.marginHorizontalContent,
          }}
        />
      </Skeleton>
    </View>
  );
};

export default NewspaperDetailSkeleton;
