import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { PATH_SCREEN } from 'src/constants/pathName';

import DownloadScreen from 'src/screens/DownloadScreen';
import MoreScreen from 'src/screens/MoreScreen';
import OfflineNewspaperScreen from 'src/screens/NewspaperScreen/OfflineNewspaperScreen';

const RootStack = createStackNavigator();

const optionsMain = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
};

const MoreNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName={PATH_SCREEN.MORE_SCREEN}
    >
      <RootStack.Screen
        name={PATH_SCREEN.MORE_SCREEN}
        component={MoreScreen}
        options={optionsMain}
      />

      {/* Download Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.DOWNLOAD_SCREEN}
        component={DownloadScreen}
        options={optionsMain}
      />

      {/* Download Screen */}
      <RootStack.Screen
        name={PATH_SCREEN.OFFLINE_NEWSPAPER_SCREEN}
        component={OfflineNewspaperScreen}
        options={optionsMain}
      />
    </RootStack.Navigator>
  );
};

export default MoreNavigator;
