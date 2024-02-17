const router = require('express').Router();

const bitcoinRoutes = require('./bitcoin/bitcoin-history');

router.use(bitcoinRoutes);

module.exports = router;