const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const connectToDatabase = require('../../database/connection');
const User = require('../../models/user');
require('dotenv').config();

module.exports = async (req, res) => {
  await connectToDatabase();

  const { username, email, password } = req.body;
  const { JWT_SECRET } = process.env;

  const user = await User.findOne({ email });

  if (!user) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); //or hash
    const token = jwt.sign({ alreadyUpdated: false }, JWT_SECRET);

    const newUser = await User.create({ email, username, hash, salt, token });
    const authToken = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.send({ message: 'User successfully registered!', token: authToken });
  } else {
    res.send('[error] User already exists, try another email').status(404);
  }
}
