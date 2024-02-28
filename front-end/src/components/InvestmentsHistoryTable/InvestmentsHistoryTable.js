import React from 'react';
import './InvestmentsHistoryTable.styles.css';

import { createInvestmentHistory } from '../../utils/create-investment-history';

const Row = ({
    date,
    btcPrice,
    btcPurchased,
    totalCost,
    balance,
}) => {

    const btcPriceString = Number(btcPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const btcPurchasedString = btcPurchased.toFixed(6);
    const balanceString = Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <tr>
            <td data-label="Date">{date}</td>
            <td data-label="Btc price">${btcPriceString}</td>
            <td data-label="Btc purchased">{btcPurchasedString}</td>
            <td data-label="Total Cost">${totalCost}</td>
            <td data-label="Balance">${balanceString}</td>
        </tr>
    );
};

export const InvestmentsHistoryTable = React.memo(({ historyData, purchaseAmount, currentFiatCurrency }) => {
    console.log({ currentFiatCurrency })
    const investmentHistory = createInvestmentHistory(historyData, purchaseAmount, currentFiatCurrency.toLowerCase());

    return (
        <div className='portfolio-table-container'>
            <table className='portfolio-table'>
                <thead className='custom-gradient-secondary'>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Btc price</th>
                        <th scope="col">Btc purchased</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        investmentHistory.map(investment => {
                            return (
                                <Row
                                    key={`investmentHistory-${investment.date}`}
                                    date={investment.date}
                                    btcPrice={investment.btcPrice}
                                    btcPurchased={investment.btcPurchased}
                                    totalCost={investment.totalCost}
                                    balance={investment.balance}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
});
