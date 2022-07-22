import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsList: [],
  },
  reducers: {
    setComments(state, action) {
      state.commentsList = action.payload;
    },
    resetComments(state) {
      state.commentsList = [];
    },
    editComment(state, action) {
      const { id, value } = action.payload;
      state.commentsList = state.commentsList.map((comment) => {
        if (comment.id === id) {
          comment.data.text = value;
        }
        return comment;
      });
    },
    deleteComment(state, action) {
      state.commentsList = state.commentsList.filter(
        (comment) => comment.id !== action.payload.id,
      );
    },
  },
});

export const { setComments, resetComments, editComment, deleteComment } =
  commentsSlice.actions;

export default commentsSlice;
