const getBitcoinPriceHistory = async (vsCurrency, startDate, endDate) => {
  const baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart';
  const fromTimestamp = Math.floor(startDate.getTime() / 1000);
  const toTimestamp = Math.floor(endDate.getTime() / 1000);

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
    return [];
  }
};

const mergeEuroPrices = async (bitcoinPriceHistory, startDate, endDate) => {
  try {
    const euroData = await getBitcoinPriceHistory('eur', startDate, endDate);

    if (euroData) {
      // Get the exchange rate between Euro and Bulgarian Lev (BGN)
      // const exchangeRate = await getExchangeRate('eur', 'bgn');

      // Merge Euro prices into existing data and convert to BGN
      bitcoinPriceHistory.forEach((entry, index) => {
        const euroPrice = euroData[index].prices[0].eur;
        const bgnPrice = euroPrice * 1.96;
        entry.prices.push({ euro: euroPrice }, { bgn: bgnPrice.toFixed(2) });
      });
    }

    return bitcoinPriceHistory;
  } catch (err) {
    return [];
  }
};

const filterPrices = (bitcoinPrices) => {
  let memo = {};
  return bitcoinPrices.reduce((acc, curr) => {
    if (curr.date in memo) return acc;
    acc.push(curr);
    memo[curr.date] = curr.date;
    return acc;
  }, []);
};

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const exchangeRateUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(exchangeRateUrl);
    const data = await response.json();

    return data.rates[toCurrency];
  } catch (error) {
    console.error(`Error fetching exchange rate from ${fromCurrency} to ${toCurrency}:`, error);
    return 1;
  }
};


const fetchBitcoinPrice = async (startDate, endDate) => {
  try {
    const bitcoinPriceHistoryUSD = await getBitcoinPriceHistory('usd', startDate, endDate);
    const bitcoinPriceHistoryWithEuro = await mergeEuroPrices(bitcoinPriceHistoryUSD, startDate, endDate);
    const filteredPrices = filterPrices(bitcoinPriceHistoryWithEuro);
    if (bitcoinPriceHistoryWithEuro) {
      // Output the final formatted data
      // console.log(JSON.stringify(filteredPrices, null, 2));
      return filteredPrices;
    }
  } catch (err) {
    return [];
  }
};

module.exports = fetchBitcoinPrice;
