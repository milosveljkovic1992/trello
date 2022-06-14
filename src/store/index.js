import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import cardSlice from "./card-slice";
import listsSlice from './lists-slice';
import memberSlice from "./member-slice";
import popupSlice from "./popup-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        card: cardSlice.reducer,
        lists: listsSlice.reducer,
        member: memberSlice.reducer,
        popup: popupSlice.reducer
    }
});

export default store;