import { createSlice } from "@reduxjs/toolkit"; 

const commentSlice = createSlice({
    name: 'input',
    initialState: {
        input: ''
    },
    reducers: {
        updateComment(state, action) {
            state.input = action.payload;
        }
    }
});


export const { updateComment } = commentSlice.actions;

export default commentSlice;