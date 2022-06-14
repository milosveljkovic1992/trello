import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true
}

export const getCard = createAsyncThunk('/cards/getCard', 
    async({ id }) => {
        try {
            const response = await axios.get(`/1/cards/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
})

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [getCard.pending]: (state) => {
            state.isLoading = true;
        },
        [getCard.fulfilled]: (state, action) => {
            state.details = action.payload;
            state.isLoading = false;
        },
        [getCard.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const cardSliceAction = cardSlice.actions;


export default cardSlice;