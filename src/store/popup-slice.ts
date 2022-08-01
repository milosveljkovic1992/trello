import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  currentCardOpen: string;
  open: boolean;
  isUpdated: boolean;
}

const initialState: InitialState = {
  currentCardOpen: '',
  open: false,
  isUpdated: true,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openModal(state, action) {
      state.currentCardOpen = action.payload;
      state.isUpdated = true;
      state.open = true;
    },
    closeModal(state) {
      state.currentCardOpen = '';
      state.open = false;
    },
    updateModal(state) {
      state.isUpdated = true;
    },
    resetUpdate(state) {
      state.isUpdated = false;
    },
  },
});

export const { openModal, closeModal, updateModal, resetUpdate } =
  popupSlice.actions;

export default popupSlice;
