import { createSlice } from "@reduxjs/toolkit";


export const loginSlice=createSlice({
    name: 'login',
    initialState: false,
    reducers:{
        changeLogin: (state,action)=>{
            return action.payload
        },
        addToSessionStorage: (state,action)=>{
            sessionStorage.clear();
            sessionStorage.setItem('user',JSON.stringify(action.payload));
            return true;
        },
    }
});
export const {changeLogin,addToSessionStorage} =loginSlice.actions;
export default loginSlice.reducer;
