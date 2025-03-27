const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name scores") // Fetch name and scores
      .lean(); // Convert to plain objects for better performance

    const leaderboard = users
      .map((user) => ({
        name: user.name,
        highestScore: user.scores.length
          ? Math.max(...user.scores.map((score) => score.score))
          : 0, // If no scores, set to 0
      }))
      .sort((a, b) => b.highestScore - a.highestScore) // Sort in descending order
      .slice(0, 10); // Get top 10

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};
