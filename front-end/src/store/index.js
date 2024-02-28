import { configureStore } from '@reduxjs/toolkit';
import appLoadingReducer from './loading';
import bitcoinReducer from './bitcoin';
import fiatCurrencyReducer from './fiat-currency';
import portfolioReducer from './portfolio';
import investmentHistoryReducer from './investment-history';

const store = configureStore({
    reducer: {
        fiatCurrency: fiatCurrencyReducer,
        portfolio: portfolioReducer,
        appLoading: appLoadingReducer,
        bitcoin: bitcoinReducer,
        investmentHistory: investmentHistoryReducer,
    }
});


export default store;