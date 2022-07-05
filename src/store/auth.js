import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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