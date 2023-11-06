const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  userId: {type: String, unique: true},
  username: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  photo: {type: String},
  status: { type: String, default: "active" },
});

const Auth = mongoose.model("User", authSchema);

module.exports = Auth;
