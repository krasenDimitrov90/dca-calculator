import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "bitcoin-acumulated": {
        value: 0,
        label: "Bitcoin acumulated",
        image: 'BTC',
    },
    "total-invested": {
        value: 0,
        label: "Total invested",
        image: 'USD',
        symbols: { USD: '$', EUR: '€', BGN: 'lv' }
    },
    "total-value": {
        value: 0,
        label: "Total value",
        image: 'CHART',
        symbols: { USD: '$', EUR: '€', BGN: 'lv' }
    },
    "percent-change": {
        value: 0,
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
                percentageChange } = action.payload;

            state["bitcoin-acumulated"].value = btcAcummulated;
            state["total-invested"].value = totalInvested;
            state["total-value"].value = totalValue;
            state["percent-change"].value = percentageChange;
        }
    },
});

export const portfolioActions = portfolioSlice.actions;

export default portfolioSlice.reducer;