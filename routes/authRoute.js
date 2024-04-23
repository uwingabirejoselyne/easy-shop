const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockedUser,
  unBlocked,
  handlerToken,
  updatePassword
} = require("../controller/userCtrl");
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router();
router.post("/register", createUser);
router.post("/login",isAdmin,loginUserCtrl);
router.put("/password",authMiddleware,updatePassword)
router.get("/all-users", getAllUsers);
router.get("/refresh", handlerToken)
router.get("/:id",authMiddleware,isAdmin, getUser)
router.delete("/:id", deleteUser)
router.put("/:id",authMiddleware, updateUser)
router.put("/block/:id",authMiddleware,isAdmin, blockedUser)
router.put("/unblock/:id",authMiddleware,isAdmin, unBlocked)


module.exports = router;
