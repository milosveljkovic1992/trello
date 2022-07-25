import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { setListsArray } from './lists-slice';
import { setCards } from './cards-slice';
import { throwError } from './error-slice';

export const fetchBoardListsAndCards = createAsyncThunk(
  '/board/fetchBoardListsAndCards',
  async ({ boardId, setBoardName }, thunkAPI) => {
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
    }
  },
);

export const submitBoardName = createAsyncThunk(
  '/board/submitBoardName',
  async ({ board, boardName, setBoardName }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/1/boards/${board.id}?name=${boardName}`,
      );
      return response.data;
    } catch (error) {
      setBoardName(board.name);
      thunkAPI.dispatch(throwError('Could not edit board name'));
      return thunkAPI.rejectWithValue();
    }
  },
);

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    details: {},
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [fetchBoardListsAndCards.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBoardListsAndCards.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    },
    [fetchBoardListsAndCards.rejected]: (state) => {
      state.isLoading = false;
    },
    [submitBoardName.pending]: () => {},
    [submitBoardName.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
    [submitBoardName.rejected]: () => {},
  },
});

export default boardSlice;
