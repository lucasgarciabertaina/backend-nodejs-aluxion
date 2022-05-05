const mongoose = require('mongoose');

async function connectToDatabase() {
  return mongoose.connect(process.env.DB, { useNewUrlParser: true })
};

module.exports = connectToDatabase;



