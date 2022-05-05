const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = async (req, res) => {
  const { API, API_ACCESS_KEY } = process.env;
  const { query } = req.query;
  const { amazonS3, amazonParams } = res.locals;

  const request = await fetch(`${API}?query=${query}&client_id=${API_ACCESS_KEY}`);
  const json = await request.json();
  const image = json.results[0].urls.full;

  const imageData = await fetch(image);
  const fileExtension = imageData.headers.get('content-type').split('/')[1];

  const arrayBuffer = await imageData.arrayBuffer()
  const buffer = Buffer.from(new Uint8Array(arrayBuffer))

  const uploadParams = { ...amazonParams, Key: `${uuidv4()}.${fileExtension}`, Body: buffer };

  const upload = await amazonS3.upload(uploadParams).promise();

  res.send({ message: 'The image has been uploaded.', key: upload.key })
}