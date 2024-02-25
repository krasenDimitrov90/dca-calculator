import React from 'react';
import './Calculator.styles.css';
import { Navigation, Statistics, SettingsNavigation, PortfolioChart } from '../../components/index';

import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';

import { subtractYears, sumYears, calculatePortfolio } from '../../utils';

const BASE_URL = 'https://dca-calculator-kras-7fbdbafd2f5c.herokuapp.com';
// const BASE_URL = 'https://dca-calculator-kras-2-b13afe117966.herokuapp.com';
// const BASE_URL = 'http://localhost:8080';

export const Calculator = React.memo(() => {

    const BTC_PRICE = {
        usd: 50000,
        eur: 46207,
        bgn: 90422,
    };

    const dispatch = useDispatch();
    const currentFiatCurrency = useSelector(state => state.fiatCurrency.current.toLowerCase());

    const start = subtractYears(new Date(), 1);
    const end = sumYears(start, 1);

    React.useEffect(() => {
        dispatch(appLoadingActions.setAppIsLoading(true))
        fetch(BASE_URL + `/bitcoin-history?start=${start}&end=${end}&repetition-period=Monthly`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const portfolio = calculatePortfolio(data,currentFiatCurrency, BTC_PRICE);
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
