import { FlatList, View } from 'react-native';

import BelgaNowIcon from 'src/assets/svg/belga-now-icon.svg';
import NewslettersIcon from 'src/assets/svg/newsletters-icon.svg';
import PublicationIcon from 'src/assets/svg/publication-icon.svg';
import RealTimeFeedIcon from 'src/assets/svg/realtime-feed-icon.svg';
import SearchMenuIcon from 'src/assets/svg/search-menu-icon.svg';

import ExploreSvg from 'components/svg/ExploreSvg';

import MenuItem from './MenuItem';

import { MenuListProps } from './types';

import styles from './styles';

const iconSize = '28';

const menuList = [
  {
    label: 'Explore',
    icon: <ExploreSvg width={iconSize} height={iconSize} />,
  },
  {
    label: 'Belga now',
    icon: <BelgaNowIcon width={iconSize} height={iconSize} />,
  },
  {
    label: 'Publications',
    icon: <PublicationIcon width={iconSize} height={iconSize} />,
  },
  {
    label: 'Realtime feed',
    icon: <RealTimeFeedIcon width={iconSize} height={iconSize} />,
  },
  {
    label: 'Newsletters',
    icon: <NewslettersIcon width={iconSize} height={iconSize} />,
  },
  {
    label: 'Search',
    icon: <SearchMenuIcon width={iconSize} height={iconSize} />,
  },
];

const MenuList = (props: MenuListProps) => {
  const { onClose } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__item, index) => index.toString()}
        renderItem={({ item }) => (
          <MenuItem label={item.label} Icon={item.icon} onPress={onClose} />
        )}
      />
    </View>
  );
};

export default MenuList;
