import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isScrollActive: boolean;
}

const initialState: InitialState = {
  isScrollActive: false,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    startScroll(state) {
      state.isScrollActive = true;
    },
    endScroll(state) {
      state.isScrollActive = false;
    },
  },
});

export const { startScroll, endScroll } = scrollSlice.actions;

export default scrollSlice;
