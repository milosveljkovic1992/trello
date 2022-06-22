import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boardsArray: [],
        isLoading: true
    },
    reducers: {
        setBoards(state, action) {
            state.boardsArray = action.payload;
            state.isLoading = false;
        },
        addBoard(state, action) {
            state.boardsArray.push(action.payload);
            state.isLoading = false;
        },
        deleteBoard(state, action) {
            state.boardsArray = state.boardsArray.filter(board => board.id !== action.payload.id);
            state.isLoading = false;
        }
    }
});


export const { setBoards, addBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice;