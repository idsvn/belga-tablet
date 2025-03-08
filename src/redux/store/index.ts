import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import {
  authenticationReducer,
  deliverablesReducer,
  exploreReducer,
  newsObjectReducer,
  systemReducer,
  tagReducer,
  userReducer,
} from '../slices';

const appReducer = combineReducers({
  authenticationStore: authenticationReducer,
  userStore: userReducer,
  deliverablesStore: deliverablesReducer,
  newsObjectStore: newsObjectReducer,
  systemStore: systemReducer,
  tagStore: tagReducer,
  exploreStore: exploreReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userStore', 'authenticationStore', 'systemStore'],
};

const rootReducer: Reducer = (state: RootState | undefined, action: any) => {
  if (action.type === 'RESET_STATE') {
    const { organizationStore, locationStore, orderStore } = state || {};

    state = {
      organizationStore,
      orderStore,
      locationStore,
    } as RootState;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: any[] = [];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middlewares),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export { persistor, store };

export default store;
