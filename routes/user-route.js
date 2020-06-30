const router = require("express").Router();
const auth = require("../middlewares/auth");
const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
// user sign up
router.post("/register", async (req, res) => {
  userName = req.body.userName;
  blogName = req.body.blogName;
  email = req.body.email;
  password = req.body.password;
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
  return res.status(200).send(newUser);
});
//user login
router.post("/login", async (req, res) => {});
//user profile

module.exports = router;
