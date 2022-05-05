const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");

const oauth = require('./middleware/oauth');
const s3 = require('./middleware/s3');

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use('/password', require('./routes/password/index'));

app.use('/authentication', oauth, require('./routes/authentication/index'));

app.use('/files', s3, require('./routes/files/index'));

app.use('/images', require('./routes/images/index'));

module.exports = app;