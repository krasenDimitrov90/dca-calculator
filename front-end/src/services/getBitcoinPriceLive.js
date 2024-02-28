export const getBTCPriceInUSDFromBinance = () => {
    // const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`;
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

    return fetch(url)
        .then(res => res.json())
        .then(data => data.price)
        .catch(err => {
            console.log('IN getBTCPriceInUSDFromCoinGeco',{err});
            return 50000;
        })
};

export const getBTCPriceInEURFromBinance = () => {
    // const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur`;
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR';

    return fetch(url)
        .then(res => res.json())
        .then(data => data.price)
        .catch(err => {
            console.log('IN getBTCPriceInEURFromCoinGeco ',{err});
            return 46152;
        })
};