const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const { file } = req;

  const fileExtension = file.originalname.split('.')[1];

  const uploadParams = { ...amazonParams, Key: `${uuidv4()}.${fileExtension}`, Body: file.buffer, };

  const upload = await amazonS3.upload(uploadParams).promise()

  res.send({ message: 'The file has been uploaded.', key: upload.key })
}
