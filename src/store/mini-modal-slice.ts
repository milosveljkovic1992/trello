import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isMiniModalOpen: boolean;
  modalCurrentlyOpen: 'Move' | 'Copy' | '';
}

interface OpenMiniModalPayload {
  payload: 'Move' | 'Copy';
  type: string;
}

const initialState: InitialState = {
  isMiniModalOpen: false,
  modalCurrentlyOpen: '',
};

const miniModalSlice = createSlice({
  name: 'miniModal',
  initialState,
  reducers: {
    openMiniModal(state, action: OpenMiniModalPayload) {
      state.isMiniModalOpen = true;
      state.modalCurrentlyOpen = action.payload;
    },
    closeMiniModal(state) {
      state.isMiniModalOpen = initialState.isMiniModalOpen;
      state.modalCurrentlyOpen = initialState.modalCurrentlyOpen;
    },
  },
});

export const { openMiniModal, closeMiniModal } = miniModalSlice.actions;

export default miniModalSlice;
