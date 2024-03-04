import React from 'react';
import { formatNumberWithSuffixAndCommas } from '../../utils/format-numbers';

export const StatisticValue = ({ symbol, value }) => {

    return (
        <div>
            {(symbol === '$' || symbol === '€') &&
                <span className='font-app-font-family-primary text-app-text-primary text-app-xl mr-app-xs'>
                    {symbol}
                </span>}
            <span className='font-app-font-family-primary text-app-text-primary text-app-xl'>
                {value}
            </span>
            {(symbol === '%') && <span className='font-app-font-family-primary text-app-text-primary text-app-xl ml-app-xs'>
                {symbol}
            </span>}
            {(symbol === 'BGN') && <span className='font-app-font-family-primary text-app-text-primary text-app-sm ml-app-xs'>
                {symbol}
            </span>}
        </div>
    );
};
