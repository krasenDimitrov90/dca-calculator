import React from 'react';
import './StatisticBanner.styles.css';

export const StatisticBanner = React.memo(({
    symbol, value, content, image
}) => {
    return (
        <div className='custom-gradient-primary flex flex-1 h-[100px] rounded-xl p-app-lg'>
            <div className='flex bg-app-purple p-app-sm rounded-lg'>
                <img src={image} alt="btc" />
            </div>
            <div>
                <span className='font-app-font-family-primary text-app-text-primary'>{symbol} {value}</span>
                <p className='text-app-text-secondary font-bold'>{content}</p>
            </div>
        </div>
    );
});

StatisticBanner.images = {
    BTC: '/images/btc-logo.png',
    USD: '/images/dollar.png',
    CHART: './images/chart.png',
    ARROW_DOWN: './images/arrow-down.png',
};