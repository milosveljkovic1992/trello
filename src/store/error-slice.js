import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'errorHandler',
  initialState: {
    isErrorDisplayed: true,
    errorMessage: 'errorMessage',
  },
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
