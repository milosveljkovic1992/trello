import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

export const editComment = createAsyncThunk(
  '/commentsSlice/editComment',
  async ({ card, id, value }, thunkAPI) => {
    try {
      await axios.put(
        `/1/cards/${card.id}/actions/${id}/comments?text=${value}`,
      );
      return { id, value };
    } catch (error) {
      thunkAPI.dispatch(throwError('Comment could not be edited'));
      return thunkAPI.rejectWithValue();
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsList: [],
    isLoading: true,
  },
  reducers: {
    setComments(state, action) {
      state.commentsList = action.payload;
    },
    resetComments(state) {
      state.commentsList = [];
    },
    deleteComment(state, action) {
      state.commentsList = state.commentsList.filter(
        (comment) => comment.id !== action.payload.id,
      );
    },
  },
  extraReducers: {
    [editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [editComment.fulfilled]: (state, action) => {
      const { id, value } = action.payload;

      state.commentsList = state.commentsList.map((comment) => {
        if (comment.id === id) {
          comment.data.text = value;
        }
        return comment;
      });
      state.isLoading = false;
    },
    [editComment.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setComments, resetComments, deleteComment } =
  commentsSlice.actions;

export default commentsSlice;
