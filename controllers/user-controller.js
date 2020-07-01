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
};
module.exports = User;
