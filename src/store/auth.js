import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    APIkey: '2c60f0038afd7c10c7f7b34541cf10e1',
    APItoken: 'ea45abb0abdb247e28551121b047f432cab4d17c7adef5b641d5206d5f658561'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAuth() {
            console.log('yep');
        },
        login() {},
        logout() {}
    }
})


export default authSlice;