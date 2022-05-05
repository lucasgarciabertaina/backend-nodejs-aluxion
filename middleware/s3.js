const aws = require('aws-sdk');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = process.env;

  const s3 = new aws.S3({
    region: AWS_BUCKET_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    signatureVersion: 'v4'
  })

  res.locals.amazonS3 = s3;

  const amazonParams = {
    Bucket: AWS_BUCKET_NAME,
  }

  res.locals.amazonParams = amazonParams;

  next();
}
