import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setBoards = createAsyncThunk(
  'boards/setBoards',
  async (memberid) => {
    const response = await axios.get(`/1/members/${memberid}/boards`);
    return response.data;
  },
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (newBoardTitle) => {
    const response = await axios.post(`/1/boards/?name=${newBoardTitle}`);
    return response.data;
  },
);

export const sendDeleteRequest = createAsyncThunk(
  'boards/sendDeleteRequest',
  async (board) => {
    await axios.delete(`/1/boards/${board.id}`);
    return board;
  },
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boardsArray: [],
    isLoading: true,
  },
  reducers: {
    deleteBoard(state, action) {
      state.boardsArray = state.boardsArray.filter(
        (board) => board.id !== action.payload.id,
      );
      state.isLoading = false;
    },
  },

  extraReducers: {
    [setBoards.pending]: (state) => {
      state.isLoading = true;
    },
    [setBoards.fulfilled]: (state, action) => {
      state.boardsArray = action.payload;
      state.isLoading = false;
    },
    [setBoards.rejected]: (state) => {
      state.isLoading = false;
    },
    [addBoard.pending]: (state) => {
      state.isLoading = false;
    },
    [addBoard.fulfilled]: (state, action) => {
      state.boardsArray.push(action.payload);
      state.isLoading = false;
    },
    [addBoard.rejected]: (state) => {
      state.isLoading = false;
    },
    [sendDeleteRequest.pending]: (state) => {
      state.isLoading = false;
    },
    [sendDeleteRequest.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [sendDeleteRequest.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { deleteBoard } = boardsSlice.actions;

export default boardsSlice;
