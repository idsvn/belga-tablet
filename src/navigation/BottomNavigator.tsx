import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import userService from 'src/services/userService';

import { QueryParamType } from 'src/models/systemModel';

import { getTags } from 'src/redux/slices/tagsSlice';
import { setUser } from 'src/redux/slices/userSlice';
import { AppDispatch } from 'src/redux/store';

import ExploreScreen from 'src/screens/ExploreScreen';
import FavoritesScreen from 'src/screens/FavoritesScreen';
import MoreScreen from 'src/screens/MoreScreen';

import ExploreSvg from 'components/svg/ExploreSvg';
import FavoritesSvg from 'components/svg/FavoritesSvg';
import MoreSvg from 'components/svg/MoreSvg';

import theme from 'src/themes';

const Tabs = createBottomTabNavigator();

const iconSize = '25'; // Define the size of your icon

// interface CustomTabBarButtonProps extends BottomTabBarButtonProps {
//   children: React.ReactNode;
// }

// const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
//   children,
//   onPress,
//   ...props
// }) => (
//   <TouchableOpacity
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//     }}
//     onPress={onPress}
//     {...props}
//   >
//     {children}
//   </TouchableOpacity>
// );

const BottomNavigator: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await userService.userInfo();

      dispatch(
        getTags({
          userId: response?.id,
          params: { subscribed: false, type: QueryParamType.SAVED_NEWS },
        }),
      );
      dispatch(setUser(response));
    } catch (error) {
      console.log('🚀 ~ getUserInfo ~ error:', error);
    }
  };

  return (
    <Tabs.Navigator
      initialRouteName={PATH_SCREEN.EXPLORE_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name={PATH_SCREEN.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={{
          tabBarLabel: t('BottomNavigation.favorites'),
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ focused }) => (
            <FavoritesSvg
              width={iconSize}
              height={iconSize}
              checked={focused}
            />
          ),
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name={PATH_SCREEN.EXPLORE_SCREEN}
        component={ExploreScreen}
        options={{
          tabBarLabel: t('BottomNavigation.explore'),
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ focused }) => (
            <ExploreSvg width={iconSize} height={iconSize} checked={focused} />
          ),
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name={PATH_SCREEN.MORE_SCREEN}
        component={MoreScreen}
        options={{
          tabBarLabel: t('BottomNavigation.more'),
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ focused }) => (
            <MoreSvg width={iconSize} height={iconSize} checked={focused} />
          ),
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigator;
