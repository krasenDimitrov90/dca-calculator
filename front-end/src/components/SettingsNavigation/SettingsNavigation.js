import React from 'react';
import './SettingsNavigation.styles.css'
import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';
import { createYearsArray, subtractYears, sumYears } from '../../utils';

import { Button, Input, Select } from '../../UI/index';

const BASE_URL = 'https://dca-calculator-kras-7fbdbafd2f5c.herokuapp.com';
// const BASE_URL = 'https://dca-calculator-kras-2-b13afe117966.herokuapp.com';
// const BASE_URL = 'http://localhost:8080';

const SELECTTORS = [
    {
        label: 'Reapeat purchase',
        name: 'reapeatPurchase',
        options: ['Monthly', 'Weekly', 'Daily'],
        onChange: 'repeatPerchase',
    },
    {
        label: 'Accumulate For',
        name: 'accumulateFor',
        // options: ['1 Year', '2 Years', '3 Years'],
        options: createYearsArray('primary'),
        onChange: 'acummulateFor',
    },
    {
        label: 'Starting',
        name: 'starting',
        // options: ['1 Year Ago', '2 Years Ago', '3 Years Ago',],
        options: createYearsArray('secondary'),
        onChange: 'startingFrom',
    }
];

const BTC_PRICE = {
    usd: 50000,
    eur: 46207,
    bgn: 90422,
};

export const SettingsNavigation = React.memo(() => {

    const dispatch = useDispatch();
    const currency = useSelector(state => state.currency.current);

    const formRef = React.useRef(null);

    const repeatPerchaseRef = React.useRef(SELECTTORS[0].options[0]);
    const accumulateForRef = React.useRef(SELECTTORS[1].options[0]);
    const startingFromRef = React.useRef(SELECTTORS[2].options[0]);

    const onRepeatPurchaseChange = React.useCallback((value) => {
        repeatPerchaseRef.current = value;
    }, []);

    const onAcummulateForChange = React.useCallback((value) => {
        accumulateForRef.current = value;
    }, []);

    const onStartingFromChange = React.useCallback((value) => {
        startingFromRef.current = value;
    }, []);

    const onChangeHandlers = {
        repeatPerchase: onRepeatPurchaseChange,
        acummulateFor: onAcummulateForChange,
        startingFrom: onStartingFromChange
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(formRef.current));

        const accumulateFrom = Number(data.starting.split(' ')[0]);
        const accumulateFor = Number(data.accumulateFor.split(' ')[0]);
        const start = subtractYears(new Date(), accumulateFrom);
        const end = sumYears(start, accumulateFor);
        const reapeatPurchase = data.reapeatPurchase;
        const purchaseAmount = Number(data.purchaseAmount);
        const currentCurrency = currency.toLowerCase();

        const calculatePortfolio = (data) => {
            const portfolio = {
                invested: 0,
                accumulated: 0,
            };


            data.reduce((acc, curr) => {
                let value = (purchaseAmount / curr.prices[currentCurrency]);
                acc.accumulated += (purchaseAmount / curr.prices[currentCurrency]);
                acc.invested += purchaseAmount;
                return acc;
            }, portfolio)


            let totalValueOfBitcoinInFiat = portfolio.accumulated * BTC_PRICE[currentCurrency];
            // Calculate the percenteage of investment (positive or negative)
            let profit = ((totalValueOfBitcoinInFiat - portfolio.invested) / Math.abs(portfolio.invested)) * 100;

            return {
                btcAcummulated: portfolio.accumulated.toFixed(5),
                totalInvested: portfolio.invested.toFixed(0),
                totalValue: totalValueOfBitcoinInFiat.toFixed(0),
                percentageChange: profit.toFixed(0),
            }
        }

        dispatch(appLoadingActions.setAppIsLoading(true))

        fetch(BASE_URL + `/bitcoin-history?start=${start}&end=${end}&repetition-period=${reapeatPurchase}`)
            .then(res => res.json())
            .then(data => {
                let portfolio = calculatePortfolio(data);
                console.log(data)
                dispatch(portfolioActions.refreshPortfolio(portfolio));
                dispatch(appLoadingActions.setAppIsLoading(false))
            })
            .catch(err => {
                console.log({ err });
            });
    };

    return (
        <div className='custom-gradient-secondary flex flex-col p-app-lg rounded-app-s'>
            <div className='flex mb-app-lg text-app-text-primary'>
                <p>Settings</p>
            </div>

            <form ref={formRef} className='flex flex-col gap-app-base'>
                <Input
                    name='purchaseAmount'
                    label='Purchase amount:'
                    type='number'
                    inputDescription={currency}
                    initialValue={50}
                    min={1}

                />
                {
                    SELECTTORS.map(selector => {
                        return (
                            <Select
                                key={`${selector.label}`}
                                variant={Select.variants.LABEL_UP}
                                label={selector.label}
                                name={selector.name}
                                options={selector.options}
                                onChange={onChangeHandlers[selector.onChange]}
                            />
                        );
                    })
                }
                <Button
                    onClick={submitHandler}
                >
                    CALCULATE
                </Button>
            </form>

        </div>
    );
});
