const jwt = require("jsonwebtoken");
const SECRET = "secret123";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.send("No token");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.send("Invalid token");
  }
};