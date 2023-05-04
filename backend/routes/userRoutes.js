const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
  registerWOEmail,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/registerwom", registerWOEmail);
router.post("/login", authUser);
router.route("/").get(protect, allUsers);

module.exports = router;
