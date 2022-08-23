import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  open: boolean;
}

const initialState: InitialState = {
  open: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openModal(state) {
      state.open = true;
    },
    closeModal(state) {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = popupSlice.actions;

export default popupSlice;
