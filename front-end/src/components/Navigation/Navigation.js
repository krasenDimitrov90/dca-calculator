import React, { useEffect, useRef, useState } from 'react';
import './Navigation.styles.css';
import { Select } from '../../UI/Select/Select';
import { fiatCurrencyActions } from '../../store/fiat-currency';
import { useSelector, useDispatch } from 'react-redux';
import { AssetPriceValue } from '../../UI';

const BTC_PRICE_SYMBOLS = {
  USD: 'btcusdt',
  EUR: 'btceur',
  BGN: 'btceur',
};

export const Navigation = ({ currentBTCPrice }) => {

  const dispatch = useDispatch();
  const { fiatCurrencies } = useSelector(state => state.fiatCurrency);
  const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);

  const onCurruncyChange = (value) => {
    dispatch(fiatCurrencyActions.changeCurrency({ currency: value }));
  };

  const [price, setPrice] = useState(null);
  const [priceWentUp, setPriceWentUp] = useState(false);
  const lastPriceRef = useRef(0);
  const socketRef = useRef(null);


  useEffect(() => {
    if (price !== null && lastPriceRef.current !== null) {
      let lastPrice = lastPriceRef.current
      console.log({ price, lastPrice }, price > lastPrice);
      setPriceWentUp(() => price > lastPrice);
      lastPriceRef.current = price;
    }
  }, [price]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${BTC_PRICE_SYMBOLS[currentFiatCurrency]}@ticker`
    );

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.c).toFixed(2) // 'c' represents the current price
      setPrice(() => newPrice);

    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [currentFiatCurrency]);

  return (
    <div className='flex flex-col desktop:flex-row justify-between text-app-text-primary py-s'>
      <div className='flex items-end py-app-xs'>
        <div className='flex items-end h-full gap-[6px] py-[3px] mr-app-base'>
          <span className='flex bg-app-blue-primary h-[25%] w-[3px] rounded'></span>
          <span className='flex bg-app-blue-primary h-[60%] w-[3px] rounded'></span>
          <span className='flex bg-app-blue-primary h-[96%] w-[3px] rounded'></span>
        </div>
        <h3 className='text-app-xl'>Dollar Cost Average</h3>
      </div>
      <AssetPriceValue
        fiatCurrency={currentFiatCurrency}
        priceWentUp={priceWentUp}
        assetPrice={currentFiatCurrency === 'BGN' ? Number(price) * 1.96 : Number(price)}
      // assetPrice={currentBTCPrice[currentFiatCurrency.toLowerCase()]}
      />
      <Select
        variant={Select.variants.LABEL_LEFT}
        label='Currency'
        options={fiatCurrencies}
        onChange={onCurruncyChange}
      />
    </div>
  );
};
