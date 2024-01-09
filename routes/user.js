const userController = require("../controllers/userController");
const {
  VerifyAndAuthorization,
  verifyToken,
  VerifyAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

// Update user
router.put("/:id", VerifyAndAuthorization, userController.updateUser);

//delete user
router.delete("/:id", VerifyAndAuthorization, userController.deleteUser);

//GET USER
router.get("/:id", VerifyAndAuthorization, userController.getUser);

//GEt all user
router.get("/", VerifyAndAdmin, userController.getAllUser);

module.exports = router;
