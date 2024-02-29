import React from 'react';
import './Calculator.styles.css';
import { InvestmentsHistoryTable, Navigation, SettingsNavigation, Statistics } from '../../components/index';
import { AssetPriceValue } from '../../UI';

import { useSelector, useDispatch } from 'react-redux';
import { portfolioActions } from '../../store/portfolio';
import { appLoadingActions } from '../../store/loading';

import { subtractYears, sumYears, calculatePortfolio } from '../../utils';

import { getBTCHistory } from '../../services/bitcoinHttps';

export const Calculator = React.memo(() => {

    const dispatch = useDispatch();
    const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);
    const currentBTCPrice = useSelector(state => state.bitcoin.prices);

    const start = subtractYears(new Date(), 1);
    const end = sumYears(start, 1);

    const [historyData, setHistoryData] = React.useState([]);
    const [investmentData, setInvestmentData] = React.useState({
        repeatPurchase: 'Monthly',
        purchaseAmount: 50,
        startDate: start,
        endDate: end,
    });

    const handleInvestmentData = React.useCallback((newData) => {
        setInvestmentData(newData);
    }, []);


    React.useEffect(() => {

        let {
            repeatPurchase,
            purchaseAmount,
            startDate: start,
            endDate: end,
        } = investmentData;

        const fetchBtcHistory = async () => {
            dispatch(appLoadingActions.setAppIsLoading(true));
            try {
                const btcHistory = await getBTCHistory(start, end, repeatPurchase);
                console.log({ btcHistory })

                const portfolio = calculatePortfolio(btcHistory, purchaseAmount, currentFiatCurrency, currentBTCPrice);
                dispatch(portfolioActions.refreshPortfolio(portfolio));
                // dispatch(appLoadingActions.setAppIsLoading(false));
                setHistoryData(btcHistory);

            } catch (err) {
                console.log({ err });
            }
            dispatch(appLoadingActions.setAppIsLoading(false));
        };
        fetchBtcHistory();

    }, [investmentData]);


    return (
        <div className='container'>
            <Navigation />

            <AssetPriceValue
                fiatCurrency={currentFiatCurrency}
                assetPrice={currentBTCPrice[currentFiatCurrency.toLowerCase()]}
            />

            <div className='flex flex-col'>
                <Statistics />
                <div className='flex flex-col-reverse desktop:flex-row my-app-sm'>
                    <div className='portfolio-left-section-wrapper custom-gradient-secondary'>
                        <InvestmentsHistoryTable
                            purchaseAmount={investmentData.purchaseAmount}
                            historyData={historyData}
                            currentFiatCurrency={currentFiatCurrency}
                        />
                    </div>
                    <div className='portfolio-right-section-wrapper'>
                        <SettingsNavigation
                            currentFiatCurrency={currentFiatCurrency}
                            investmentData={investmentData}
                            handleInvestmentData={handleInvestmentData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
