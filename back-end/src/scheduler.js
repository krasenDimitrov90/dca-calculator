const cron = require('node-cron');
const Bitcoin = require('./models/bitcoin');
const fetchBitcoinPrice = require('./utils/fetch-btc-price');
const { parseInputDataItemAndDateFormat } = require('./utils/parser');

const btcSchedule = cron.schedule('0 0 0 * * *', async () => {
    console.log('running a task every minute');
    let btcPrices = [];
    try {
        btcPrices = await fetchBitcoinPrice();
        console.log({ btcPrices });

        const formatedBtcPrices = btcPrices.map(parseInputDataItemAndDateFormat);
        formatedBtcPrices.map(({ date, prices }) => {
            console.log({ date, prices });
        })

        const promise = formatedBtcPrices.reduce(
            async (promise, store, index) => {
                return promise.then(async last => {
                    console.log('Uploading data', index, store.date)
                    return await Bitcoin.updateOne({ date: store.date }, { ...store }, { upsert: true, new: true })
                })
            }, Promise.resolve())

    } catch (error) {
        console.log({ error });
    }
});

// module.exports = btcSchedule.start;

// module.exports = {
//     startBtcSchedule: () => btcSchedule.start(),
// };