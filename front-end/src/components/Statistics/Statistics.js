import React from 'react';
import './Statistics.styles.css';

import { useSelector } from 'react-redux';
import { StatisticBanner } from '../../UI';

const banners = [
    {
        value: 2.169160,
        label: "Bitcoin acumulated",
        image: 'BTC',
    },
    {
        value: 52000,
        label: "Total invested",
        image: 'USD',
        symbol: '$'
    },
    {
        value: 23454,
        label: "Total value",
        image: 'CHART',
        symbol: '$'
    },
    {
        value: 45,
        label: "Percent change",
        image: 'ARROW_DOWN',
        symbol: '%'
    }
];

export const Statistics = React.memo(() => {

    const portfolio = useSelector(state => state.portfolio);
    const currency = useSelector(state => state.currency.current);

    return (
        <div className='flex my-app-sm'>
         {
                Object.values(portfolio).map(banner => {
                    return (
                        <StatisticBanner
                            key={`statistic-banner-${banner.label}`}
                            symbol={banner.symbols?.[currency]}
                            value={banner.value}
                            label={banner.label}
                            image={StatisticBanner.images[banner.image]}
                        />
                    );
                })
            }
            {/* {
                banners.map(banner => {
                    return (
                        <StatisticBanner
                            key={`statistic-banner-${banner.label}`}
                            symbol={banner.symbol}
                            value={banner.value}
                            label={banner.label}
                            image={StatisticBanner.images[banner.image]}
                        />
                    );
                })
            } */}
        </div>
    );
});
