const router = require("express").Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const User = require("../controllers/user-controller");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
// user sign up
router.post("/register", async (req, res) => {
  userName = req.body.userName;
  blogName = req.body.blogName;
  email = req.body.email;
  password = req.body.password;
  let newUser = await User.createUser(userName, blogName, password, email);
  if (newUser) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
//user login
router.post("/login", async (req, res) => {
  email = req.body.email;
  password = req.body.password;
  let user = await User.checkLogin(password, email);
  if (!user) {
    return res.status(400).send({ success: false });
  }
  let token = await jwt.sign({ id: user._id }, process.env.jwtsecret, {
    expiresIn: "12312432424234",
  });
  return res.status(200).send({ success: true, token: token, user: user });
});

//user profile

module.exports = router;
