import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';

import { ReactNativeKeycloakProvider } from '@react-keycloak/native';
import {
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import { decode } from 'base-64';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-native-gesture-handler';
import './src/localization';

import useRedirectUrl from 'src/hooks/useRedirectUrl';

import { PATH_SCREEN } from 'src/constants/pathName';

import UserSessionManager from 'src/helpers/userSessionManager';

import RootStackNavigator from 'src/navigation/RootStackNavigator';

import store, { persistor } from 'src/redux/store';

import configEnv from 'src/configs';
import keycloak from 'src/configs/keycloak';

import GlobalLoading, { globalLoadingRef } from 'components/GlobalLoading';
import { PortalProvider } from 'components/Portal';

global.atob = decode;
LogBox.ignoreAllLogs();

export const userSessionManager = UserSessionManager.getInstance();

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: any) => {
  if (navigationRef.isReady()) {
    const option = { name, params };

    navigationRef.navigate(option as never);
  }
};

export const replace = (name: string, params?: any) => {
  if (
    navigationRef.isReady() &&
    navigationRef.current?.getCurrentRoute()?.name !== name
  ) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export const resetNavigation = () => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: PATH_SCREEN.FAVORITES_SCREEN }],
    });
  }
};

export const getCurrentRoute = async () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (navigationRef.isReady()) {
        clearInterval(interval);
        resolve(navigationRef.getCurrentRoute());
      }
    }, 500);
  });
};

interface GetParams {
  [key: string]: any;
}
export const getParams = (): GetParams => {
  let currentParams = {};

  if (navigationRef.isReady()) {
    currentParams = navigationRef.getCurrentRoute()?.params as any;
  }

  return currentParams || {};
};

export const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useRedirectUrl();

  useEffect(() => {
    console.log(configEnv.API_BASE_URL);
    console.log(configEnv.ENV);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <PortalProvider>
              <NavigationContainer ref={navigationRef}>
                <SafeAreaProvider>
                  <ReactNativeKeycloakProvider
                    authClient={keycloak}
                    onTokens={(tokens) => {
                      tokens.token &&
                        userSessionManager.setAccessToken(tokens.token);
                      tokens.refreshToken &&
                        userSessionManager.setRefreshToken(tokens.refreshToken);
                    }}
                    onEvent={(event, error) => {
                      if (event === 'onAuthSuccess') {
                        console.log('onAuthSuccess');
                      }

                      if (event === 'onAuthError') {
                        console.log('onAuthError', error);
                      }

                      if (event === 'onAuthRefreshSuccess') {
                        console.log('onAuthRefreshSuccess');
                      }

                      if (event === 'onAuthRefreshError') {
                        console.log('onAuthRefreshError', error);
                      }

                      if (event === 'onTokenExpired') {
                        console.log('onTokenExpired');
                      }

                      if (event === 'onAuthLogout') {
                        console.log('onAuthLogout');
                      }
                    }}
                    initOptions={{
                      redirectUri: configEnv.REDIRECT_URL,
                      // if you need to customize "react-native-inappbrowser-reborn" View you can use the following attribute
                      inAppBrowserOptions: {
                        // For iOS check: https://github.com/proyecto26/react-native-inappbrowser#ios-options
                        // For Android check: https://github.com/proyecto26/react-native-inappbrowser#android-options
                      },
                    }}
                  >
                    <RootStackNavigator />
                  </ReactNativeKeycloakProvider>
                </SafeAreaProvider>
              </NavigationContainer>
            </PortalProvider>
          </QueryClientProvider>
          <GlobalLoading ref={globalLoadingRef} />
          <FlashMessage
            position="top"
            floating
            titleStyle={{ fontSize: 16 }}
            style={{
              marginTop: StatusBar.currentHeight,
              paddingVertical: 15,
            }}
          />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
