import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdated: false,
  updatedListId: '',
  listsArray: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setListsArray(state, action) {
      state.listsArray = action.payload;
    },
    informListUpdate(state, action) {
      state.isUpdated = true;
      state.updatedListId = action.payload;
    },
    resetListUpdate(state) {
      state.isUpdated = false;
      state.updatedListId = '';
    },
  },
});

export const { setListsArray, informListUpdate, resetListUpdate } =
  listsSlice.actions;

export default listsSlice;
