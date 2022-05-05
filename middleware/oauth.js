const { google } = require('googleapis');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

  const googleOauth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  googleOauth.setCredentials({ refresh_token: REFRESH_TOKEN });

  const accessToken = await googleOauth.getAccessToken();

  console.log(accessToken);
  res.locals.accessToken = accessToken;

  next();
}
