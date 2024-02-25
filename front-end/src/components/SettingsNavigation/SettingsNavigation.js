import React from 'react';
import './SettingsNavigation.styles.css'
import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';
import { createYearsArray, subtractYears, sumYears, calculatePortfolio } from '../../utils';

import { Button, Input, Select } from '../../UI/index';

import { api } from '../../hooks/api';

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
        options: createYearsArray('primary'),
        onChange: 'acummulateFor',
    },
    {
        label: 'Starting',
        name: 'starting',
        options: createYearsArray('secondary'),
        onChange: 'startingFrom',
    }
];

export const SettingsNavigation = React.memo(() => {

    const dispatch = useDispatch();
    const currentFiatCurrency = useSelector(state => state.fiatCurrency.current.toLowerCase());
    const BTC_PRICE = useSelector(state => state.bitcoin.prices);

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



        dispatch(appLoadingActions.setAppIsLoading(true))

        api
            .getBTCHistory(start, end, reapeatPurchase)
            .then(data => {
                let portfolio = calculatePortfolio(data, purchaseAmount, currentFiatCurrency, BTC_PRICE);
                console.log(data)
                dispatch(portfolioActions.refreshPortfolio(portfolio));
                dispatch(appLoadingActions.setAppIsLoading(false))
            })
            .catch(err => {
                console.log({ err });
                dispatch(appLoadingActions.setAppIsLoading(false));
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
                    inputDescription={currentFiatCurrency}
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
