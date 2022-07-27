import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { informListUpdate } from './lists-slice';
import { throwError } from './error-slice';
import { updateModal } from './popup-slice';
import { updateCard } from './cards-slice';

export const submitComment = createAsyncThunk(
  '/commentsSlice/submitComment',
  async ({ card, comment }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/cards/${card.id}/actions/comments?text=${comment}`,
      );

      const updatedCard = await axios.get(`/1/cards/${card.id}`);
      thunkAPI.dispatch(updateCard(updatedCard.data));

      thunkAPI.dispatch(informListUpdate(card.idList));
      thunkAPI.dispatch(updateModal());
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Comment could not be added'));
      return thunkAPI.rejectWithValue();
    }
  },
);

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

export const deleteComment = createAsyncThunk(
  '/comments/deleteComment',
  async ({ card, comment }, thunkAPI) => {
    try {
      await axios.delete(`/1/cards/${card.id}/actions/${comment.id}/comments`);

      const updatedCard = await axios.get(`/1/cards/${card.id}`);
      thunkAPI.dispatch(updateCard(updatedCard.data));
      thunkAPI.dispatch(informListUpdate(card.idList));
      return comment.id;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not delete comment'));
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
      const comments = action.payload.filter(
        (action) => action.type === 'commentCard',
      );
      state.commentsList = comments;
      state.isLoading = false;
    },
    resetComments(state) {
      state.commentsList = [];
    },
  },
  extraReducers: {
    [submitComment.pending]: (state) => {
      state.isLoading = true;
    },
    [submitComment.fulfilled]: (state, action) => {
      state.commentsList.unshift(action.payload);
      state.isLoading = false;
    },
    [submitComment.rejected]: (state) => {
      state.isLoading = false;
    },
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
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      const id = action.payload;
      state.commentsList = state.commentsList.filter(
        (comment) => comment.id !== id,
      );
      state.isLoading = false;
    },
    [deleteComment.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setComments, resetComments } = commentsSlice.actions;

export default commentsSlice;
