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
      <div className='flex items-center py-app-xs'>
        <div className='flex items-center h-full'>
          <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21C19 19.3431 20.3431 18 22 18H26C27.6569 18 29 19.3431 29 21V39C29 40.6569 27.6569 42 26 42H22C20.3431 42 19 40.6569 19 39V21Z" fill="#737CD9"></path>
            <path d="M6 33C6 31.3431 7.34315 30 9 30H13C14.6569 30 16 31.3431 16 33V39C16 40.6569 14.6569 42 13 42H9C7.34315 42 6 40.6569 6 39V33Z" fill="#737CD9"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 9C32 7.34315 33.3431 6 35 6H39C40.6569 6 42 7.34315 42 9V39C42 40.6569 40.6569 42 39 42H35C33.3431 42 32 40.6569 32 39V9ZM35 8C34.4477 8 34 8.44772 34 9V39C34 39.5523 34.4477 40 35 40H39C39.5523 40 40 39.5523 40 39V9C40 8.44772 39.5523 8 39 8H35Z" fill="#737CD9"></path>
          </svg>
        </div>
        <h3 className='text-app-xl'>Dollar Cost Average</h3>
      </div>
      <AssetPriceValue
        fiatCurrency={currentFiatCurrency}
        priceWentUp={priceWentUp}
        assetPrice={currentFiatCurrency === 'BGN' ? Number(price) * 1.96 : Number(price)}
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
