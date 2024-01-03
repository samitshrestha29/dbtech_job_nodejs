const router = require("express").Router();

// Correct import statement
const authController = require("../controllers/authController");

// REGISTRATION
router.post("/register", authController.createUser);

// // Login
router.post("/login", authController.loginUser);

module.exports = router;
