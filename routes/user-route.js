const router = require("express").Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const User = require("../controllers/user-controller");
const jwt = require("jsonwebtoken");
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
  let token = await jwt.sign({ _id: user._id }, process.env.jwtsecret, {
    expiresIn: "12312432424234",
  });
  return res.status(200).send({ success: true, token: token, user: user });
});
router.post("/me/profileImage", auth, async (req, res) => {
  let imageId = req.query.imageId;
  let userId = req.user._id;
  if (!userId || !imageId) {
    return res.status(400).send({ success: false });
  }
  let profileImage = await User.uploadProfileImage(userId, imageId);
  if (profileImage) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
router.post("/me/coverImage", auth, async (req, res) => {
  let imageId = req.query.imageId;
  let userId = req.user._id;
  if (!userId || !imageId) {
    return res.status(400).send({ success: false });
  }
  let coverImage = await User.uploadCoverImage(userId, imageId);
  if (coverImage) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
router.get("/me/profileImage", auth, async (req, res) => {
  let imageId = req.query.imageId;
  let userId = req.user._id;
  if (!userId || !imageId) {
    return res.status(400).send({ success: false });
  }
  let coverImage = await User.uploadCoverImage(userId, imageId);
  if (coverImage) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
router.get("/me/coverImage", auth, async (req, res) => {
  let imageId = req.query.imageId;
  let userId = req.user._id;
  if (!userId || !imageId) {
    return res.status(400).send({ success: false });
  }
  let coverImage = await User.uploadCoverImage(userId, imageId);
  if (coverImage) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
//get user blog
router.get("/:blogName", async (req, res) => {
  let blogName = req.params.blogName;
  let blog = await User.getBlog(blogName);
  if (blog) return res.status(200).send({ success: true, blog: blog });
  else return res.status(400).send({ success: false });
});

//get current user blogname
router.get("/user/blogname", auth, async (req, res) => {
  console.log(req.headers);
  let userId = req.user._id;
  let blogname = await User.getBlogName(userId);
  if (blogname)
    return res.status(200).send({ success: true, blogname: blogname });
  else return res.status(400).send({ success: false });
});
module.exports = router;
