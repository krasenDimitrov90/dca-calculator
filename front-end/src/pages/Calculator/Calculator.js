import React from 'react';
import './Calculator.styles.css';
import { Portfolio, Loader, Navigation, SettingsNavigation, Statistics } from '../../components/index';

import { useSelector } from 'react-redux';

import { subtractYears, sumYears } from '../../utils';
import { BitcoinService } from '../../services/BitcoinService';

export const Calculator = () => {

  const currentBTCPrice = useSelector(state => state.bitcoin.prices);
  const appIsLoading = useSelector(state => state.appLoading.appIsLoading);

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
    fetchBtcHistory(newData);
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
      setInvestmentData(data);

    } catch (err) {
      console.log({ err });
    }
  };

  React.useEffect(() => {
    fetchBtcHistory(investmentData);
  }, []);


  return (
    <>
      {appIsLoading ? <Loader variant={Loader.variants.LOADER_BARS} /> : undefined}
      <div className='container'>
        <Navigation currentBTCPrice={currentBTCPrice} />

        <div className='flex flex-col'>
          <Statistics
            btcHistory={historyData}
            purchaseAmount={investmentData.purchaseAmount}
          />
          <div className='flex flex-col-reverse desktop:flex-row my-app-sm'>
            <div className='portfolio-left-section-wrapper custom-gradient-secondary'>
              <Portfolio
                purchaseAmount={investmentData.purchaseAmount}
                historyData={historyData}
              />
            </div>
            <div className='portfolio-right-section-wrapper'>
              <SettingsNavigation
                investmentData={investmentData}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
