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
});

export const renameCard = createAsyncThunk('/cards/renameCard', 
async({ id, title }) => {
    try {
        await axios.put(`/1/cards/${id}?name=${title}`)
    } catch (error) {
        console.log(error);
    }
});

export const deleteCard = createAsyncThunk('/cards/deleteCard', 
async({ id }) => {
    try {
        await axios.delete(`/1/cards/${id}`);
    } catch (error) {
        console.log(error);
    }
});

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
        },
        [renameCard.pending]: (state) => {
            state.isLoading = true;
        },
        [renameCard.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [renameCard.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteCard.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteCard.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [deleteCard.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const cardSliceAction = cardSlice.actions;


export default cardSlice;