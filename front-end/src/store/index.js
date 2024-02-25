import { configureStore } from '@reduxjs/toolkit';
import appLoadingReducer from './loading';
import bitcoinReducer from './bitcoin';
import fiatCurrencyReducer from './fiat-currency';
import portfolioReducer from './portfolio';

const store = configureStore({
    reducer: {
        fiatCurrency: fiatCurrencyReducer,
        portfolio: portfolioReducer,
        appLoading: appLoadingReducer,
        bitcoin: bitcoinReducer,
    }
});


export default store;