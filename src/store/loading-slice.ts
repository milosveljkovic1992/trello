import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  loadingState: 'loading' | 'done';
}

const initialState: InitialState = {
  loadingState: 'done',
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    signalLoadingStarted(state) {
      state.loadingState = 'loading';
    },
    signalLoadingFinished(state) {
      state.loadingState = 'done';
    },
  },
});

export const { signalLoadingStarted, signalLoadingFinished } =
  loadingSlice.actions;

export default loadingSlice;
