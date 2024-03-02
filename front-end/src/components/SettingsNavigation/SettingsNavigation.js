import React from 'react';
import './SettingsNavigation.styles.css'
import { createYearsArray, subtractYears, sumYears } from '../../utils';

import { Button, Input, Select } from '../../UI/index';

const SELECTTORS = [
    {
        label: 'Reapeat purchase',
        name: 'repeatPurchase',
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


export const SettingsNavigation = React.memo(({
    currentFiatCurrency, investmentData, onChange
}) => {

    const formRef = React.useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(formRef.current));

        const accumulateFrom = Number(data.starting.split(' ')[0]);
        const accumulateFor = Number(data.accumulateFor.split(' ')[0]);
        const start = subtractYears(new Date(), accumulateFrom);
        const end = sumYears(start, accumulateFor);
        const repeatPurchase = data.repeatPurchase;
        const purchaseAmount = Number(data.purchaseAmount);

        onChange({
            repeatPurchase,
            purchaseAmount,
            startDate: start,
            endDate: end,
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
                    initialValue={investmentData.purchaseAmount}
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
