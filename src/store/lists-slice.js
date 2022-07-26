import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { throwError } from './error-slice';

export const archiveList = createAsyncThunk(
  '/lists/archiveList',
  async (listId, thunkAPI) => {
    try {
      await axios.put(`/1/lists/${listId}?closed=true`);
      return listId;
    } catch (error) {
      thunkAPI.dispatch(throwError('List could not be removed'));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const submitList = createAsyncThunk(
  '/lists/submitList',
  async ({ userInput, pos, boardId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/lists?name=${userInput}&pos=${pos}&idBoard=${boardId}`,
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('New list could not be added'));
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
    [archiveList.fulfilled]: (state, action) => {
      state.isUpdated = true;
      state.listsArray = state.listsArray.filter(
        (list) => list.id !== action.payload,
      );
    },
    [archiveList.rejected]: (state) => {
      state.isUpdated = false;
    },
    [submitList.pending]: (state) => {
      state.isUpdated = false;
    },
    [submitList.fulfilled]: (state, action) => {
      state.isUpdated = true;
      state.listsArray.push(action.payload);
    },
    [submitList.rejected]: (state) => {
      state.isUpdated = false;
    },
  },
});

export const { setListsArray, informListUpdate, resetListUpdate } =
  listsSlice.actions;

export default listsSlice;
