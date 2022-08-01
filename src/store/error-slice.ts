import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isErrorDisplayed: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  isErrorDisplayed: false,
  errorMessage: '',
};

const errorSlice = createSlice({
  name: 'errorHandler',
  initialState,
  reducers: {
    throwError(state, action) {
      state.isErrorDisplayed = true;
      state.errorMessage = action.payload;
    },
    resetError(state) {
      state.isErrorDisplayed = false;
      state.errorMessage = '';
    },
  },
});

export const { throwError, resetError } = errorSlice.actions;

export default errorSlice;
