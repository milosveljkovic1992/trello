import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    APIkey: '2c60f0038afd7c10c7f7b34541cf10e1',
    APItoken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.APItoken = action.payload;
        },
        logout(state) {
            state.APItoken = null;
        }
    }
});


export const { login, logout } = authSlice.actions;

export default authSlice;