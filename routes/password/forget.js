const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const UserSchema = require("../../models/user");
const connectToDatabase = require("../../database/connection");

module.exports = async (req, res) => {
  const { user, accessToken } = res.locals;
  const { JWT_SECRET, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  const { alreadyUpdated } = jwt.verify(user.token, process.env.JWT_SECRET);

  if (!alreadyUpdated) {
    await connectToDatabase();

    const newToken = jwt.sign({ alreadyUpdated: true }, JWT_SECRET);

    await UserSchema.findOneAndUpdate({ _id: user._id }, { token: newToken });

    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'lucasgarciabertaina@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      });

      const mailOptions = {
        from: 'lucasgarciabertaina@gmail.com',
        to: user.email,
        subject: "Change your password",
        text: `http://localhost:8080/password/set?token=${user.token}`,
      }
      const result = await transporter.sendMail(mailOptions)
      res.send(`Confirmation email sent to ${result.accepted[0]}`);
    } catch (error) {
      res.send(`[error] ${error}`).status(404);
    }
  } else {
    res.send('[error] You have recently updated your password, so you cannot change your password. ')
  }
}
