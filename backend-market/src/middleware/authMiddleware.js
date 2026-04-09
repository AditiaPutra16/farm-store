const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(403).json("No token");

  const token = authHeader.split(" ")[1]; // ambil setelah "Bearer"

  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};
