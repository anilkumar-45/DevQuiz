const User = require("../models/User");

// ✅ Get User's Quiz History
exports.getUserHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("scores.quizId", "title");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.scores);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get User's Best Score per Category
exports.getUserBestScores = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const bestScores = {};
    user.scores.forEach((record) => {
      if (!bestScores[record.category] || record.score > bestScores[record.category]) {
        bestScores[record.category] = record.score;
      }
    });

    res.json(bestScores);
  } catch (error) {
    console.error("Error fetching best scores:", error);
    res.status(500).json({ message: "Server error" });
  }
};
