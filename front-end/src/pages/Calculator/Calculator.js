import React from 'react';
import './Calculator.styles.css';
import { Navigation, Statistics, SettingsNavigation, PortfolioChart } from '../../components/index';

export const Calculator = React.memo(() => {
    return (
        <div className='container'>
            <Navigation />

            <div className='flex flex-col'>
                <Statistics />
                <div className='flex flex-col-reverse desktop:flex-row my-app-sm'>
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
