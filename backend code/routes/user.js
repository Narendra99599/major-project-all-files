const express = require("express");
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/resetPassword");
const { getAllDetails } = require("../controllers/getDetails");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword);
router.get("/get-all-details",auth, getAllDetails);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports.userRoutes = router;
