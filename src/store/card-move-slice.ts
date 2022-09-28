import { createSlice } from '@reduxjs/toolkit';
import { CardType } from './card-slice';

interface InitialState {
  card: CardType;
  index: number;
}

const initialState: InitialState = {
  card: {
    id: '',
    idList: '',
    name: '',
    pos: 1,
    badges: {
      comments: 0,
      description: false,
    },
    desc: '',
  },
  index: 0,
};

const cardMoveSlice = createSlice({
  name: 'cardIndex',
  initialState,
  reducers: {
    setCardMove(state, action) {
      state.card = action.payload.card;
      if (action.payload.index) {
        state.index = action.payload.index;
      } else {
        state.index = 0;
      }
    },
    resetCardMove(state) {
      state.card = initialState.card;
      state.index = initialState.index;
    },
  },
});

export const { setCardMove, resetCardMove } = cardMoveSlice.actions;

export default cardMoveSlice;
