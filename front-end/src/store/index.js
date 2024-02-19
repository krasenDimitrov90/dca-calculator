import { createSlice, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';
import portfolioReducer from './portfolio';

const store = configureStore({
    reducer: {
        currency: currencyReducer,
        portfolio: portfolioReducer,
    }
});


export default store;