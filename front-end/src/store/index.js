import { createSlice, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';
import portfolioReducer from './portfolio';
import appLoadingReducer from './loading';

const store = configureStore({
    reducer: {
        currency: currencyReducer,
        portfolio: portfolioReducer,
        appLoading: appLoadingReducer,
    }
});


export default store;