import { createSlice } from '@reduxjs/toolkit';

interface FontSize {
  fontSizeDefault: number;
}

interface initialStateType {
  fontSize: FontSize;
  paginationCount: number;
}

const initialState: initialStateType = {
  fontSize: {
    fontSizeDefault: 14,
  },
  paginationCount: 20,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    increaseFontSize(state) {
      state.fontSize.fontSizeDefault += 1;
    },
    decreaseFontSize(state) {
      state.fontSize.fontSizeDefault -= 1;
    },
    resetFontSize(state) {
      state.fontSize.fontSizeDefault = 14;
    },
    setPaginationCount(state, action) {
      state.paginationCount = action.payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const {
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  setPaginationCount,
} = actions;
export default reducer;
