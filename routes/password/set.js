const connectToDatabase = require('../../database/connection');
const User = require('../../models/user');
require('dotenv').config();


module.exports = async (req, res) => {
  await connectToDatabase();

  const { newPassword } = req.body;
  const { token } = req.query;

  const salt = bcrypt.genSaltSync(10);
  const newHash = bcrypt.hashSync(newPassword, salt);

  await User.updateOne({ token }, { hash: newHash, salt });

  res.send('Password has been updated.');
}
