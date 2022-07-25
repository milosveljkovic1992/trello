import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { throwError } from './error-slice';

export const archiveList = createAsyncThunk(
  '/lists/archiveList',
  async (listId, thunkAPI) => {
    try {
      await axios.put(`/1/lists/${listId}?closed=true`);
    } catch (error) {
      thunkAPI.dispatch(throwError('List could not be removed'));
      return thunkAPI.rejectWithValue();
    }
  },
);

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
  extraReducers: {
    [archiveList.pending]: (state) => {
      state.isUpdated = false;
    },
    [archiveList.fulfilled]: (state) => {
      state.isUpdated = true;
    },
    [archiveList.rejected]: (state) => {
      state.isUpdated = false;
    },
  },
});

export const { setListsArray, informListUpdate, resetListUpdate } =
  listsSlice.actions;

export default listsSlice;
