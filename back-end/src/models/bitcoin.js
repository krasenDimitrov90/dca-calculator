const {Schema, model} = require('mongoose');

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

module.exports = Bitcoin