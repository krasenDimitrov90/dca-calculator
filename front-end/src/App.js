import React from 'react';
import * as Pages from './pages/index';

import { useSelector, useDispatch } from 'react-redux';
import { bitcoinActions } from './store/bitcoin';

import { api } from './hooks/api';

const App = () => {

    const [init, setInit] = React.useState(true);

    const dispatch = useDispatch();

    const appIsLoading = useSelector(state => state.appLoading.appIsLoading);

    const prepareBTCPrice = async () => {
        try {
            let btcPrice = {};
            const btcInUsd = await api.getBTCPriceInUSDFromCoinGeco();
            const btcInEur = await api.getBTCPriceInEURFromCoinGeco();
            const btcInBgn = btcInEur * 1.96;

            btcPrice = {
                usd: btcInUsd,
                eur: btcInEur,
                bgn: btcInBgn,
            }
            return btcPrice;

        } catch (err) {
            throw new Error('There is problem with coingecko');
        }

    };

    React.useEffect(() => {
        prepareBTCPrice()
            .then(data => {
                dispatch(bitcoinActions.setBitcoinPrices(data));
                setInit(false);
            })
            .catch(err => {
                console.log({ err });
                const btcPrice = {
                    usd: 50000,
                    eur: 46207,
                    bgn: 90422,
                };
                dispatch(bitcoinActions.setBitcoinPrices(btcPrice));
                setInit(false);
            })
    }, []);

    return (
        <>
            {
                !init && 
                    <div className='flex flex-1 relative'>
                        {/* {appIsLoading && <div className='bg-white fix top-0 left-0'>Loading....</div>} */}
                        {appIsLoading && <div className='bg-black text-white text-app-3xl flex justify-center items-center z-[1060] opacity-[0.5] absolute top-0 left-0 bottom-0 right-0'>Loading....</div>}
                        <Pages.Calculator />
                    </div>
                
            }
        </>
    );
};

export default App;
