const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserQuizHistory,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile (name, email)
router.put("/profile", authMiddleware, updateUserProfile);

// Change password
router.put("/change-password", authMiddleware, changePassword);

router.get("/quiz-history", authMiddleware, getUserQuizHistory);

module.exports = router;
