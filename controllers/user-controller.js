const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const config = require("../config/env");
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
      coverImage: config.image,
      profileImage: config.image,
      createdAt: Date.now(),
    });
    await newUser.save();
    return newUser;
  },
  checkBlog: async function (blogName) {
    let user = await UserModel.findOne({ blogName: blogName });
    if (!user) return true;
    return false;
  },
  checkMail: async function (email) {
    let user = await UserModel.findOne({ email: email });
    if (!user) return true;
    return false;
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
    user.profileImage = imageId;
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
  getBlog: async function (blogName) {
    let user = await UserModel.findOne({ blogName: blogName });
    if (!user) return false;
    user = {
      userName: user.userName,
      blogName: user.blogName,
      coverImage: user.coverImage,
      profileImage: user.profileImage,
      posts: user.posts,
    };
    return user;
  },
  getUserBlog: async function (blogName) {
    let user = await UserModel.findOne({ blogName: blogName });
    if (!user) return false;
    return user;
  },
  getMe: async function (userId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    user = {
      userName: user.userName,
      blogName: user.blogName,
      coverImage: user.coverImage,
      profileImage: user.profileImage,
      posts: user.posts,
      email: user.email,
    };
    return user;
  },
  updateUser: async function (userId, user) {
    let usero = await UserModel.findById(userId);
    if (!usero) return false;
    if (user.userName) usero.userName = user.userName;
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      hashed = await bcrypt.hash(user.password, salt);
      usero.password = hashed;
    }
    if (user.coverImage && ObjectId.isValid(user.coverImage))
      usero.coverImage = user.coverImage;
    if (user.profileImage && ObjectId.isValid(user.profileImage))
      usero.profileImage = user.profileImage;
    if (user.email) usero.email = user.email;
    await usero.save();
    return true;
  },
  getMyBlog: async function (userId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    user = {
      userName: user.userName,
      blogName: user.blogName,
      coverImage: user.coverImage,
      profileImage: user.profileImage,
      posts: user.posts,
    };
    return user;
  },
  getBlogName: async function (userId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    let blogname = user.blogName;
    return blogname;
  },
};
module.exports = User;
