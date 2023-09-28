import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name: 'userData',
    initialState: {},
    reducers:{
        addData:(state,action)=>{
            return action.payload;
        }
    }
});
export const {addData} =userSlice.actions;
export default userSlice.reducer;



