import { createSlice } from "@reduxjs/toolkit";

const appLoading = createSlice({
    name: 'appLoading',
    initialState: { appIsLoading: false },
    reducers: {
        setAppIsLoading(state, action) {
            state.appIsLoading = action.payload;
        },
    },
});

export const appLoadingActions = appLoading.actions;

export default appLoading.reducer;