import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'store';
import { informListUpdate } from './lists-slice';
import { throwError } from './error-slice';
import { updateCard } from './cards-slice';
import type { CardType } from './card-slice';

export type Comment = {
  type: string;
  id: string;
  data: {
    text: string;
  };
  memberCreator: {
    fullName: string;
  };
  date: string;
};

type submitComment = {
  card: CardType;
  comment: string;
};

export const submitComment = createAsyncThunk(
  '/commentsSlice/submitComment',
  async ({ card, comment }: submitComment, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/cards/${card.id}/actions/comments?text=${comment}`,
      );

      try {
        const updatedCard = await axios.get(`/1/cards/${card.id}`);
        thunkAPI.dispatch(updateCard(updatedCard.data));
        thunkAPI.dispatch(informListUpdate(card.idList));
      } catch (error) {
        const state = thunkAPI.getState() as RootState;
        const updatedCard = {
          ...card,
          badges: {
            ...card.badges,
            comments: state.comments.commentsList.length + 1,
          },
        };
        thunkAPI.dispatch(updateCard(updatedCard));
        thunkAPI.dispatch(informListUpdate(card.idList));
      }
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Comment could not be added'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

type editComment = {
  card: CardType;
  id: string;
  value: string;
};

type editedComment = {
  id: string;
  value: string;
};

export const editComment = createAsyncThunk(
  '/commentsSlice/editComment',
  async ({ card, id, value }: editComment, thunkAPI) => {
    try {
      await axios.put(
        `/1/cards/${card.id}/actions/${id}/comments?text=${value}`,
      );
      return { id, value };
    } catch (error) {
      thunkAPI.dispatch(throwError('Comment could not be edited'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

type deleteComment = {
  card: CardType;
  comment: Comment;
};

export const deleteComment = createAsyncThunk(
  '/comments/deleteComment',
  async ({ card, comment }: deleteComment, thunkAPI) => {
    try {
      await axios.delete(`/1/cards/${card.id}/actions/${comment.id}/comments`);

      try {
        const updatedCard = await axios.get(`/1/cards/${card.id}`);
        thunkAPI.dispatch(updateCard(updatedCard.data));
        thunkAPI.dispatch(informListUpdate(card.idList));
      } catch (error) {
        const state = thunkAPI.getState() as RootState;
        const updatedCard = {
          ...card,
          badges: {
            ...card.badges,
            comments: state.comments.commentsList.length - 1,
          },
        };
        thunkAPI.dispatch(updateCard(updatedCard));
        thunkAPI.dispatch(informListUpdate(card.idList));
      }
      return comment.id;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not delete comment'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface InitialState {
  commentsList: Comment[];
}

const initialState: InitialState = {
  commentsList: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      const comments = action.payload.filter(
        (comment) => comment.type === 'commentCard',
      );
      state.commentsList = comments;
    },
    resetComments(state) {
      state.commentsList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      submitComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.commentsList.unshift(action.payload);
      },
    );
    builder.addCase(
      editComment.fulfilled,
      (state, action: PayloadAction<editedComment>) => {
        const { id, value } = action.payload;

        state.commentsList = state.commentsList.map((comment: Comment) => {
          if (comment.id === id) {
            comment.data.text = value;
          }
          return comment;
        });
      },
    );
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.commentsList = state.commentsList.filter(
          (comment) => comment.id !== id,
        );
      },
    );
  },
});

export const { setComments, resetComments } = commentsSlice.actions;

export default commentsSlice;
