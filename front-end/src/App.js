import React, { useState } from 'react';
import * as Pages from './pages/index';

import { useDispatch } from 'react-redux';
import { bitcoinActions } from './store/bitcoin';

import { BitcoinService } from './services/BitcoinService';

import { Loader } from './components';

const App = () => {

    const [busy, setBusy] = useState(true)

    const dispatch = useDispatch();

    const prepareBTCPrice = async () => {
        setBusy(true)
        try {
            let btcPrice = {};
            const btcInUsd = await BitcoinService.getBTCPrice('USDT')
            const btcInEur = await BitcoinService.getBTCPrice('EUR')
            const btcInBgn = Number(btcInEur.price) * 1.96;

            btcPrice = {
                usd: Number(btcInUsd.price),
                eur: Number(btcInEur.price),
                bgn: Number(btcInBgn),
            }
            dispatch(bitcoinActions.setBitcoinPrices(btcPrice));

        } catch (err) {
            console.log('There is problem with binance', err);
            const btcPrice = {
                usd: 50000,
                eur: 46152,
                bgn: 90405,
            };
            dispatch(bitcoinActions.setBitcoinPrices(btcPrice));
        } finally {
            setBusy(false)
        }

    };

    console.log('APP')

    React.useEffect(() => {
        prepareBTCPrice();
    }, []);

    return (
        <>
            <Loader variant={Loader.variants.LOADER_BARS} />
            <div className='flex flex-1 flex-col relative'>
                {busy ? undefined : <Pages.Calculator />}
            </div>
        </>
    );
};

export default App;
