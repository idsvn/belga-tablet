import { createSlice } from '@reduxjs/toolkit';

interface FontSize {
  fontSizeDefault: number;
}

interface initialStateType {
  fontSize: FontSize;
}

const initialState: initialStateType = {
  fontSize: {
    fontSizeDefault: 14,
  },
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
  },
});

const { reducer, actions } = systemSlice;

export const { increaseFontSize, decreaseFontSize, resetFontSize } = actions;
export default reducer;
