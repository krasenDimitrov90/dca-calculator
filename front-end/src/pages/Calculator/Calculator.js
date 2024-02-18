import React from 'react';
import './Calculator.styles.css';
import { Navigation, StatisticBanner } from '../../components/index';

export const Calculator = React.memo(() => {
    return (
        <div>
            <Navigation />

            <div className='flex gap-8'>
                <StatisticBanner 
                    symbol='$'
                    value="45000"
                    content="Bitcoin acumulated"
                    image={StatisticBanner.images.BTC}
                />
                 <StatisticBanner 
                    symbol='$'
                    value="45000"
                    content="Total invested"
                    image={StatisticBanner.images.USD}
                />
                 <StatisticBanner 
                    symbol='$'
                    value="45000"
                    content="Total value"
                    image={StatisticBanner.images.CHART}
                />
                 <StatisticBanner 
                    symbol='$'
                    value="45000"
                    content="Percent change"
                    image={StatisticBanner.images.ARROW_DOWN}
                />
               
            </div>
        </div>
    );
});
