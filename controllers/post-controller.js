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
  editPost: async function (userId, index, newPost) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    user.posts[index].imageId = newPost.imageId;
    user.posts[index].isImage = newPost.isImage;
    user.posts[index].postText = newPost.postText;
    await user.save();
    return true;
  },
  createComment: async function (userId, blogName, index, commentText) {
    let user = await UserModel.findById(userId);
    if (!user) return false;
    let blogUser = await User.getUserBlog(blogName);
    if (!blogUser) return false;
    console.log(blogUser);
    blogUser.posts[index].comments.push({
      commentText: commentText,
      commentDate: Date.now(),
      commentter: {
        blogName: user.blogName,
        profileImage: user.profileImage,
        userName: user.userName,
      },
    });
    await blogUser.save();
    return true;
  },
};
module.exports = Post;
