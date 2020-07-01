const UserModel = require("../models/user-model");
const User = require("./user-controller");
const Post = {
  createPost: async function (userId, isImage, imageId, postText) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    let createdPost = {
      isImage: isImage,
      imageId: imageId,
      postText: postText,
      postDate: Date.now(),
      comments: [],
    };
    user.posts.push(createdPost);
    await user.save();
    return createdPost;
  },
  getAllPosts: async function (userId) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    let posts = user.posts;
    return posts;
  },
};
module.exports = Post;
