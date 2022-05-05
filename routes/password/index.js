const express = require('express');
const router = express.Router();
const validator = require('../../middleware/validator');
const oauth = require('../../middleware/oauth');

router.get('/forget', validator, oauth, require('./forget'));

router.get('/set', require('./set'));

module.exports = router;