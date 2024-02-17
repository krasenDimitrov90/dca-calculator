const fs = require('fs');

let history = [];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

   
    let bitcoinHistory = JSON.parse(data);
    history = bitcoinHistory.map(({ date, prices }, index) => {

        let newPrices = prices.reduce((acc, item) => {
            const [currency, value] = Object.entries(item)[0];
            acc[currency] = Number(value);
            return acc;
        }, {})
       

        let obj = {
            date, prices: { ...newPrices }
        };
        if (index === 1) {
            console.log({obj})
        }
        return obj;
    })

    console.log({ prices: history[0].prices }, { history })
});
