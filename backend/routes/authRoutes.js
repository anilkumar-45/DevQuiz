const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);  // User Registration
router.post("/login", login);        // User Login
router.get("/profile", protect, getProfile);  // Get User Profile (Protected)

module.exports = router;
