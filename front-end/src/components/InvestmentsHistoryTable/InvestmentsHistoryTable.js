import React, { useEffect, useRef, useState } from 'react';
import './InvestmentsHistoryTable.styles.css';

import { createInvestmentHistory } from '../../utils/create-investment-history';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Body } from './Body';


export const InvestmentsHistoryTable = ({ historyData, purchaseAmount }) => {
  const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);
  const investmentHistory = createInvestmentHistory(historyData, purchaseAmount, currentFiatCurrency.toLowerCase());


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
