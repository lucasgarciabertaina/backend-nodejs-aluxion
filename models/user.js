const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String },
    username: { type: String },
    hash: { type: String },
    salt: { type: String },
    token: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
