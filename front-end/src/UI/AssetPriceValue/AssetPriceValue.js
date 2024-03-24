import React, { useRef } from 'react';

export const AssetPriceValue = React.memo(({ fiatCurrency, assetPrice, priceWentUp }) => {

  const currencieLogos = {
    USD: '$', EUR: '€', BGN: 'BGN'
  };

  let value = 0;
  if (assetPrice !== null) {
    value = (Number(assetPrice.toFixed(2))).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }


  return (
    <div className='flex py-app-sm'>
      <p className='text-app-text-primary text-app-xl'>
        <span>BTC </span>
        {fiatCurrency !== 'BGN' && <span className='text-[#6BCFB6] text-app-lg'>{currencieLogos[fiatCurrency]}</span>}
        <span className={priceWentUp ? 'text-[#6BCFB6]' : 'text-red-600'}>
          {value}
        </span>
        {fiatCurrency === 'BGN' && <span className='text-app-lg text-[#6BCFB6]'>{currencieLogos[fiatCurrency]}</span>}
      </p>
    </div>
  );
});