const parseInputDataItem = (record) => {
    const { date, prices: dataPrices } = record
    console.log({ record, date, dataPrices });
    const prices = dataPrices.reduce((acc, item) => {
        const [currency, value] = Object.entries(item)[0];
        acc[currency] = Number(value);
        return acc;
    }, {})


    return { date, prices }
}

const parseInputDataItemAndDateFormat = (record) => {
    const { date: dateString, prices: dataPrices } = record
    const prices = dataPrices.reduce((acc, item) => {
        let [currency, value] = Object.entries(item)[0];
        if (currency === 'euro') currency = 'eur';
        acc[currency] = Number(value);
        return acc;
    }, {})

    let dateComponents = dateString.split('/');

    // Format in 'Tue Feb 13 2024 12:00:00 GMT+0200 (Eastern European Standard Time)' format
    let newDate = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0], 2, 0, 0);
    // Format the date in "YYYY-MM-DDTHH:mm:ss.SSSZ" format
    let dateAsISOStr = newDate.toISOString();

    return {
        date: dateAsISOStr,
        prices
    }
}

module.exports = {
    parseInputDataItem,
    parseInputDataItemAndDateFormat
}