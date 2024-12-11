import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'react-native-flash-message';

import tagService from 'src/services/tagService';

import { TagModel } from 'src/models/tagModel';

import { getNewsObject } from './newsObjectSlice';

interface initialStateType {
  tags: TagModel;
}

const initialState: initialStateType = {
  tags: {},
};

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (
    { userId, params }: { userId: number; params: object },
    { dispatch },
  ) => {
    try {
      const response = await tagService.getTagsByUserId(userId, params);

      dispatch(setTags(response?.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const updateTags = createAsyncThunk(
  'newsObject/updateTags',
  async ({ id, data }: { id: string; data?: number[] }, { dispatch }) => {
    try {
      await tagService.updateTag(id, data);
      dispatch(getNewsObject());
      if (data && data?.length > 0) {
        showMessage({ message: 'Article saved', type: 'success' });
      }
    } catch (err) {
      showMessage({ message: 'Article saved error', type: 'danger' });
      console.log(err);
    }
  },
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags(state, action) {
      state.tags = action.payload;
    },
  },
});

const { reducer, actions } = tagsSlice;

export const { setTags } = actions;
export default reducer;
