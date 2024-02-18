import React from 'react';
import './StatisticBanner.styles.css';

export const StatisticBanner = React.memo(({
    leftSymbol, rightSymbol, value, content, image
}) => {
    return (
        <div className='statistic-banner-item custom-gradient-primary'>
            <div className='flex bg-app-purple p-app-sm rounded-app-s mr-app-lg'>
                <img src={image} alt="btc" />
            </div>
            <div className='flex flex-col justify-center'>
                <span className='font-app-font-family-primary text-app-text-primary text-app-xl'>{leftSymbol} {value} {rightSymbol}</span>
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