const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controllers/leaderboardController");
const { protect } = require("../middleware/authMiddleware");

// Define the leaderboard route
router.get("/",protect, getLeaderboard);

module.exports = router;
