const jwt = require("jsonwebtoken");
const config = require("../config/env");
function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("No provided Token");

  try {
    const decoded = jwt.verify(token, config.jwtsecret);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
