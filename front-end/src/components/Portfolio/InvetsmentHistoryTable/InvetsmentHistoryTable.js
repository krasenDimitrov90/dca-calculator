import React from 'react';
import './InvetsmentHistoryTable.styles.css';
import { Body } from './Body';
import { Header } from './Header';

export const InvetsmentHistoryTable = ({ investmentHistory, currentFiatCurrency }) => {
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
