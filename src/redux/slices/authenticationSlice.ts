import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  isAuthenticated: boolean;
}

const initialState: initialStateType = {
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

const { reducer, actions } = authenticationSlice;

export const { setAuthenticated } = actions;
export default reducer;
