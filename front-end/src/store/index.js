import { configureStore } from '@reduxjs/toolkit';
import fiatCurrencyReducer from './fiat-currency';
import portfolioReducer from './portfolio';
import appLoadingReducer from './loading';

const store = configureStore({
    reducer: {
        fiatCurrency: fiatCurrencyReducer,
        portfolio: portfolioReducer,
        appLoading: appLoadingReducer,
    }
});


export default store;