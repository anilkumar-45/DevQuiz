const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().select("name scores").lean();

    console.log("Raw User Data:", users); // Debugging

    const leaderboard = users
      .map((user) => {
        const highestScore =
          user.scores?.reduce((max, score) => Math.max(max, score.score), 0) ||
          0;

        return {
          name: user.name,
          highestScore: highestScore,
        };
      })
      .sort((a, b) => b.highestScore - a.highestScore)
      .slice(0, 10);

    console.log("Processed Leaderboard:", leaderboard); // Debugging

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};
