import React, { useState } from 'react';
import * as Pages from './pages/index';

import { useSelector, useDispatch } from 'react-redux';
import { bitcoinActions } from './store/bitcoin';

import { appLoadingActions } from './store/loading';
import { BitcoinService } from './services/BitcoinService';

const App = () => {

    const [busy, setBusy] = useState(true)

    const dispatch = useDispatch();

    const appIsLoading = useSelector(state => state.appLoading.appIsLoading);

    const prepareBTCPrice = async () => {
        setBusy(true)
        try {
            let btcPrice = {};
            const btcInUsd = await BitcoinService.getBTCPrice('USDT')
            const btcInEur = await BitcoinService.getBTCPrice('EUR')
            const btcInBgn = Number(btcInEur.price) * 1.96;

            console.log({
                btcInUsd,
                btcInEur,
                btcInBgn
            })

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
            dispatch(appLoadingActions.setAppIsLoading(false))
        }

    };

    React.useEffect(() => {
        prepareBTCPrice();
    }, []);

    return (
        <>
            <div className='flex flex-1 relative'>
                {appIsLoading && <div className='bg-black text-white text-app-3xl flex justify-center items-center z-[1060] opacity-[0.5] absolute top-0 left-0 bottom-0 right-0'>Loading....</div>}
                {busy ? undefined : <Pages.Calculator />}
            </div>
        </>
    );
};

export default App;
