const { Schema, model } = require('mongoose');

const bitcoinHistorySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    prices: {
        usd: { type: Number, required: true },
        eur: { type: Number, required: true },
        bgn: { type: Number, required: true },
    }
});


const Bitcoin = model('Bitcoin', bitcoinHistorySchema);

Bitcoin.getFirstDayOfMonths = function (start, end) {
    return this.find({
        date: {
            $gte: start,
            $lt: end
        },
        $expr: {
            $eq: [{ $dayOfMonth: "$date" }, 1]
        }
    });
};

Bitcoin.getMondaysOfMonths = function (start, end) {
    return this.find({
        date: {
            $gte: start,
            $lt: end
        },
        $expr: {
            // The number is 2 becouse mongodb first day is Sunday
            $eq: [{ $dayOfWeek: "$date" }, 2]
        }
    });
};

Bitcoin.getAllDays = function (start, end) {
    return this.find({
        date: {
            $gte: start,
            $lt: end
        }
    });
};

module.exports = Bitcoin