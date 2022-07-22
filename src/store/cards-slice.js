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
    incrementComment(state, action) {
      const { id } = action.payload;

      let newArray = state.cardsArray.map((card) => {
        if (card.id === id) {
          card.badges.comments++;
        }
        return card;
      });

      state.cardsArray = newArray;
    },
    decrementComment(state, action) {
      const { id } = action.payload;

      let newArray = state.cardsArray.map((card) => {
        if (card.id === id) {
          card.badges.comments--;
          console.log(card.badges.comments);
        }
        return card;
      });

      state.cardsArray = newArray;
    },
  },
});

export const {
  setCards,
  addCard,
  updateCard,
  incrementComment,
  decrementComment,
} = cardsSlice.actions;

export default cardsSlice;
