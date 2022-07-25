import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cardsArray: [],
  },
  reducers: {
    setCards(state, action) {
      state.cardsArray = action.payload;
    },
    addCard(state, action) {
      state.cardsArray.push(action.payload);
    },
    updateCard(state, action) {
      const { id } = action.payload;

      let newArray = state.cardsArray.map((card) =>
        card.id === id ? action.payload : card,
      );
      state.cardsArray = newArray;
    },
  },
});

export const { setCards, addCard, updateCard } = cardsSlice.actions;

export default cardsSlice;
