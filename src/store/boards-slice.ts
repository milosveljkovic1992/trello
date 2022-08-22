import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';
import type { BoardType } from './board-slice';

export const setBoards = createAsyncThunk(
  '/boards/setBoards',
  async (memberid: string, thunkAPI) => {
    try {
      const response = await axios.get(`/1/members/${memberid}/boards`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get your boards'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addBoard = createAsyncThunk(
  '/boards/addBoard',
  async (newBoardTitle: string, thunkAPI) => {
    try {
      const response = await axios.post(`/1/boards/?name=${newBoardTitle}`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Board could not be added'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const sendDeleteRequest = createAsyncThunk(
  '/boards/sendDeleteRequest',
  async (board: BoardType, thunkAPI) => {
    try {
      await axios.delete(`/1/boards/${board.id}`);
      return board.id;
    } catch (error) {
      thunkAPI.dispatch(throwError('Board could not be deleted'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitialState {
  boardsArray: Array<BoardType>;
  isLoading: boolean;
}

const initialState: InitialState = {
  boardsArray: [],
  isLoading: true,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(setBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setBoards.fulfilled, (state, action) => {
      state.boardsArray = action.payload;
      state.isLoading = false;
    });
    builder.addCase(setBoards.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addBoard.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addBoard.fulfilled, (state, action) => {
      state.boardsArray.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addBoard.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendDeleteRequest.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendDeleteRequest.fulfilled, (state, action) => {
      state.boardsArray = state.boardsArray.filter(
        (board) => board.id !== action.payload,
      );
      state.isLoading = false;
    });
    builder.addCase(sendDeleteRequest.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default boardsSlice;
