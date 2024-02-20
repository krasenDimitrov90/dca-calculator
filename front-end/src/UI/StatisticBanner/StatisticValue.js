import React from 'react';

export const StatisticValue = React.memo(({ symbol, value }) => {

    const formatValue = React.useCallback((value) => {
        if (symbol === '$') return value.toLocaleString();
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
            {(symbol === '%' || symbol === 'lv') && <span className='font-app-font-family-primary text-app-text-primary text-app-xl ml-app-xs'>
                {symbol}
            </span>}
        </div>
    );
});
