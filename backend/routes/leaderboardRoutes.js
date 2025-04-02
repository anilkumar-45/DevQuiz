const express = require("express");
const { addScore, getLeaderboard } = require("../controllers/leaderboardController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addScore); // Protected route
router.get("/", getLeaderboard); // Public

module.exports = router;
