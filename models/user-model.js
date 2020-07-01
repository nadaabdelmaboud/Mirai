const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
  userName: String,
  blogName: String,
  email: String,
  password: String,
  country: String,
  birthDate: Date,
  coverImage: mongoose.Schema.Types.ObjectId,
  about: String,
  gender: String,
  profileImage: mongoose.Schema.Types.ObjectId,
  posts: [
    {
      isImage: Boolean,
      imageId: mongoose.Schema.Types.ObjectId,
      postText: String,
      postDate: Date,
      comments: [
        {
          commentText: String,
          commentDate: Date,
        },
      ],
    },
  ],
  createdAt: Date,
});

const user = mongoose.model("User", User);

module.exports = user;
