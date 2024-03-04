import React from 'react';
import './StatisticBanner.styles.css';

import { StatisticValue } from './StatisticValue';
import { formatNumberWithSuffixAndCommas } from '../../utils/format-numbers';

export const StatisticBanner = ({
    symbol, value, label, image
}) => {

    let satoshis = null;
    let formatedSatoshis = null;
    if (!symbol) {
        satoshis = Number(value) * 100000000; // 1 BTC is 100 000 000 Satoshis
        formatedSatoshis = formatNumberWithSuffixAndCommas(satoshis)
    }

    const formatValue = React.useCallback((value) => {
        if (symbol === '%') return value.toString();
        else if (!symbol) return value < 1 ? Number(value).toFixed(6) : formatNumberWithSuffixAndCommas(value);
        else return formatNumberWithSuffixAndCommas(value);
    }, []);

    const formatedValue = formatValue(value);

    return (
        <div className='statistic-banner-item custom-gradient-primary'>
            <div className='flex w-[64px] h-[64px] bg-app-purple p-app-sm rounded-app-s mr-app-lg'>
                <img src={image} alt="btc" />
            </div>
            <div className='flex flex-col justify-center'>
                <StatisticValue symbol={symbol} value={formatedValue} />
                {satoshis && <p className='py-app-xs text-app-sm text-app-text-primary'>{formatedSatoshis} Satoshis</p>}
                <p className='text-app-text-secondary font-bold'>{label}</p>
            </div>
        </div>
    );
};

StatisticBanner.images = {
    BTC: '/images/btc-logo.png',
    USD: '/images/dollar.png',
    CHART: '/images/chart.png',
    ARROW_DOWN: '/images/arrow-down.png',
    ARROW_UP: '/images/arrow-up.png',
};