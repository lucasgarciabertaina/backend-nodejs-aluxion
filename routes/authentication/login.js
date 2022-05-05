const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const connectToDatabase = require('../../database/connection');
const User = require('../../models/user');
require('dotenv').config();

module.exports = async (req, res) => {
  await connectToDatabase();

  const { email, password } = req.body;
  const { JWT_SECRET } = process.env;

  const user = await User.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.hash, function (err, result) {
      if (result === true) {
        const authToken = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.send({ message: 'Welcome to Aluxion API.', token: authToken });
      } else {
        res.send('[error] Wrong password.').status(404);
      }
    });
  } else {
    res.send('[error] Incorrect data.').status(404);
  }
}
