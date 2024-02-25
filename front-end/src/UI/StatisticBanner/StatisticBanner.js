import React from 'react';
import './StatisticBanner.styles.css';

import { StatisticValue } from './StatisticValue';

export const StatisticBanner = React.memo(({
    symbol, value, label, image
}) => {

    return (
        <div className='statistic-banner-item custom-gradient-primary'>
            <div className='flex w-[64px] h-[64px] bg-app-purple p-app-sm rounded-app-s mr-app-lg'>
                <img src={image} alt="btc" />
            </div>
            <div className='flex flex-col justify-center'>
                <StatisticValue symbol={symbol} value={value} />
                <p className='text-app-text-secondary font-bold'>{label}</p>
            </div>
        </div>
    );
});

StatisticBanner.images = {
    BTC: '/images/btc-logo.png',
    USD: '/images/dollar.png',
    CHART: '/images/chart.png',
    ARROW_DOWN: '/images/arrow-down.png',
    ARROW_UP: '/images/arrow-up.png',
};