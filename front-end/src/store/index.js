import { createSlice, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';


const store = configureStore({
    reducer: {
        currency: currencyReducer
    }
});


export default store;