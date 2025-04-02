const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scores: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      category: { type: String, required: true },
      difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
      score: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  quizHistory: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      category: { type: String, required: true },
      difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
      score: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.updateScore = async function (quizId, category, score) {
  this.scores.push({ quizId, category,difficulty, score });
  await this.save();
};

UserSchema.methods.updateQuizHistory = async function (quizId, category, difficulty, score) {
  this.quizHistory.push({ quizId, category, difficulty, score });
  await this.save();
};

module.exports = mongoose.model("User", UserSchema);
