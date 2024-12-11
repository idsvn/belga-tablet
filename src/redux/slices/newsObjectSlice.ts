import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import newsObjectService from 'src/services/newsObjectService';

interface initialStateType {
  newsObject: any;
}

const initialState: initialStateType = {
  newsObject: [],
};

export const getNewsObject = createAsyncThunk(
  'newsObject/NewsObject',
  async (_, { dispatch }) => {
    try {
      const response = await newsObjectService.getNewsObject({
        count: 5,
        offset: 0,
        subscription: true,
      });

      dispatch(setNewsObject(response?.data));
    } catch (err) {
      console.log(err);
    }
  },
);

const newsObjectSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setNewsObject(state, action) {
      state.newsObject = action.payload;
    },
  },
});

const { reducer, actions } = newsObjectSlice;

export const { setNewsObject } = actions;
export default reducer;
