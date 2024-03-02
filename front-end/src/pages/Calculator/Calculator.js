import React from 'react';
import './Calculator.styles.css';
import { InvestmentsHistoryTable, Navigation, SettingsNavigation, Statistics } from '../../components/index';

import { useSelector } from 'react-redux';

import { subtractYears, sumYears } from '../../utils';
import { BitcoinService } from '../../services/BitcoinService';

export const Calculator = React.memo(() => {

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

    const handleOnChange = React.useCallback((newData) => {
        setInvestmentData(newData);
        fetchBtcHistory(newData)
    }, []);


    const fetchBtcHistory = async (data) => {
        let {
            repeatPurchase,
            startDate: start,
            endDate: end,
        } = data;

        try {
            const btcHistory = await BitcoinService.getHistory(start, end, repeatPurchase);
            setHistoryData(btcHistory);

        } catch (err) {
            console.log({ err });
        }
    };

    React.useEffect(() => {        
        fetchBtcHistory(investmentData);
    }, []);


    return (
        <div className='container'>
            <Navigation currentFiatCurrency={currentFiatCurrency} currentBTCPrice={currentBTCPrice} />

            <div className='flex flex-col'>
                <Statistics 
                    btcHistory={historyData}
                    purchaseAmount={investmentData.purchaseAmount}
                />
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
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
