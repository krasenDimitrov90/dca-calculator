const Bitcoin = require('../../models/bitcoin');
const BTC_DATA = require('../../BTC')
const { parseInputDataItem } = require('../../utils/parser');
const { convertDateInZeroHours } = require('../../utils/dateConvertors');

module.exports.getHistory = (req, res, next) => {

    const { start: startDate, end: endDate } = req.query;

    const formatedStartDate = convertDateInZeroHours(startDate);
    const formatedEndDate = convertDateInZeroHours(endDate);


    Bitcoin.find({
        date: {
            $gte: formatedStartDate,
            $lt: formatedEndDate
        },
        $expr: {
            $eq: [{ $dayOfMonth: "$date" }, 1]
        }
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        });
};


module.exports.addHistory = async (req, res, next) => {

    const createData = BTC_DATA.map(parseInputDataItem);


    const promise = createData.reduce(
        async (promise, store, index) => {
            return promise.then(async last => {
                console.log('Uploading data', index, store.date)
                return await Bitcoin.updateOne({ date: store.date }, { ...store }, { upsert: true, new: true })
            })
        }, Promise.resolve())

};

module.exports.updateHistory = (req, res, next) => {
    const createData = BTC_DATA.map(parseInputDataItem);

    const promise = createData.slice(-6).reduce(
        async (promise, store, index) => {
            return promise.then(async last => {
                console.log('Uploading data', index, store.date)
                return await Bitcoin.updateOne({ date: store.date }, { ...store }, { upsert: true, new: true })
            })
        }, Promise.resolve())

    res.json(createData.slice(-6))

};