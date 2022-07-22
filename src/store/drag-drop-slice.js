import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draggedCard: {},
  startIndex: 0,
  targetIndex: 0,
  targetListId: '',
  targetPosition: 10000,
};

const dragDrop = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    startDrag(state, action) {
      state.startIndex = action.payload.index;
      state.draggedCard = action.payload.card;
    },
    dragOverCard(state, action) {
      state.targetIndex = action.payload.index;
      state.targetPosition = action.payload.pos;
    },
    dragOverList(state, action) {
      if (state.targetListId !== action.payload.listId) {
        state.targetListId = action.payload.listId;
      }
    },
    endDrag(state) {
      state.draggedCard = {};
    },
  },
});

export const { startDrag, dragOverCard, dragOverList, endDrag } =
  dragDrop.actions;

export default dragDrop;
