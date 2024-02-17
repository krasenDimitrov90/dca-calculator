// BitcoinPriceCalculator.js
import React, { useState } from 'react';

const BitcoinPriceCalculator = () => {
    const [selectedYears, setSelectedYears] = useState(1);
    const [result, setResult] = useState(null);

    const getBitcoinPrices = async (start_date, end_date) => {
        const url = `/BITCOIN-2.json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Bitcoin prices:", error);
            return null;
        }
    };

    const subtractYears = (date, years) => {
        const newDate = new Date(date);
        newDate.setFullYear(date.getFullYear() - years);
        return newDate;
    }

    const convertDate = (date, monthsToAdd = 1) => {
        const inputDate = new Date(date.toString());

        // Extract year, month, and day components
        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + monthsToAdd).toString().padStart(2, '0'); // Month is zero-based, so add 1
        const day = inputDate.getDate().toString().padStart(2, '0');

        // Form the desired date string in the format "YYYY-MM-DD"
        const outputDateString = `${year}-${month}-${day}`;

        return outputDateString;
    };


    const calculateBitcoinPrices = async () => {


        const currDate = new Date()
        const beforeDate = subtractYears(currDate, selectedYears);
        const [startDate, startMonth, startYear] = convertDate(beforeDate).split('/');
        const [endDate, endMoth, endYear] = convertDate(currDate).split('/');


        const bitcoinPrices = await getBitcoinPrices(startDate, endDate);

        const fromDate = new Date(startDate);
        const toDate = new Date(endDate);

        let firstDayOfMonthPrices = bitcoinPrices
            .filter(item => {
                let date = new Date(item.date);
                return date >= fromDate && date <= toDate;
            })
            .filter(item => new Date(item.date).getUTCDate() === 1)
            .reduce((acc, item) => {
                let newData = {
                    date: item.date,
                    price: Number(item.prices.find(price => price.hasOwnProperty('usd')).usd)
                };
                acc.push(newData);
                return acc;
            }, [])


        console.log({ firstDayOfMonthPrices })

        // Calculate average price
        const pricesArray = firstDayOfMonthPrices.map(({ date, price }) => price);
        const totalPrices = pricesArray.reduce((sum, price) => sum + price, 0);
        const averagePrice = totalPrices / pricesArray.length;
        console.log({ pricesArray, totalPrices, averagePrice })

        // Display the results
        setResult({
            startDate,
            endDate,
            firstDayOfMonthPrices,
            averagePrice: averagePrice.toFixed(2),
        });


    };


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

            {result && (
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
            )}
        </div>
    );
};

export default BitcoinPriceCalculator;
