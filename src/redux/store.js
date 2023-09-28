import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import  searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice";


export  const store=configureStore({
    reducer: {
        login: loginSlice,
        search: searchSlice,
        userData: userSlice
    },
});