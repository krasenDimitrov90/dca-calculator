import { createSlice } from "@reduxjs/toolkit";

const fiatCurrencySlice = createSlice({
    name: 'fiatCurrency',
    initialState: { current: 'USD', fiatCurrencies: ['USD', 'EUR', 'BGN'] },
    reducers: {
        changeCurrency(state, action) {
            state.current = action.payload.currency;
        },
    },
});

export const fiatCurrencyActions = fiatCurrencySlice.actions;

export default fiatCurrencySlice.reducer;