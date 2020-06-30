const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
  userName: String,
  blogName: String,
  email: String,
  password: String,
  country: String,
  birthDate: Date,
  about: String,
  gender: String,
  profileImage: mongoose.Schema.Types.ObjectId,
  posts: [],
  createdAt: Date,
});

const user = mongoose.model("User", User);

module.exports = user;
