import { forwardRef } from "react";
import { formatNumberWithSuffixAndCommas } from "../../../utils/format-numbers";
import { formatDateAsLocalString } from "../../../utils";

export const Row = forwardRef((props, ref) => {
  const {
    date,
    btcPrice,
    btcPurchased,
    totalCost,
    balance,
    currentFiatCurrency,
  } = props;

  const leftSymbols = { USD: '$', EUR: '€' };
  const rightSymbols = { BGN: 'BGN' };
  const leftSymbol = leftSymbols[currentFiatCurrency] || '';
  const rightSymbol = rightSymbols[currentFiatCurrency] || '';

  const formatedDate = formatDateAsLocalString(date);
  const formatedBtcPrice = formatNumberWithSuffixAndCommas(btcPrice);
  const formatedBtcPurchased = btcPurchased < 1 ? Number(btcPurchased).toFixed(6) : Number(btcPurchased).toFixed(2);
  const formatedBalance = formatNumberWithSuffixAndCommas(balance);
  const formatedTotalCost = formatNumberWithSuffixAndCommas(totalCost);


  return (
    <tr ref={ref}>
      <td data-label="Date">{formatedDate}</td>
      <td data-label="Btc price">{leftSymbol}{formatedBtcPrice} <span className='currency-right-symbol'>{rightSymbol}</span></td>
      <td data-label="Btc purchased">{formatedBtcPurchased}</td>
      <td data-label="Total Cost">{leftSymbol}{formatedTotalCost} <span className='currency-right-symbol'>{rightSymbol}</span></td>
      <td data-label="Balance">{leftSymbol}{formatedBalance} <span className='currency-right-symbol'>{rightSymbol}</span></td>
    </tr>
  );
});