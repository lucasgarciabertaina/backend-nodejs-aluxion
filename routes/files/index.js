const express = require('express');
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });;

router.post('/upload', upload.single('file'), require('./upload'));

router.get('/download/:Key', require('./download'));

router.put('/manage', require('./manage'));

module.exports = router;