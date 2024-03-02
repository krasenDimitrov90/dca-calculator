import store from "../store";

export const calculatePortfolio = (data, purchaseAmount) => {
    if (data.length === 0) return {
        btcAcummulated: 0,
        totalInvested: 0,
        totalValue: 0,
        percentageChange: 0,
    };

    let currentFiatCurrency = store.getState().fiatCurrency.current.toLowerCase();

    const BTC_PRICE = store.getState().bitcoin.prices[currentFiatCurrency];

    const portfolio = {
        invested: 0,
        accumulated: 0,
    };

    data.reduce((acc, curr) => {
        acc.accumulated += (purchaseAmount / curr.prices[currentFiatCurrency]);
        acc.invested += purchaseAmount;
        return acc;
    }, portfolio)

    let totalValueOfBitcoinInFiat = portfolio.accumulated * BTC_PRICE;
    let profit = ((totalValueOfBitcoinInFiat - portfolio.invested) / Math.abs(portfolio.invested)) * 100;

    return {
        btcAcummulated: portfolio.accumulated.toFixed(5),
        totalInvested: portfolio.invested.toFixed(0),
        totalValue: totalValueOfBitcoinInFiat.toFixed(0),
        percentageChange: profit.toFixed(0),
    }
}