const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $unwind: "$scores" }, // Flatten scores array
      { $sort: { "scores.score": -1 } }, // Sort scores in descending order
      { 
        $group: { 
          _id: "$_id", 
          name: { $first: "$name" }, 
          highestScore: { $max: "$scores.score" } 
        } 
      }, // Keep only the highest score per user
      { $sort: { highestScore: -1 } }, // Sort by highest score
      { $limit: 10 } // Get top 10 users
    ]);

    res.json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};
