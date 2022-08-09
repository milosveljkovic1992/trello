import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

import { CardType } from './card-slice';
import { informListUpdate } from './lists-slice';
import { throwError } from './error-slice';

export const fetchCard = createAsyncThunk(
  '/cards/fetchCard',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/1/cards/${id}`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Card could not be updated'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface SubmitCard {
  listId: string;
  userInput: string;
}

export const submitCard = createAsyncThunk(
  '/cards/submitCard',
  async ({ listId, userInput }: SubmitCard, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/card?idList=${listId}&name=${userInput}`,
      );
      thunkAPI.dispatch(addCard(response.data));
      thunkAPI.dispatch(informListUpdate(listId));
    } catch (error) {
      thunkAPI.dispatch(throwError('New card could not be added'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface MoveCard {
  card: CardType;
  targetList: string;
  targetPosition: number;
  setIsListUpdated: Dispatch<SetStateAction<boolean>>;
}

export const moveCard = createAsyncThunk(
  '/cards/moveCard',
  async (
    { card, targetList, targetPosition, setIsListUpdated }: MoveCard,
    thunkAPI,
  ) => {
    try {
      const response = await axios.put(
        `/1/cards/${card.id}?idList=${targetList}&pos=${targetPosition}`,
      );
      thunkAPI.dispatch(updateCard(response.data));
      setIsListUpdated(true);
      thunkAPI.dispatch(informListUpdate(targetList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not move card'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface DropCard {
  targetCard: CardType;
  targetListId: string;
  targetPosition: number;
  startListId: string;
}

export const dropCard = createAsyncThunk(
  '/cards/dropCard',
  async (
    { targetCard, targetListId, targetPosition, startListId }: DropCard,
    thunkAPI,
  ) => {
    thunkAPI.dispatch(
      updateCard({ ...targetCard, idList: targetListId, pos: targetPosition }),
    );
    await thunkAPI.dispatch(informListUpdate(startListId));
    await thunkAPI.dispatch(informListUpdate(targetListId));

    try {
      const response = await axios.put(
        `/1/cards/${targetCard.id}?idList=${targetListId}&pos=${targetPosition}`,
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not move card'));
      thunkAPI.dispatch(updateCard(targetCard));
      await thunkAPI.dispatch(informListUpdate(startListId));
      await thunkAPI.dispatch(informListUpdate(targetListId));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitialState {
  cardsArray: CardType[];
  isLoading: boolean;
}

const initialState: InitialState = {
  cardsArray: [],
  isLoading: true,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action) {
      state.cardsArray = action.payload;
    },
    addCard(state, action) {
      state.cardsArray.push(action.payload);
    },
    updateCard(state, action) {
      const { id } = action.payload;

      const newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );
      state.cardsArray = newArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const { id } = action.payload;
      const newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );

      state.cardsArray = newArray;
      state.isLoading = false;
    });
    builder.addCase(fetchCard.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(submitCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(submitCard.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(submitCard.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(dropCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dropCard.fulfilled, (state, action) => {
      const { id } = action.payload;

      const newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );

      state.cardsArray = newArray;
      state.isLoading = false;
    });
    builder.addCase(dropCard.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setCards, addCard, updateCard } = cardsSlice.actions;

export default cardsSlice;
