import React from 'react';
import * as Pages from './pages/index';

import { useSelector, useDispatch } from 'react-redux';
import { bitcoinActions } from './store/bitcoin';

import { getBTCPriceInUSDFromBinance, getBTCPriceInEURFromBinance } from './services/index';

const App = () => {

    const [init, setInit] = React.useState(true);

    const dispatch = useDispatch();

    const appIsLoading = useSelector(state => state.appLoading.appIsLoading);

    React.useEffect(() => {
        const prepareBTCPrice = async () => {
            try {
                let btcPrice = {};
                const btcInUsd = await getBTCPriceInUSDFromBinance();
                const btcInEur = await getBTCPriceInEURFromBinance();
                const btcInBgn = Number(btcInEur) * 1.96;
    
                btcPrice = {
                    usd: Number(btcInUsd),
                    eur: Number(btcInEur),
                    bgn: Number(btcInBgn),
                }
                dispatch(bitcoinActions.setBitcoinPrices(btcPrice));
                setInit(false);
    
            } catch (err) {
                console.log('There is problem with binance');
                const btcPrice = {
                    usd: 50000,
                    eur: 46152,
                    bgn: 90405,
                };
                dispatch(bitcoinActions.setBitcoinPrices(btcPrice));
                setInit(false);
            }
    
        };
        prepareBTCPrice();
    }, []);

    return (
        <>
            {
                // Init state is for preventing incorrect calculations from the bitcoin redux slice
                // if for some reason the calculations start before the response for the current price of BTC
                !init &&
                <div className='flex flex-1 relative'>
                    {appIsLoading && <div className='bg-black text-white text-app-3xl flex justify-center items-center z-[1060] opacity-[0.5] absolute top-0 left-0 bottom-0 right-0'>Loading....</div>}
                    <Pages.Calculator />
                </div>

            }
        </>
    );
};

export default App;
