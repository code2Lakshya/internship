import { createSlice } from "@reduxjs/toolkit";


export const loginSlice=createSlice({
    name: 'login',
    initialState: false,
    reducers:{
        changeLogin: (state)=>{
            state=!state;
        }
    }
});
export const {changeLogin} =loginSlice.actions;
export default loginSlice.reducer;
