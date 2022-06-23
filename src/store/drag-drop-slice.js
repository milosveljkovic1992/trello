import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    draggedCard: {},
    targetIndex: '',
    targetListId: '',
    targetPosition: ''
}


const dragDrop = createSlice({
    name: 'dragDrop',
    initialState,
    reducers: {
        startDrag(state, action) {
            state.draggedCard = action.payload;
        },
        dragOver(state, action) {
            state.targetIndex = action.payload.index;
            state.targetListId = action.payload.idList;
            state.targetPosition = action.payload.pos;
        },
        endDrag(state) {
            state.draggedCard = {};
        }
    }
});


export const { startDrag, dragOver, endDrag } = dragDrop.actions;

export default dragDrop;