import React from 'react';
import './SettingsNavigation.styles.css'
import { useSelector } from 'react-redux';

import { Select } from '../../UI/index';

const SELECTTORS = [
    {
        label: 'Reapeat purchase',
        options: ['Monthly', 'Weekly', 'Daily'],
        onChange: 'repeatPerchase',
    },
    {
        label: 'Accumulate For',
        options: ['1 Year', '2 Years', '3 Years'],
        onChange: 'acummulateFor',
    },
    {
        label: 'Starting',
        options: ['1 Year Ago', '2 Years Ago', '3 Years Ago',],
        onChange: 'startingFrom',
    }
];

export const SettingsNavigation = React.memo(() => {

    const currency = useSelector(state => state.currency.current);


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

    const onChangeFuncs = {
        repeatPerchase: onRepeatPurchaseChange,
        acummulateFor: onAcummulateForChange,
        startingFrom: onStartingFromChange
    };
    return (
        <div className='settings-navigation-container custom-gradient-secondary'>
            <div className='flex mb-app-lg text-app-text-primary'>
                <p>Settings</p>
            </div>

            <div className='flex flex-col gap-app-base'>
                <div>
                    <label htmlFor="purchaseAmount" className='font-bold text-app-text-secondary '>Purchase amount:</label>
                    <div className='flex'>
                        <input type="number" name="purchaseAmount" required
                            className='flex-1 rounded-l-app-s outline-none bg-app-purple pl-app-base text-app-text-primary'
                        />
                        <div className='py-app-s px-app-sm bg-[#444788] font-bold text-app-text-secondary rounded-r-app-s flex justify-center'>
                            <p>{currency}</p>
                        </div>
                    </div>
                </div>
                {
                    SELECTTORS.map(selector => {
                        return (
                            <Select
                                key={`${selector.label}`}
                                variant={Select.variants.LABEL_UP}
                                label={selector.label}
                                options={selector.options}
                                onChange={onChangeFuncs[selector.onChange]}
                            />
                        );
                    })
                }
            </div>
            <button onClick={() => {
                console.log(repeatPerchaseRef.current)
                console.log(accumulateForRef.current)
                console.log(startingFromRef.current)
            }}>OK</button>
        </div>
    );
});
