const router = require("express").Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const User = require("../controllers/user-controller");
const jwt = require("jsonwebtoken");
const Post = require("../controllers/post-controller");
// user add post
router.post("/me/post", auth, async (req, res) => {
  isImage = req.body.isImage;
  imageId = req.body.imageId;
  postText = req.body.postText;
  userId = req.user._id;
  let createdPost = await Post.createPost(userId, isImage, imageId, postText);
  if (createdPost) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
// user delete post
router.delete("/me/post", auth, async (req, res) => {});
// user get user posts
router.get("/me/posts", auth, async (req, res) => {
  userId = req.user._id;
  let posts = await Post.getAllPosts(userId);
  if (posts) return res.status(200).send({ success: true, posts: posts });
  else return res.status(400).send({ success: false });
});
// user get user post
router.get("/me/post", auth, async (req, res) => {});
// user update post
router.put("/me/post", auth, async (req, res) => {});

module.exports = router;
