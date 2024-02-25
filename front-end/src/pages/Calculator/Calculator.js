import React from 'react';
import './Calculator.styles.css';
import { Navigation, Statistics, SettingsNavigation, PortfolioChart } from '../../components/index';

import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';

import { subtractYears, sumYears, calculatePortfolio } from '../../utils';

import { api } from '../../hooks/api';

export const Calculator = React.memo(() => {

    const dispatch = useDispatch();
    const currentFiatCurrency = useSelector(state => state.fiatCurrency.current.toLowerCase());
    const BTC_PRICE  = useSelector(state => state.bitcoin.prices);

    const start = subtractYears(new Date(), 1);
    const end = sumYears(start, 1);
    const reapeatPurchase = 'Monthly';
    const purchaseAmount = 50;

    React.useEffect(() => {

        dispatch(appLoadingActions.setAppIsLoading(true));
        
        api
            .getBTCHistory(start, end, reapeatPurchase)
            .then(data => {
                console.log(data)
                const portfolio = calculatePortfolio(data, purchaseAmount, currentFiatCurrency, BTC_PRICE);
                dispatch(portfolioActions.refreshPortfolio(portfolio));
                dispatch(appLoadingActions.setAppIsLoading(false));
            })
            .catch(err => {
                console.log({ err });
                dispatch(appLoadingActions.setAppIsLoading(false));
            });
    }, []);

    return (
        <div className='container'>
            <Navigation />

            <div className='flex flex-col'>
            <h2>{BTC_PRICE.usd}</h2>
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
