import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUpdated: false,
    updatedListId: ''
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        informListUpdate(state, action) {
            state.isUpdated = true;
            state.updatedListId = action.payload;
        },
        resetListUpdate(state) {
            state.isUpdated = false;
            state.updatedListId = '';
        }

    }
});

export const { informListUpdate, resetListUpdate } = listsSlice.actions;


export default listsSlice;