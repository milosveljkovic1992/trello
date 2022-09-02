import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  loadingState: string;
}

const initialState: InitialState = {
  loadingState: 'done',
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    updatePending(state) {
      state.loadingState = 'loading';
    },
    updateDone(state) {
      state.loadingState = 'done';
    },
  },
});

export const { updatePending, updateDone } = loadingSlice.actions;

export default loadingSlice;
