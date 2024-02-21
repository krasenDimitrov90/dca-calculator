import React from 'react';
import './Navigation.styles.css';
import { Select } from '../../UI/Select/Select';
import { currencyActions } from '../../store/currency';
import { useSelector, useDispatch } from 'react-redux';

export const Navigation = React.memo(() => {

    const dispathc = useDispatch();
    const { current: currency, currencies } = useSelector(state => state.currency);

    const onCurruncyChange = (value) => {
        dispathc(currencyActions.changeCurrency({ currency: value }));
    };

    return (
        <div className='flex flex-col desktop:flex-row justify-between text-app-text-primary py-app-base'>
            <div className='flex items-end py-app-xs'>
                <div className='flex items-end h-full gap-[6px] py-[3px] mr-app-base'>
                    <span className='flex bg-app-blue-primary h-[25%] w-[3px] rounded'></span>
                    <span className='flex bg-app-blue-primary h-[60%] w-[3px] rounded'></span>
                    <span className='flex bg-app-blue-primary h-[96%] w-[3px] rounded'></span>
                </div>
                <h3 className='text-app-xl'>Dollar Cost Average</h3>
            </div>
            <Select
                variant={Select.variants.LABEL_LEFT}
                label='Currency'
                options={currencies}
                onChange={onCurruncyChange}
            />
        </div>
    );
});
