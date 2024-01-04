const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, async (err, user) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(403).json("Invalid token");
      }

      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const VerifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are restricted from performing this operation");
    }
  });
};

module.exports = { verifyToken, VerifyAndAuthorization };
