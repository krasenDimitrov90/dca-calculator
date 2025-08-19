const cron = require('node-cron');
const Bitcoin = require('./models/bitcoin');
const fetchBitcoinPrice = require('./utils/fetch-btc-price');
const { parseInputDataItemAndDateFormat } = require('./utils/parser');

// const btcSchedule = cron.schedule('33 21 * * *', async () => {
// // const btcSchedule = cron.schedule('*/30 * * * * *', async () => {
//   console.log('running a task every day at 21:30');
//   let btcPrices = [];
//   try {
//     const lastDocument = await Bitcoin.findOne({}, {}, { sort: { date: -1 } });
//     const lastStoredPriceDate = lastDocument ? lastDocument.date : null;
//     // const lastStoredPriceDate = new Date('2025/06/01');
//     const endDate = new Date();
//     console.log({ lastStoredPriceDate, endDate });

//     btcPrices = await fetchBitcoinPrice(new Date(lastStoredPriceDate), new Date());

//     const formatedBtcPrices = btcPrices.map(parseInputDataItemAndDateFormat);
//     formatedBtcPrices.map(({ date, prices }) => {
//       console.log({ date, prices });
//     })

//     const promise = formatedBtcPrices.reduce(
//       async (promise, store, index) => {
//         return promise.then(async last => {
//           console.log('Uploading data', index, store.date)
//           return await Bitcoin.updateOne({ date: store.date }, { ...store }, { upsert: true, new: true })
//         })
//       }, Promise.resolve())

//   } catch (error) {
//     console.log({ error });
//   }
// });
