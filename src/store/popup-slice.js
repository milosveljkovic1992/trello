import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCardOpen: '',
    open: false
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openModal(state, action) {
            state.currentCardOpen = action.payload;
            state.open = true;
        },
        closeModal(state) {
            state.currentCardId = '';
            state.open = false
        }
    }
})

export const { openModal, closeModal } = popupSlice.actions;

export default popupSlice;