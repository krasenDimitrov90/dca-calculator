import { formatDateAsLocalString } from "./dates";

export const createInvestmentHistory = (historyPrices, fiatInvested, fiatCurrency) => {
    /* 
       historyPrices is array of objects with the price of BTC in 3 currencies
       { 
            date: "2023-03-01T00:00:00.000Z", 
            prices: { usd: 23155.54, eur: 21891.51, bgn: 42907.36 }
       }
    */

    let totalBitcoinBalance = 0;

    const investmentHistory = historyPrices.reduce((acc, curr) => {
        // const date = formatDateAsLocalString(curr.date);
        const date = new Date(curr.date);
        const btcPrice = curr.prices[fiatCurrency];
        const btcPurchased = fiatInvested / btcPrice;
        const totalCost = fiatInvested;

        totalBitcoinBalance += btcPurchased;

        const balance = totalBitcoinBalance * btcPrice;

        acc.push({
            date,
            btcPrice,
            btcPurchased,
            totalCost,
            balance,
        });

        return acc;
    }, []);

    return investmentHistory;
}
