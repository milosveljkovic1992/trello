import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  APItoken: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.APItoken = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.APItoken = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice;
