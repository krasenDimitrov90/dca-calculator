import React from 'react';
import './Calculator.styles.css';
import { Navigation, StatisticBanner, SettingsNavigation, PortfolioChart } from '../../components/index';

export const Calculator = React.memo(() => {
    return (
        <div className='container'>
            <Navigation />

            <div className='flex flex-col'>
                <div className='statistic-baner-container my-app-sm'>
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
                <div className='flex my-app-sm'>
                    <div className='portfolio-left-section-wrapper custom-gradient-secondary'>
                        <PortfolioChart />
                    </div>
                    <div className='portfolio-right-section-wrapper'>
                        <SettingsNavigation />
                    </div>
                </div>
            </div>
        </div>
    );
});
