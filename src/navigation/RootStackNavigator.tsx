import React, { useEffect } from 'react';

import { useKeycloak } from '@react-keycloak/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BootSplash from 'react-native-bootsplash';

import { PATH_SCREEN } from 'src/constants/pathName';

import FavoritesScreen from 'src/screens/FavoritesScreen';
import IntroduceScreen from 'src/screens/IntroduceScreen';
import NewspaperDetailScreen from 'src/screens/NewspaperDetailScreen';
import NewspaperScreen from 'src/screens/NewspaperScreen';
import ReportIssueScreen from 'src/screens/ReportIssueScreen';
import ShareScreen from 'src/screens/ShareScreen';
import SignInScreen from 'src/screens/SignInScreen';

import { replace, userSessionManager } from 'App';

import BottomNavigator from './BottomNavigator';

const RootStack = createStackNavigator();

const optionsMain = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
};

const optionsRoot = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  gestureEnabled: true,
};

const RootStackNavigator = () => {
  const { keycloak } = useKeycloak();

  const clearToken = () => {
    userSessionManager.reset();
    keycloak?.clearToken();
  };

  const restoreToken = async () => {
    const storedToken = userSessionManager.getAccessToken();

    const storedRefreshToken = userSessionManager.getRefreshToken();

    if (storedToken && storedRefreshToken && keycloak) {
      keycloak.token = storedToken;
      keycloak.refreshToken = storedRefreshToken;

      try {
        await keycloak.updateToken(30);
        replace(PATH_SCREEN.MAIN);
      } catch (error) {
        clearToken();
      }
    } else {
      clearToken();
    }
  };

  useEffect(() => {
    restoreToken().finally(() => {
      BootSplash.hide({ fade: true });
    });
  }, []);

  const routeName = PATH_SCREEN.INTRODUCE_SCREEN;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName={routeName}
    >
      {/* Main Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.MAIN}
        component={BottomNavigator}
        options={optionsRoot}
      />

      {/* Introduce Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.INTRODUCE_SCREEN}
        component={IntroduceScreen}
        options={optionsRoot}
      />

      {/* Introduce Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={optionsRoot}
      />

      {/* SignIn Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={optionsRoot}
      />

      {/* NewspaperDetail Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN}
        component={NewspaperDetailScreen}
        options={optionsMain}
      />

      {/* ReportIssue Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.REPORT_ISSUE_SCREEN}
        component={ReportIssueScreen}
        options={optionsMain}
      />
      {/* Share Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.SHARE_SCREEN}
        component={ShareScreen}
        options={optionsMain}
      />

      {/* Main Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.NEWSPAPER_SCREEN}
        component={NewspaperScreen}
        options={optionsRoot}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
