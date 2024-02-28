import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    USD: [],
    EUR: [],
    BGN: [],
};


const investmentsHistorySlice = createSlice({
    name: 'investmentHistory',
    initialState,
    reducers: {
        updateHistory(state, action) {
            const fiatCurrency = action.payload.fiatCurrency;
            state[fiatCurrency] = action.payload.newHistory;
        }
    },

});

export const investmentHistoryActions = investmentsHistorySlice.actions;

export default investmentsHistorySlice.reducer;