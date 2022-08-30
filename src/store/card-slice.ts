import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'store';
import { throwError } from './error-slice';
import { setComments, resetComments } from './comments-slice';
import { setCards, updateCard } from './cards-slice';
import { informListUpdate } from './lists-slice';

export type CardType = {
  [key: string]: unknown;
  name: string;
  id: string;
  idList: string;
  pos: number;
  badges: {
    comments: number;
    description: boolean;
  };
  desc: string;
};

interface CardState {
  details: CardType;
  hasFailed: boolean;
  isLoading: boolean;
  isEditTitleActive: boolean;
}

const initialState: CardState = {
  details: {
    id: '',
    idList: '',
    name: '',
    pos: 1,
    badges: {
      comments: 0,
      description: false,
    },
    desc: '',
  },
  hasFailed: false,
  isLoading: true,
  isEditTitleActive: false,
};

export const getCard = createAsyncThunk(
  '/card/getCard',
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/1/batch?urls=/1/cards/${id},/1/cards/${id}/actions`,
      );
      const fetchedCard = response.data[0][200];
      const fetchedComments = response.data[1][200];
      if (!fetchedCard || !fetchedComments) throw new Error('');
      thunkAPI.dispatch(setComments(fetchedComments));
      return fetchedCard;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get card info'));
      thunkAPI.dispatch(resetComments());

      return thunkAPI.rejectWithValue('');
    }
  },
);

export const deleteCard = createAsyncThunk(
  '/card/deleteCard',
  async (card: CardType, thunkAPI) => {
    try {
      await axios.delete(`/1/cards/${card.id}`);
      const state = thunkAPI.getState() as RootState;
      const cards = state.cards.cardsArray;
      const remainingCards = cards.filter(({ id }) => id !== card.id);
      thunkAPI.dispatch(setCards(remainingCards));
      thunkAPI.dispatch(informListUpdate(card.idList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not delete card'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

export const editDescription = createAsyncThunk(
  '/card/editDescription',
  async (
    {
      card,
      description,
    }: {
      card: CardType;
      description: string;
    },
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
      return thunkAPI.rejectWithValue('');
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
    startEditingTitle(state) {
      state.isEditTitleActive = true;
    },
    finishEditingTitle(state) {
      state.isEditTitleActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCard.pending, (state) => {
      state.details = initialState.details;
      state.hasFailed = initialState.hasFailed;
      state.isLoading = initialState.isLoading;
    });
    builder.addCase(
      getCard.fulfilled,
      (state, action: PayloadAction<CardType>) => {
        state.details = action.payload;
        state.hasFailed = false;
        state.isLoading = false;
      },
    );
    builder.addCase(getCard.rejected, (state) => {
      state.details = initialState.details;
      state.hasFailed = true;
      state.isLoading = false;
    });
    builder.addCase(deleteCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCard.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCard.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editDescription.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      editDescription.fulfilled,
      (state, action: PayloadAction<CardType>) => {
        state.details = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(editDescription.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetCard, startEditingTitle, finishEditingTitle } =
  cardSlice.actions;

export default cardSlice;
