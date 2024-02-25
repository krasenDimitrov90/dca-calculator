export const calculatePortfolio = (data, currentFiatCurrency, BTC_PRICE) => {
    const portfolio = {
        invested: 0,
        accumulated: 0,
    };

    data.reduce((acc, curr) => {
        acc.accumulated += (50 / curr.prices[currentFiatCurrency]);
        acc.invested += 50;
        return acc;
    }, portfolio)

    let totalValueOfBitcoinInFiat = portfolio.accumulated * BTC_PRICE[currentFiatCurrency];
    let profit = ((totalValueOfBitcoinInFiat - portfolio.invested) / Math.abs(portfolio.invested)) * 100;

    return {
        btcAcummulated: portfolio.accumulated.toFixed(5),
        totalInvested: portfolio.invested.toFixed(0),
        totalValue: totalValueOfBitcoinInFiat.toFixed(0),
        percentageChange: profit.toFixed(0),
    }
}