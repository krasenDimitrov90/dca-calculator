import React from 'react';
import { LineChart } from '../../Chart/LineChart';
import { LineChartSmallScreen } from '../../Chart/LineChartSmallScreen';

export const InvestmentHistoryChart = ({ investmentHistory }) => {
  return (
    <>
      <div className='laptop:block hidden'>
        <LineChart
          data={investmentHistory}
        />
      </div>
      <div className='laptop:hidden block'>
        <LineChartSmallScreen
          data={investmentHistory}
        />
      </div>
    </>
  );
};
