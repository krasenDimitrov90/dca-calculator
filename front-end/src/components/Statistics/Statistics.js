import React from 'react';
import './Statistics.styles.css';

import { useSelector } from 'react-redux';
import { StatisticBanner } from '../../UI';

import { calculatePortfolio } from '../../utils';

const initialState = {
    "bitcoin-acumulated": {
        value: 0,
        label: "Bitcoin acumulated",
        image: 'BTC',
    },
    "total-invested": {
        value: 0,
        label: "Total invested",
        image: 'USD',
        symbols: { USD: '$', EUR: '€', BGN: 'BGN' }
    },
    "total-value": {
        value: 0,
        label: "Total value",
        image: 'CHART',
        symbols: { USD: '$', EUR: '€', BGN: 'BGN' }
    },
    "profit": {
        value: 0,
        label: "Profit",
        image: ['ARROW_UP', 'ARROW_DOWN'],
        symbols: { USD: '%', EUR: '%', BGN: '%' }
    },
};

export const Statistics = ({ btcHistory, purchaseAmount }) => {

    const [portfolio, setPortfolio] = React.useState(initialState);
    const currency = useSelector(state => state.fiatCurrency.current);

    React.useEffect(() => {
        setPortfolio(curr => {
            const {
                btcAcummulated,
                totalInvested,
                totalValue,
                percentageChange, } = calculatePortfolio(btcHistory, purchaseAmount);
            const newState = {
                "bitcoin-acumulated": { ...curr["bitcoin-acumulated"], value: btcAcummulated },
                "total-invested": { ...curr["total-invested"], value: totalInvested },
                "total-value": { ...curr["total-value"], value: totalValue },
                "profit": { ...curr["profit"], value: percentageChange },
            };

            return newState;
        });
    }, [currency, btcHistory]);

    return (
        <div className='flex flex-col desktop:flex-row my-app-sm '>
            {
                Object.values(portfolio).map(banner => {
                    let image = '';
                    if (banner.label === 'Profit') {
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
};
