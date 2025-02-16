import { createSlice } from '@reduxjs/toolkit';

export const enum ExploreMenu {
  EXPLORE = 'Explore',
  BELGA_NOW = 'Belga now',
  PUBLICATIONS = 'Publications',
  REALTIME_FEED = 'Realtime feed',
  NEWSLETTERS = 'Newsletters',
  SEARCH = 'Search',
}

export const initialState = {
  currentExploreMenu: ExploreMenu.EXPLORE,
};

const exploreSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setCurrentExploreMenu(state, action) {
      state.currentExploreMenu = action.payload;
    },
  },
});

const { reducer, actions } = exploreSlice;

export const { setCurrentExploreMenu } = actions;
export default reducer;
