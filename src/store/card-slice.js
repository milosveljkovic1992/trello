import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

const initialState = {
  isLoading: true,
};

export const getCard = createAsyncThunk(
  '/cards/getCard',
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get(`/1/cards/${id}`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get card'));
    }
  },
);

export const renameCard = createAsyncThunk(
  '/cards/renameCard',
  async ({ id, title }, thunkAPI) => {
    try {
      await axios.put(`/1/cards/${id}?name=${title}`);
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not rename card'));
    }
  },
);

export const deleteCard = createAsyncThunk(
  '/cards/deleteCard',
  async ({ id }, thunkAPI) => {
    try {
      await axios.delete(`/1/cards/${id}`);
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not delete card'));
    }
  },
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: {
    [getCard.pending]: (state) => {
      state.isLoading = true;
    },
    [getCard.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    },
    [getCard.rejected]: (state) => {
      state.isLoading = false;
    },
    [renameCard.pending]: (state) => {
      state.isLoading = true;
    },
    [renameCard.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [renameCard.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteCard.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCard.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteCard.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const cardSliceAction = cardSlice.actions;

export default cardSlice;
