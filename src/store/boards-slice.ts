import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';
import type { BoardType } from './board-slice';

export const setBoards = createAsyncThunk(
  '/boards/setBoards',
  async (memberId: string, thunkAPI) => {
    try {
      const source = axios.CancelToken.source();
      thunkAPI.signal.addEventListener('abort', () => {
        source.cancel();
      });

      const response = await axios.get(`/1/members/${memberId}/boards`, {
        cancelToken: source.token,
      });
      return response.data;
    } catch ({ message }) {
      if (message !== 'canceled') {
        thunkAPI.dispatch(throwError('Could not get your boards'));
      }
      return thunkAPI.rejectWithValue('');
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
      return thunkAPI.rejectWithValue('');
    }
  },
);

export const sendDeleteRequest = createAsyncThunk(
  'boards/sendDeleteRequest',
  async (boardId: string, thunkAPI) => {
    try {
      await axios.delete(`/1/boards/${boardId}`);
      return boardId;
    } catch (error) {
      thunkAPI.dispatch(throwError('Board could not be deleted'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface InitialState {
  boardsArray: BoardType[];
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
    builder.addCase(
      setBoards.fulfilled,
      (state, action: PayloadAction<BoardType[]>) => {
        state.boardsArray = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(setBoards.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      addBoard.fulfilled,
      (state, action: PayloadAction<BoardType>) => {
        state.boardsArray.push(action.payload);
        state.isLoading = false;
      },
    );
    builder.addCase(
      sendDeleteRequest.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.boardsArray = state.boardsArray.filter(
          (board) => board.id !== action.payload,
        );
        state.isLoading = false;
      },
    );
  },
});

export default boardsSlice;
