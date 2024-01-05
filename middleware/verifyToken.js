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
      console.log("Decoded Token:", user); // Add this line for debugging
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

// Get All User
const VerifyAndAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Add this line for debugging
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You are not an admin." });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { verifyToken, VerifyAndAuthorization, VerifyAndAdmin };
