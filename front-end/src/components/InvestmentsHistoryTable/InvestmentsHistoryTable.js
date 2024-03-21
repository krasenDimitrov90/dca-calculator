import React, { useEffect, useRef, useState } from 'react';
import './InvestmentsHistoryTable.styles.css';

import { createInvestmentHistory } from '../../utils/create-investment-history';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Body } from './Body';
import { LineChart } from '../Chart/LineChart';


export const InvestmentsHistoryTable = ({ historyData, purchaseAmount }) => {
  const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);
  const investmentHistory = createInvestmentHistory(historyData, purchaseAmount, currentFiatCurrency.toLowerCase());

  console.log({ investmentHistory });

  return (
    <div>
      <h3 className='text-app-text-primary'>Portfolio value</h3>
      <LineChart
        data={investmentHistory}
      />
    </div>
  );

  return (
    <div className='portfolio-table-container'>
      <table className='portfolio-table'>
        <Header />
        {
          investmentHistory.length > 0 &&
          <Body
            investmentHistory={investmentHistory}
            currentFiatCurrency={currentFiatCurrency}
          />
        }
      </table>
    </div>
  );
};
