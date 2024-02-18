import { createSlice, configureStore } from '@reduxjs/toolkit';

const currencySlice = createSlice({
    name: 'currency',
    initialState: { current: 'USD', currencies: ['USD', 'EUR', 'BGN'] },
    reducers: {
        changeCurrency(state, action) {
            state.current = action.payload.currency;
        },
    },
});

const store = configureStore({
    reducer: {
        currency: currencySlice.reducer
    }
});

export const currencyActions = currencySlice.actions;

export default store;