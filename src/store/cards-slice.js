import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

export const fetchCard = createAsyncThunk(
  '/cards/fetchCard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/1/cards/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Card could not be updated'));
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
  },
});

export const { setCards, addCard, updateCard } = cardsSlice.actions;

export default cardsSlice;
