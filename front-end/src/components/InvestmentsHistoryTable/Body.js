import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Row } from './Row';

export const Body = ({ investmentHistory, currentFiatCurrency }) => {

  return (
    <tbody>
      {
        investmentHistory.map((investment) => {
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
  );
};