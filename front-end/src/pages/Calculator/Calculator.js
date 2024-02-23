import React from 'react';
import './Calculator.styles.css';
import { Navigation, Statistics, SettingsNavigation, PortfolioChart } from '../../components/index';

import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';

import { subtractYears, sumYears } from '../../utils';

const BASE_URL = 'https://dca-calculator-kras-2-b13afe117966.herokuapp.com';
// const BASE_URL = 'http://localhost:8080';

export const Calculator = React.memo(() => {

    const BTC_PRICE = {
        usd: 50000,
        eur: 46207,
        bgn: 90422,
    };

    const dispatch = useDispatch();
    const currentCurrency = useSelector(state => state.currency.current.toLowerCase());

    const calculatePortfolio = (data) => {
        const portfolio = {
            invested: 0,
            accumulated: 0,
        };

        data.reduce((acc, curr) => {
            acc.accumulated += (50 / curr.prices[currentCurrency]);
            acc.invested += 50;
            return acc;
        }, portfolio)

        let totalValueOfBitcoinInFiat = portfolio.accumulated * BTC_PRICE[currentCurrency];
        let profit = ((totalValueOfBitcoinInFiat - portfolio.invested) / Math.abs(portfolio.invested)) * 100;

        return {
            btcAcummulated: portfolio.accumulated.toFixed(5),
            totalInvested: portfolio.invested.toFixed(0),
            totalValue: totalValueOfBitcoinInFiat.toFixed(0),
            percentageChange: profit.toFixed(0),
        }
    }

    const start = subtractYears(new Date(), 1);
    const end = sumYears(start, 1);

    React.useEffect(() => {
        dispatch(appLoadingActions.setAppIsLoading(true))
        fetch(BASE_URL + `/bitcoin-history?start=${start}&end=${end}&repetition-period=Monthly`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let portfolio = calculatePortfolio(data);
                dispatch(portfolioActions.refreshPortfolio(portfolio));
                dispatch(appLoadingActions.setAppIsLoading(false));
            })
            .catch(err => {
                console.log({ err });
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
