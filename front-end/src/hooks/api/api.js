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
