import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';
import { closeModal } from './popup-slice';
import { resetComments } from './comments-slice';
import { setCards, updateCard } from './cards-slice';
import { informListUpdate } from './lists-slice';

const initialState = {
  hasFailed: false,
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
      thunkAPI.dispatch(closeModal());
      thunkAPI.dispatch(resetCard());
      thunkAPI.dispatch(resetComments());

      return thunkAPI.rejectWithValue();
    }
  },
);

export const renameCard = createAsyncThunk(
  '/cards/renameCard',
  async ({ id, title, idList }, thunkAPI) => {
    try {
      const response = await axios.put(`/1/cards/${id}?name=${title}`);
      thunkAPI.dispatch(updateCard(response.data));
      thunkAPI.dispatch(informListUpdate(idList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not rename card'));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const deleteCard = createAsyncThunk(
  '/cards/deleteCard',
  async (card, thunkAPI) => {
    try {
      await axios.delete(`/1/cards/${card.id}`);
      const cards = thunkAPI.getState().cards.cardsArray;
      const remainingCards = cards.filter(({ id }) => id !== card.id);
      thunkAPI.dispatch(setCards(remainingCards));
      thunkAPI.dispatch(informListUpdate(card.idList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not delete card'));
      return thunkAPI.rejectWithValue();
    }
  },
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetCard(state) {
      state.details = {};
      state.hasFailed = false;
      state.isLoading = true;
    },
  },
  extraReducers: {
    [getCard.pending]: (state) => {
      state.details = {};
      state.hasFailed = false;
      state.isLoading = true;
    },
    [getCard.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.hasFailed = false;
      state.isLoading = false;
    },
    [getCard.rejected]: (state) => {
      state.details = {};
      state.hasFailed = true;
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

export const { resetCard } = cardSlice.actions;

export default cardSlice;
