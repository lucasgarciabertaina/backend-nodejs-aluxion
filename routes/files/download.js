require('dotenv').config();

module.exports = async (req, res) => {
  const { amazonS3 } = res.locals;
  const { AWS_BUCKET_NAME } = process.env;
  const { Key } = req.params;

  const params = { Bucket: AWS_BUCKET_NAME, Expires: 60 * 5, Key, };

  const signedUrl = await amazonS3.getSignedUrlPromise('getObject', params);

  res.send({ message: 'Download link', url: signedUrl })
}