import React from 'react';
import './SettingsNavigation.styles.css'
import { useSelector } from 'react-redux';
import { createYearsArray } from '../../utils';

import { Button, Input, Select } from '../../UI/index';

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

export const SettingsNavigation = React.memo(() => {

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

        console.log(data);
    };

    return (
        <div className='settings-navigation-container custom-gradient-secondary'>
            <div className='flex mb-app-lg text-app-text-primary'>
                <p>Settings</p>
            </div>

            <form ref={formRef} className='flex flex-col gap-app-base'>
                <Input
                    name='purchaseAmount'
                    label='Purchase amount:'
                    type='number'
                    inputDescription={currency}

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
