import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';
import { closeModal } from './popup-slice';
import { setComments, resetComments } from './comments-slice';
import { setCards, updateCard } from './cards-slice';
import { informListUpdate } from './lists-slice';

const initialState = {
  details: {},
  hasFailed: false,
  isLoading: true,
};

export const getCard = createAsyncThunk(
  '/card/getCard',
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/1/batch?urls=/1/cards/${id},/1/cards/${id}/actions`,
      );
      thunkAPI.dispatch(setComments(response.data[1][200]));
      return response.data[0][200];
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get card'));
      thunkAPI.dispatch(closeModal());
      thunkAPI.dispatch(resetCard());
      thunkAPI.dispatch(resetComments());

      return thunkAPI.rejectWithValue();
    }
  },
);

export const deleteCard = createAsyncThunk(
  '/card/deleteCard',
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

export const editDescription = createAsyncThunk(
  '/card/editDescription',
  async (
    { card, description, setDescription, previousDescription },
    thunkAPI,
  ) => {
    try {
      const response = await axios.put(
        `/1/cards/${card.id}?desc=${description}`,
      );
      thunkAPI.dispatch(updateCard(response.data));
      thunkAPI.dispatch(informListUpdate(card.idList));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Description could not be edited'));
      setDescription(previousDescription);
      return thunkAPI.rejectWithValue();
    }
  },
);

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    resetCard(state) {
      state.details = initialState.details;
      state.hasFailed = initialState.hasFailed;
      state.isLoading = initialState.isLoading;
    },
  },
  extraReducers: {
    [getCard.pending]: (state) => {
      state.details = initialState.details;
      state.hasFailed = initialState.hasFailed;
      state.isLoading = initialState.isLoading;
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
    [deleteCard.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCard.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteCard.rejected]: (state) => {
      state.isLoading = false;
    },
    [editDescription.pending]: () => {},
    [editDescription.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    },
    [editDescription.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { resetCard } = cardSlice.actions;

export default cardSlice;
