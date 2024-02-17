import React from 'react';
import * as api from '../../services/index';
import * as utils from '../../utils/index';

export const Home = () => {

    const [selectedYears, setSelectedYears] = React.useState(1);

    const calculateBitcoinPrices = React.useCallback(() => {
        console.log('calculateBitcoinPrices')
    }, []);

    const { startDate, endDate } = utils.getFromToDates();
    const formatedStartDate = utils.formatDateAsIsoString(startDate);
    const formatedEndDate = utils.formatDateAsIsoString(endDate);

    api.getBitcoinPrices(formatedStartDate, formatedEndDate);

    return (
        <div>
            <label htmlFor="yearSelect">Select number of years:</label>
            <select
                id="yearSelect"
                value={selectedYears}
                onChange={(e) => setSelectedYears(parseInt(e.target.value))}
            >
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="13">13 years</option>
                {/* Add more options as needed */}
            </select>

            <button onClick={calculateBitcoinPrices}>Calculate</button>

            {/* {result && (
                <div>
                    <p>Bitcoin Prices for the period {result.start_date} to {result.end_date}:</p>
                    <pre>
                        Date            Bitcoin Price (USD)
                        ---------------------------------
                        {result.firstDayOfMonthPrices.map(({ date, price }) => (
                            <div key={date}>{date}    {price}</div>
                        ))}
                        ---------------------------------
                        Average Price   {result.averagePrice}
                    </pre>
                </div>
            )} */}
        </div>
    );
};
