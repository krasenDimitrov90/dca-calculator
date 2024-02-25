import React from 'react';
import './Statistics.styles.css';

import { useSelector } from 'react-redux';
import { StatisticBanner } from '../../UI';


export const Statistics = React.memo(() => {

    const portfolio = useSelector(state => state.portfolio);
    const currency = useSelector(state => state.fiatCurrency.current);

    return (
        <div className='flex flex-col desktop:flex-row my-app-sm '>
            {
                Object.values(portfolio).map(banner => {
                    let image = '';
                    if (banner.label === 'Percent change') {
                        image = banner.value > 0 ? banner.image[0] : banner.image[1];
                    } else {
                        image = banner.image;
                    }
                    return (
                        <StatisticBanner
                            key={`statistic-banner-${banner.label}`}
                            symbol={banner.symbols?.[currency]}
                            value={banner.value}
                            label={banner.label}
                            image={StatisticBanner.images[image]}
                        />
                    );
                })
            }
        </div>
    );
});
