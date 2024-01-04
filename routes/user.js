const userController = require("../controllers/userController");
const {
  VerifyAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

const router = require("express").Router();

// update user
router.put("/:id", VerifyAndAuthorization, userController.updateUser);

module.exports = router;
