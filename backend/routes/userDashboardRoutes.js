const express = require("express");
const { getUserHistory, getUserBestScores } = require("../controllers/userDashboardController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/history", protect, getUserHistory);
router.get("/best-scores", protect, getUserBestScores);

module.exports = router;
