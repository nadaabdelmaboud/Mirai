require("dotenv/config"); // to use env variable

const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyparser = require("body-parser");
const logger = require("morgan");
const userModel = require("./models/user-model");
require("./controllers/db-controller")();
const user = require("./routes/user-route");
const USER = require("./controllers/user-controller");
const post = require("./routes/post-router");
const path = require("path");
const image = require("./routes/image-route");
var socket = require("socket.io");
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(logger("dev"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
}

app.use(function (error, req, res, next) {
  res.status(500);
  res.send({ error: error.message });
});
app.use(methodOverride());
const API_PORT = process.env.PORT || 8080;

var server = app.listen(process.env.port || API_PORT, function () {
  console.log("listening for a request");
});
//
var io = socket(server);
io.on("connection", function (socket) {
  console.log("Hello socket");
  socket.on("setUserId", async function (data) {
    let user = await userModel.findById(data.userId);
    if (user) {
      user.socketId = socket.id;
      await user.save();
    }
  });
  socket.on("comment", async function (data) {
    let user = await USER.getUserBlog(data.blogName);
    let commentter = await userModel.findById(data.user);
    if (user && commentter) {
      let socketId = user.socketId;
      if (socketId && socketId != "none") {
        console.log(socketId);
        socket.broadcast.to(socketId).emit("sendComment", {
          commentText: data.text,
          commentterName: commentter.userName,
          commentterImage: commentter.profileImage,
          postIndex: user.posts.length - data.postIndex - 1,
          date: Date.now(),
        });
      }
    }
  });
  socket.on("clearUserId", async function (data) {
    let user = await userModel.findById(data.userId);
    if (user) {
      user.socketId = "none";
      await user.save();
    }
  });
});
//
app.use("/api", user);
app.use("/api", post);
app.use("/api", image);

app.use(function (error, req, res, next) {
  res.status(500);
  res.send({ error: error.message });
});
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
