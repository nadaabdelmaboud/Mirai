require("dotenv/config"); // to use env variable

const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyparser = require("body-parser");
const logger = require("morgan");
require("./controllers/db-controller")();
const user = require("./routes/user-route");

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(logger("dev"));

app.use(methodOverride());

app.use("/api", user);

const API_PORT = process.env.PORT || 3000;

app.use(function (error, req, res, next) {
  res.status(500);
  res.send({ error: error.message });
});
app.listen(process.env.port || API_PORT, function () {
  console.log("listening for a request");
});

module.exports = app;
