import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import boardsSlice from './boards-slice';
import cardSlice from './card-slice';
import commentSlice from './comment-slice';
import commentsSlice from './comments-slice';
import dragDrop from './drag-drop-slice';
import editSlice from './edit-slice';
import listsSlice from './lists-slice';
import memberSlice from './member-slice';
import popupSlice from './popup-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    boards: boardsSlice.reducer,
    card: cardSlice.reducer,
    comment: commentSlice.reducer,
    comments: commentsSlice.reducer,
    dragDrop: dragDrop.reducer,
    edit: editSlice.reducer,
    lists: listsSlice.reducer,
    member: memberSlice.reducer,
    popup: popupSlice.reducer,
  },
});

export default store;
