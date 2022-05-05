const express = require('express');
const router = express.Router();
const s3 = require('../../middleware/s3');

router.get('/search', require('./search'));

router.post('/upload', s3, require('./upload'));

module.exports = router;