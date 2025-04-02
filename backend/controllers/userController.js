const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile (Name, Email)
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserQuizHistory = async (req, res) => {
  try {
    const { category, difficulty } = req.query; // Optional filters
    const user = await User.findById(req.user.id).select("quizHistory").populate("quizHistory.quizId", "title category");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let quizHistory = user.quizHistory;

    // Apply filters if provided
    if (category) {
      quizHistory = quizHistory.filter((q) => q.category === category);
    }
    if (difficulty) {
      quizHistory = quizHistory.filter((q) => q.difficulty === difficulty);
    }

    res.status(200).json({ quizHistory });
  } catch (error) {
    console.error("Error fetching quiz history:", error);
    res.status(500).json({ message: "Server error" });
  }
};