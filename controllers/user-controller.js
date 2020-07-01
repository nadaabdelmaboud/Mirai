const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const User = {
  createUser: async function (userName, blogName, password, email) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    newUser = new UserModel({
      userName: userName,
      blogName: blogName,
      email: email,
      password: password,
      posts: [],
      createdAt: Date.now(),
    });
    await newUser.save();
    return newUser;
  },
  checkLogin: async function (password, email) {
    let user = await UserModel.findOne({ email: email });
    console.log(user);
    if (!user) return false;
    checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) return false;
    return user;
  },
  uploadProfileImage: async function (userId, imageId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    user.progileImage = imageId;
    await user.save();
    return true;
  },
  uploadCoverImage: async function (userId, imageId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    user.coverImage = imageId;
    await user.save();
    return true;
  },
};
module.exports = User;
