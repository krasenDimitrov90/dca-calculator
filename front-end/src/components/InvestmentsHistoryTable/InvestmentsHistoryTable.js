import React, { useEffect, useRef, useState } from 'react';
import './InvestmentsHistoryTable.styles.css';

import { createInvestmentHistory } from '../../utils/create-investment-history';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Row } from './Row';


export const InvestmentsHistoryTable = ({ historyData, purchaseAmount }) => {
  const currentFiatCurrency = useSelector(state => state.fiatCurrency.current);
  const investmentHistory = createInvestmentHistory(historyData, purchaseAmount, currentFiatCurrency.toLowerCase());


  return (
    <div className='portfolio-table-container'>
      <table className='portfolio-table'>
        <Header />
        <tbody>
          {
            investmentHistory.map((investment, index) => {

              return (
                <Row
                  key={`investmentHistory-${investment.date}`}
                  date={investment.date}
                  btcPrice={investment.btcPrice}
                  btcPurchased={investment.btcPurchased}
                  totalCost={investment.totalCost}
                  balance={investment.balance}
                  currentFiatCurrency={currentFiatCurrency}
                />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};
