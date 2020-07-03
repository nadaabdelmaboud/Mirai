const router = require("express").Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const User = require("../controllers/user-controller");
const jwt = require("jsonwebtoken");
const Post = require("../controllers/post-controller");
// user add post
router.post("/me/post", auth, async (req, res) => {
  isImage = req.body.newPost.isImage;
  imageId = req.body.newPost.imageId;
  postText = req.body.newPost.postText;
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
router.put("/me/post", auth, async (req, res) => {
  let newPost = req.body.newPost;
  let index = Number(req.body.index);
  let userId = req.user._id;
  let edit = await Post.editPost(userId, index, newPost);
  if (edit) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
// user add comment
router.post("/me/comment", auth, async (req, res) => {
  blogName = req.body.blogName;
  index = req.body.index;
  commentText = req.body.commentText;
  userId = req.user._id;
  let createdComment = await Post.createComment(
    userId,
    blogName,
    index,
    commentText
  );
  if (createdComment) return res.status(200).send({ success: true });
  else return res.status(400).send({ success: false });
});
module.exports = router;
