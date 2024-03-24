import React, { useCallback, useState } from 'react';

import { createInvestmentHistory } from '../../utils/create-investment-history';
import { useSelector } from 'react-redux';
import { InvetsmentHistoryTable } from './InvetsmentHistoryTable/InvetsmentHistoryTable';
import { InvestmentHistoryChart } from './InvestmentHistoryChart/InvestmentHistoryChart';
import { Navigation } from './Navigation/Navigation';


export const Portfolio = ({ historyData, purchaseAmount }) => {
  const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);
  const investmentHistory = createInvestmentHistory(historyData, purchaseAmount, currentFiatCurrency.toLowerCase());

  const [chartIsShown, setChartIsShown] = useState(true);

  const handleShowChart = useCallback(() => setChartIsShown(true), []);
  const handleHideChart = useCallback(() => setChartIsShown(false), []);

  return (
    <>
      <Navigation
        chartIsShown={chartIsShown}
        onShow={handleShowChart}
        onHide={handleHideChart}
      />
      {chartIsShown
        ? <InvestmentHistoryChart investmentHistory={investmentHistory} />
        : <InvetsmentHistoryTable
          investmentHistory={investmentHistory}
          currentFiatCurrency={currentFiatCurrency}
        />
      }
    </>
  );
};
