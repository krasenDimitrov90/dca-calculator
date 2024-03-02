import React from 'react';

export const StatisticValue = React.memo(({ symbol, value }) => {

    const formatValue = React.useCallback((value) => {
        if (symbol === '$') return Number(value).toLocaleString();
        else return value.toString();
    }, []);

    const formatedValue = formatValue(value);

    return (
        <div>
            {(symbol === '$' || symbol === '€') &&
                <span className='font-app-font-family-primary text-app-text-primary text-app-xl mr-app-xs'>
                    {symbol}
                </span>}
            <span className='font-app-font-family-primary text-app-text-primary text-app-xl'>
                {formatedValue}
            </span>
            {(symbol === '%') && <span className='font-app-font-family-primary text-app-text-primary text-app-xl ml-app-xs'>
                {symbol}
            </span>}
            {(symbol === 'BGN') && <span className='font-app-font-family-primary text-app-text-primary text-app-sm ml-app-xs'>
                {symbol}
            </span>}
        </div>
    );
});
