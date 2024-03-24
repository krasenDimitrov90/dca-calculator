import React from 'react';
import { LineChart } from '../../Chart/LineChart';
import { LineChartSmallScreen } from '../../Chart/LineChartSmallScreen';

export const InvestmentHistoryChart = ({ investmentHistory }) => {
  return (
    <>
      <div className='laptop:block hidden'>
        {/* <h3 className='text-app-text-primary'>Portfolio value</h3> */}
        <LineChart
          data={investmentHistory}
        />
      </div>
      <div className='laptop:hidden block'>
        <h3 className='text-app-text-primary'>Portfolio value</h3>
        <LineChartSmallScreen
          data={investmentHistory}
        />
      </div>
    </>
  );
};
