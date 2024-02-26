import React from 'react';

export const AssetPriceValue = React.memo(({ fiatCurrency, assetPrice }) => {

    const currencieLogos = {
        USD: '$', EUR: '€', BGN: 'lv'
    };

    const value = (Number(assetPrice.toFixed(2))).toLocaleString();

    return (
        <div className='flex py-app-sm'>
            <p className='text-app-text-primary text-app-xl'>
                <span>BTC/{fiatCurrency} </span>
                {fiatCurrency !== 'BGN' && <span className='text-[#6BCFB6]'>{currencieLogos[fiatCurrency]}</span>}
                <span className='text-[#6BCFB6]'>{value}</span>
                {fiatCurrency === 'BGN' && <span className='text-[#6BCFB6]'>{currencieLogos[fiatCurrency]}</span>}
            </p>
        </div>
    );
});