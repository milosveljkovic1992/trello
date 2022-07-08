import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'errorHandler',
  initialState: {
    hasError: false,
  },
  reducers: {
    throwError(state) {
      state.hasError = true;
    },
    resetError(state) {
      state.hasError = false;
    },
  },
});

export const { throwError, resetError } = errorSlice.actions;

export default errorSlice;
