import React from 'react';
import './Statistics.styles.css';
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
    return (
        <div className='flex my-app-sm'>
            {
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
            }
            {/* <StatisticBanner
                value="45000"
                label="Bitcoin acumulated"
                image={StatisticBanner.images.BTC}
            />
            <StatisticBanner
                leftSymbol={'$'}
                value="45000"
                label="Total invested"
                image={StatisticBanner.images.USD}
            />
            <StatisticBanner
                leftSymbol={'$'}
                value="45000"
                label="Total value"
                image={StatisticBanner.images.CHART}
            />
            <StatisticBanner
                rightSymbol={'%'}
                value="45000"
                label="Percent change"
                image={StatisticBanner.images.ARROW_DOWN}
            /> */}

        </div>
    );
});
