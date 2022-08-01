import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { setListsArray } from './lists-slice';
import { setCards } from './cards-slice';
import { throwError } from './error-slice';
import { Dispatch, SetStateAction } from 'react';

export type BoardType = {
  [key: string]: unknown;
  id: string;
  name: string;
  prefs: {
    backgroundImage: string;
    backgroundImageScaled: [
      {
        url: string;
      },
      {
        url: string;
      },
      {
        url: string;
      },
    ];
  };
};

interface FetchBoardListsAndCards {
  boardId: string;
  setBoardName: Dispatch<SetStateAction<string>>;
}

export const fetchBoardListsAndCards = createAsyncThunk(
  '/board/fetchBoardListsAndCards',
  async ({ boardId, setBoardName }: FetchBoardListsAndCards, thunkAPI) => {
    try {
      const response = await axios.get(
        `/1/batch?urls=/1/boards/${boardId},/1/boards/${boardId}/lists,/1/boards/${boardId}/cards`,
      );
      const fetchedBoard = response.data[0][200];
      const fetchedLists = response.data[1][200];
      const fetchedCards = response.data[2][200];

      thunkAPI.dispatch(setListsArray(fetchedLists));
      thunkAPI.dispatch(setCards(fetchedCards));
      setBoardName(fetchedBoard.name);

      return fetchedBoard;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get board info'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface SubmitBoardName {
  board: BoardType;
  boardName: string;
  setBoardName: Dispatch<SetStateAction<string>>;
}

export const submitBoardName = createAsyncThunk(
  '/board/submitBoardName',
  async ({ board, boardName, setBoardName }: SubmitBoardName, thunkAPI) => {
    try {
      const response = await axios.put(
        `/1/boards/${board.id}?name=${boardName}`,
      );
      return response.data;
    } catch (error) {
      setBoardName(board.name);
      thunkAPI.dispatch(throwError('Could not edit board name'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitialState {
  details: BoardType;
  isLoading: boolean;
}

const initialState: InitialState = {
  details: {
    id: '',
    name: '',
    prefs: {
      backgroundImage: '',
      backgroundImageScaled: [
        {
          url: '',
        },
        {
          url: '',
        },
        {
          url: '',
        },
      ],
    },
  },
  isLoading: true,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard(state) {
      state.details = initialState.details;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardListsAndCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardListsAndCards.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBoardListsAndCards.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(submitBoardName.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(submitBoardName.fulfilled, (state, action) => {
      state.details = action.payload;
    });
    builder.addCase(submitBoardName.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetBoard } = boardSlice.actions;

export default boardSlice;
