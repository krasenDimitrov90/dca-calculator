import React from 'react';

const BASE_URL = 'https://dca-calculator-kras-7fbdbafd2f5c.herokuapp.com';

export const getBTCHistory = (start, end, reapeatPurchase) => {
    const endPoint = `/bitcoin-history?start=${start}&end=${end}&repetition-period=${reapeatPurchase}`;

    return fetch(BASE_URL + endPoint)
        .then(res => res.json())
        .catch(err => {
            console.log('IN getBTCHistoryMonthly hook',{err});
            return undefined;
        })
};

export const getBTCPriceInUSDFromCoinGeco = () => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`;

    return fetch(url)
        .then(res => res.json())
        .then(data => data.bitcoin.usd)
        .catch(err => {
            console.log('IN getBTCHistoryMonthly hook',{err});
            return 50000;
        })
};

export const getBTCPriceInEURFromCoinGeco = () => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur`;

    return fetch(url)
        .then(res => res.json())
        .then(data => data.bitcoin.eur)
        .catch(err => {
            console.log('IN getBTCHistoryMonthly hook',{err});
            return 46152;
        })
};

