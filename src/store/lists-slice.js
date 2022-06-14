import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    listArray: [],
    isLoading: true
};

export const getLists = createAsyncThunk('lists/getLists', async({selectedBoardId} ) => {
    try {
        const response = await axios.get(`/1/boards/${selectedBoardId}/lists`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: {
        [getLists.pending]: (state) => {
            state.isLoading = true;
        },
        [getLists.fulfilled]: (state, action) => {
            state.listArray = action.payload;
            state.isLoading = false;
        },
        [getLists.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});


export default listsSlice;