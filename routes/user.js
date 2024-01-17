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
<<<<<<< HEAD
router.get("/", VerifyAndAdmin, userController.getAllUser);
=======
router.get("/", userController.getAllUser);
>>>>>>> 156a1f056474916f6a059151e54dbb72c71fbb12

module.exports = router;
