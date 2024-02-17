const router = require('express').Router();

const bitcoinController = require('../../controllers/bitcoin/bitcoin-history');

router.get('/bitcoin-history', bitcoinController.getHistory);
router.post('/bitcoin-history', bitcoinController.addHistory);
router.patch('/bitcoin-history', bitcoinController.updateHistory);

module.exports = router;