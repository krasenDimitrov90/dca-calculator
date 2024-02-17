const getBitcoinPriceHistory = async (vsCurrency) => {
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart';
    const fromTimestamp = Math.floor(new Date('2010-01-01').getTime() / 1000);
    const toTimestamp = Math.floor(new Date('2024-02-16').getTime() / 1000);

    const url = `${baseUrl}?vs_currency=${vsCurrency}&from=${fromTimestamp}&to=${toTimestamp}&days=${(toTimestamp - fromTimestamp) / (24 * 60 * 60)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Format the data as an array of objects with the requested structure
        const formattedData = data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString('en-GB'), // Format date as "DD/MM/YYYY"
            prices: [{ [vsCurrency]: price.toFixed(2) }] // Format price as {"usd": 106.31}
        }));

        return formattedData;
    } catch (error) {
        console.error(`Error fetching data for ${vsCurrency}:`, error);
        return null;
    }
};

const mergeEuroPrices = async (bitcoinPriceHistory) => {
    const euroData = await getBitcoinPriceHistory('eur');

    if (euroData) {
        // Get the exchange rate between Euro and Bulgarian Lev (BGN)
        const exchangeRate = await getExchangeRate('eur', 'bgn');

        // Merge Euro prices into existing data and convert to BGN
        bitcoinPriceHistory.forEach((entry, index) => {
            const euroPrice = euroData[index].prices[0].eur;
            const bgnPrice = euroPrice * 1.96;
            entry.prices.push({ euro: euroPrice }, { bgn: bgnPrice.toFixed(2) });
        });
    }

    return bitcoinPriceHistory;
};

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const exchangeRateUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(exchangeRateUrl);
        const data = await response.json();

        return data.rates[toCurrency];
    } catch (error) {
        console.error(`Error fetching exchange rate from ${fromCurrency} to ${toCurrency}:`, error);
        return null;
    }
};

// Example usage
getBitcoinPriceHistory('usd').then(async (bitcoinPriceHistoryUSD) => {
    const bitcoinPriceHistoryWithEuro = await mergeEuroPrices(bitcoinPriceHistoryUSD);

    if (bitcoinPriceHistoryWithEuro) {
        // Output the final formatted data
        console.log(JSON.stringify(bitcoinPriceHistoryWithEuro, null, 2));
    }
});