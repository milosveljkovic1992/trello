import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  APItoken: string;
  isAuth: boolean;
}

const initialState: InitialState = {
  APItoken: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.APItoken = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.APItoken = '';
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice;
