import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from './auth-slice';
import boardSlice from './board-slice';
import boardsSlice from './boards-slice';
import cardSlice from './card-slice';
import cardsSlice from './cards-slice';
import commentsSlice from './comments-slice';
import dragDrop from './drag-drop-slice';
import errorSlice from './error-slice';
import listsSlice from './lists-slice';
import memberSlice from './member-slice';
import popupSlice from './popup-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    board: boardSlice.reducer,
    boards: boardsSlice.reducer,
    card: cardSlice.reducer,
    cards: cardsSlice.reducer,
    comments: commentsSlice.reducer,
    dragDrop: dragDrop.reducer,
    errorHandler: errorSlice.reducer,
    lists: listsSlice.reducer,
    member: memberSlice.reducer,
    popup: popupSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
