import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';
import { informListUpdate } from './lists-slice';

export const fetchCard = createAsyncThunk(
  '/cards/fetchCard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/1/cards/${id}`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Card could not be updated'));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const submitCard = createAsyncThunk(
  '/cards/submitCard',
  async ({ listId, userInput }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/card?idList=${listId}&name=${userInput}`,
      );
      thunkAPI.dispatch(addCard(response.data));
      thunkAPI.dispatch(informListUpdate(listId));
    } catch (error) {
      thunkAPI.dispatch(throwError('New card could not be added'));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const moveCard = createAsyncThunk(
  '/cards/moveCard',
  async ({ card, targetList, targetPosition, setIsListUpdated }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/1/cards/${card.id}?idList=${targetList}&pos=${targetPosition}`,
      );
      thunkAPI.dispatch(updateCard(response.data));
      setIsListUpdated(true);
      thunkAPI.dispatch(informListUpdate(targetList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not move card'));
      return thunkAPI.rejectWithValue();
    }
  },
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cardsArray: [],
  },
  reducers: {
    setCards(state, action) {
      state.cardsArray = action.payload;
    },
    addCard(state, action) {
      state.cardsArray.push(action.payload);
    },
    updateCard(state, action) {
      const { id } = action.payload;

      let newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );
      state.cardsArray = newArray;
    },
  },
  extraReducers: {
    [fetchCard.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCard.fulfilled]: (state, action) => {
      const { id } = action.payload;
      let newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );

      state.cardsArray = newArray;
      state.isLoading = false;
    },
    [fetchCard.rejected]: (state) => {
      state.isLoading = false;
    },
    [submitCard.pending]: (state) => {
      state.isLoading = true;
    },
    [submitCard.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [submitCard.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCards, addCard, updateCard } = cardsSlice.actions;

export default cardsSlice;
