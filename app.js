require("dotenv/config"); // to use env variable

const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyparser = require("body-parser");
const logger = require("morgan");
require("./controllers/db-controller")();
const user = require("./routes/user-route");
const post = require("./routes/post-router");
const path = require("path");
const image = require("./routes/image-route");
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(logger("dev"));
app.use(
  express.static(path.join(__dirname, "angular-Mirai/dist/angular-Mirai"))
);
app.use(methodOverride());

app.use("/api", user);
app.use("/api", post);
app.use("/api", image);

const API_PORT = process.env.PORT || 8080;

app.use(function (error, req, res, next) {
  res.status(500);
  res.send({ error: error.message });
});
app.listen(process.env.port || API_PORT, function () {
  console.log("listening for a request");
});

module.exports = app;
