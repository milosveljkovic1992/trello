import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

const initialState = {
  isEditOpen: false,
  isLoading: true,
  cardName: '',
  cardId: '',
  listName: '',
  listId: '',
};

export const changeName = createAsyncThunk(
  '/edit/changeName',
  async ({ id, name }, thunkAPI) => {
    try {
      await axios.put(`/1/cards/${id}?name=${name}`);
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not change name'));
    }
  },
);

export const changeList = createAsyncThunk(
  '/edit/changeList',
  async ({ id, listId }, thunkAPI) => {
    try {
      await axios.put(`/1/cards/${id}?idList=${listId}`);
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not change list'));
    }
  },
);

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    openEdit(state, action) {
      state.isEditOpen = true;
      state.cardId = action.payload;
    },
  },
  extraReducers: {
    [changeName.pending]: (state) => {
      state.isLoading = true;
    },
    [changeName.fulfilled]: (state, action) => {
      state.cardName = action.payload;
      state.isLoading = false;
    },
    [changeName.rejected]: (state) => {
      state.isLoading = false;
    },
    [changeList.pending]: (state) => {
      state.isLoading = true;
    },
    [changeList.fulfilled]: (state, action) => {
      state.listName = action.payload;
      state.isLoading = false;
    },
    [changeList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { openEdit } = editSlice.actions;

export default editSlice;
