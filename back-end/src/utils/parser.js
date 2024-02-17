const parseInputDataItem = (record) => {
    const { date, prices: dataPrices } = record
    const prices = dataPrices.reduce((acc, item) => {
        const [currency, value] = Object.entries(item)[0];
        acc[currency] = Number(value);
        return acc;
    }, {})
   

    return  {date, prices}
}

module.exports = {
    parseInputDataItem
}