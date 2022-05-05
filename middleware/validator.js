const connectToDatabase = require("../database/connection");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (req, res, next) => {

  await connectToDatabase();

  const token = req.headers["token"];

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    res.locals.user = user;
    next()
  } catch {
    res.send('Invalid token.').status(403)
  }
}
