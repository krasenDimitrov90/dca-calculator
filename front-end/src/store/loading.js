import { createSlice } from "@reduxjs/toolkit";

const appLoadingSlice = createSlice({
    name: 'appLoading',
    initialState: { appIsLoading: false },
    reducers: {
        setAppIsLoading(state, action) {
            state.appIsLoading = action.payload;
        },
    },
});

export const appLoadingActions = appLoadingSlice.actions;

export default appLoadingSlice.reducer;