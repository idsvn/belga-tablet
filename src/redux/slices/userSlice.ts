import { createSlice } from '@reduxjs/toolkit';

import { UserModel } from 'src/models/userModel';

interface initialStateType {
  user: UserModel;
}

const initialState: initialStateType = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser } = actions;
export default reducer;
