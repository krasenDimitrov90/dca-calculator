export const calculatePortfolio = (data, purchaseAmount, currentFiatCurrency, BTC_PRICE) => {
    
    currentFiatCurrency = currentFiatCurrency.toLowerCase();
    const portfolio = {
        invested: 0,
        accumulated: 0,
    };

    data.reduce((acc, curr) => {
        acc.accumulated += (purchaseAmount / curr.prices[currentFiatCurrency]);
        acc.invested += purchaseAmount;
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