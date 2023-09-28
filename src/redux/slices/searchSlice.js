import { createSlice } from "@reduxjs/toolkit";




export const searchSlice = createSlice({
    name: 'search',
    initialState: [],
    reducers: {
        fetchData: (state, action) => {
            return action.payload;
        }
    }
});

export const { fetchData } = searchSlice.actions;
export default searchSlice.reducer;