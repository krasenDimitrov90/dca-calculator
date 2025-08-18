const cron = require('node-cron');
const Bitcoin = require('./models/bitcoin');
const fetchBitcoinPrice = require('./utils/fetch-btc-price');
const { parseInputDataItemAndDateFormat } = require('./utils/parser');

// const btcSchedule = cron.schedule('30 21 * * *', async () => { // at 21:30
const btcSchedule = cron.schedule('*/10 * * * * *', async () => { // every minute
// const btcSchedule = cron.schedule('*/10 * * * * *', async () => { every 10 minutes
  console.log('running a task every day at 21:30');
  let btcPrices = [];
  try {
    btcPrices = await fetchBitcoinPrice();
    // const btcPrices = [{ date: '28/02/2024', prices: [{ usd: '61185.65' }, { euro: '56474.05' }, { bgn: '110431.23' }] }];
    // console.log({ btcPrices });
    // btcPrices.map(({ date, prices }) => {
    //     console.log({ date, prices });
    // })

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
