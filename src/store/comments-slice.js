import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commentsList: []
}

const commentsSlice = createSlice({ 
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.commentsList = action.payload;
        },
        deleteComment: (state, action) => {
            state.commentsList = state.filter(comment => comment.id !== action.payload.id);
        }
    }
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice;