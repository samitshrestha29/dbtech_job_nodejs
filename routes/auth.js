const router = require("express").Router();

const authController = require("../controllers/authController");

// REGISTRATION
router.post("/register", authController.createUser);

module.exports = router;
