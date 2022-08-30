import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { CardType } from './card-slice';
import { informListUpdate, informOriginListUpdate } from './lists-slice';
import { throwError } from './error-slice';

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
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface MoveCard {
  card: CardType;
  targetList: string;
  pos: number;
}

export const moveCard = createAsyncThunk(
  '/cards/moveCard',
  async ({ card, targetList, pos }: MoveCard, thunkAPI) => {
    try {
      const response = await axios.put(
        `/1/cards/${card.id}?idList=${targetList}&pos=${pos}`,
      );
      thunkAPI.dispatch(updateCard(response.data));
      thunkAPI.dispatch(informOriginListUpdate(card.idList));
      thunkAPI.dispatch(informListUpdate(targetList));
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not move card'));
      return thunkAPI.rejectWithValue('');
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
    thunkAPI.dispatch(informOriginListUpdate(startListId));
    thunkAPI.dispatch(informListUpdate(targetListId));
    try {
      const response = await axios.put(
        `/1/cards/${targetCard.id}?idList=${targetListId}&pos=${targetPosition}`,
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not move card'));
      thunkAPI.dispatch(updateCard(targetCard));
      thunkAPI.dispatch(informOriginListUpdate(startListId));
      thunkAPI.dispatch(informListUpdate(targetListId));
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface InitialState {
  cardsArray: CardType[];
  isLoading: boolean;
  activeLists: Record<string, unknown>;
}

const initialState: InitialState = {
  cardsArray: [],
  isLoading: true,
  activeLists: {},
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardType[]>) {
      state.cardsArray = action.payload;
    },
    addCard(state, action: PayloadAction<CardType>) {
      state.cardsArray.push(action.payload);
    },
    updateCard(state, action: PayloadAction<CardType>) {
      const { id } = action.payload;

      const newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );
      state.cardsArray = newArray;
    },
    startCreatingNewCard(state, action: PayloadAction<string>) {
      state.activeLists[action.payload] = action.payload;
    },
    finishCreatingNewCard(state, action: PayloadAction<string>) {
      delete state.activeLists[action.payload];
    },
    resetCreatingNewCard(state) {
      state.activeLists = initialState.activeLists;
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(
      dropCard.fulfilled,
      (state, action: PayloadAction<CardType>) => {
        const { id } = action.payload;

        const newArray = state.cardsArray.map((card) =>
          card.id === id ? action.payload : card,
        );

        state.cardsArray = newArray.sort((a, b) =>
          a.pos < b.pos ? -1 : a.pos > b.pos ? 1 : 0,
        );
        state.isLoading = false;
      },
    );
    builder.addCase(dropCard.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setCards,
  addCard,
  updateCard,
  startCreatingNewCard,
  finishCreatingNewCard,
  resetCreatingNewCard,
} = cardsSlice.actions;

export default cardsSlice;
