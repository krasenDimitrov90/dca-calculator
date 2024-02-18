import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name: 'currency',
    initialState: { current: 'USD', currencies: ['USD', 'EUR', 'BGN'] },
    reducers: {
        changeCurrency(state, action) {
            state.current = action.payload.currency;
        },
    },
});

export const currencyActions = currencySlice.actions;

export default currencySlice.reducer;