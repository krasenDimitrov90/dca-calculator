import React from 'react';
import './InvestmentsHistoryTable.styles.css';

import { createInvestmentHistory } from '../../utils/create-investment-history';
import { formatNumberWithSuffixAndCommas } from '../../utils/format-numbers';

const Row = ({
    date,
    btcPrice,
    btcPurchased,
    totalCost,
    balance,
    currentFiatCurrency
}) => {

    const leftSymbols = { USD: '$', EUR: '€'};
    const rightSymbols = { BGN: 'BGN' };
    const leftSymbol = leftSymbols[currentFiatCurrency] || '';
    const rightSymbol = rightSymbols[currentFiatCurrency] || '';

    // const btcPriceString = Number(btcPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // const btcPurchasedString = btcPurchased.toFixed(6);
    // const balanceString = Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    const formatedBtcPrice = formatNumberWithSuffixAndCommas(btcPrice);
    const formatedBtcPurchased = formatNumberWithSuffixAndCommas(btcPurchased);
    const formatedBalance = formatNumberWithSuffixAndCommas(balance);
    const formatedTotalCost = formatNumberWithSuffixAndCommas(totalCost);


    return (
        <tr>
            <td data-label="Date">{date}</td>
            <td data-label="Btc price">{leftSymbol}{formatedBtcPrice} <span className='currency-right-symbol'>{rightSymbol}</span></td>
            <td data-label="Btc purchased">{formatedBtcPurchased}</td>
            <td data-label="Total Cost">{leftSymbol}{formatedTotalCost} <span className='currency-right-symbol'>{rightSymbol}</span></td>
            <td data-label="Balance">{leftSymbol}{formatedBalance} <span className='currency-right-symbol'>{rightSymbol}</span></td>
        </tr>
    );
};

export const InvestmentsHistoryTable = React.memo(({ historyData, purchaseAmount, currentFiatCurrency }) => {
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
                                    currentFiatCurrency={currentFiatCurrency}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
});
