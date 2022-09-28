import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from './auth-slice';
import boardSlice from './board-slice';
import boardsSlice from './boards-slice';
import cardMoveSlice from './card-move-slice';
import cardSlice from './card-slice';
import cardsSlice from './cards-slice';
import commentsSlice from './comments-slice';
import errorSlice from './error-slice';
import listsSlice from './lists-slice';
import loadingSlice from './loading-slice';
import memberSlice from './member-slice';
import miniModalSlice from './mini-modal-slice';
import popupSlice from './popup-slice';
import scrollSlice from './scroll-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    board: boardSlice.reducer,
    boards: boardsSlice.reducer,
    cardMove: cardMoveSlice.reducer,
    card: cardSlice.reducer,
    cards: cardsSlice.reducer,
    comments: commentsSlice.reducer,
    errorHandler: errorSlice.reducer,
    lists: listsSlice.reducer,
    loading: loadingSlice.reducer,
    member: memberSlice.reducer,
    miniModal: miniModalSlice.reducer,
    popup: popupSlice.reducer,
    scroll: scrollSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
