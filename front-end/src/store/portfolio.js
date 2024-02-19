import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "bitcoin-acumulated": {
        value: 2.169160,
        label: "Bitcoin acumulated",
        image: 'BTC',
    },
    "total-invested": {
        value: 53000,
        label: "Total invested",
        image: 'USD',
        symbols: { USD: '$', EUR: '€', BGN: 'lv' }
    },
    "total-value": {
        value: 23454,
        label: "Total value",
        image: 'CHART',
        symbols: { USD: '$', EUR: '€', BGN: 'lv' }
    },
    "percent-change": {
        value: 45,
        label: "Percent change",
        image: 'ARROW_DOWN',
        symbols: { USD: '%', EUR: '%', BGN: '%' }
    },
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        refreshPortfolio(state, action) {
            const {
                btcAcummulated,
                totalInvested,
                totalValue,
                percentageChange } = action.payload.newValues;

            state.current["bitcoin-acumulated"] = btcAcummulated;
            state.current["total-invested"] = totalInvested;
            state.current["total-value"] = totalValue;
            state.current["percent-change"] = percentageChange;
        }
    },
});

export const portfolioActions = portfolioSlice.actions;

export default portfolioSlice.reducer;