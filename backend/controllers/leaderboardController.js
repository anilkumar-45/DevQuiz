const Leaderboard = require("../models/Leaderboard");

// ✅ Add a new score to the leaderboard
exports.addScore = async (req, res) => {
  try {
    const { category, score } = req.body;
    const userId = req.user.id; // Get user ID from token
    const username = req.user.username; // Extract from auth

    if (!category || score === undefined) {
      return res.status(400).json({ message: "Category and score are required" });
    }

    const newScore = new Leaderboard({ userId, username, category, score });
    await newScore.save();

    res.status(201).json({ message: "Score added successfully", score: newScore });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Top Scores (Filtered by Category)
exports.getLeaderboard = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const topScores = await Leaderboard.find(filter)
      .sort({ score: -1 }) // Sort highest scores first
      .limit(10) // Limit to top 10
      .populate("userId", "username");

    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
