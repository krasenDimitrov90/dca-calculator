import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prices: {
        usd: 0,
        eur: 0,
        bgn: 0,
    },
}


const bitcoinSLice = createSlice({
    name: 'bitcoin',
    initialState,
    reducers: {
        setBitcoinPrices(state, action) {
            state.prices = action.payload;
        },
    },
});

export const bitcoinActions = bitcoinSLice.actions;

export default bitcoinSLice.reducer;