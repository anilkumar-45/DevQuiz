const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controllers/leaderboardController");

// Define the leaderboard route
router.get("/", getLeaderboard);

module.exports = router;
