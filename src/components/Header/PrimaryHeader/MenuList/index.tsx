import { FlatList, View } from 'react-native';

import { useDispatch } from 'react-redux';

import {
  ExploreMenu,
  setCurrentExploreMenu,
} from 'src/redux/slices/exploreSlice';

import { MenuIcon } from './components/MenuIcon';

import MenuItem from './MenuItem';

import { MenuListProps } from './types';

import styles from './styles';

const iconSize = '28';

export const MENU_LIST = [
  ExploreMenu.EXPLORE,
  ExploreMenu.BELGA_NOW,
  ExploreMenu.PUBLICATIONS,
  ExploreMenu.REALTIME_FEED,
  ExploreMenu.NEWSLETTERS,
  ExploreMenu.SEARCH,
];

const MenuList = (props: MenuListProps) => {
  const { onClose } = props;

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={MENU_LIST}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <MenuItem
              label={item}
              Icon={<MenuIcon menu={item} iconSize={iconSize} />}
              onPress={() => {
                dispatch(setCurrentExploreMenu(item));
                onClose?.();
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default MenuList;
