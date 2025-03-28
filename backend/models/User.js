const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  scores: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      score: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.virtual("highestScore").get(function () {
  if (!this.scores || this.scores.length === 0) return 0;
  return Math.max(...this.scores.map((score) => score.score || 0));
});

UserSchema.methods.updateScore = async function (quizId, newScore) {
  quizId = new mongoose.Types.ObjectId(quizId);
  const existingScore = this.scores.find((score) =>
    score.quizId.equals(quizId)
  );

  if (existingScore) {
    if (newScore > existingScore.score) {
      existingScore.score = newScore;
      existingScore.date = Date.now();
    }
  } else {
    this.scores.push({ quizId, score: newScore });
  }

  await this.save();
};

UserSchema.statics.getLeaderboard = async function () {
  return this.find()
    .select("name highestScore")
    .sort({ highestScore: -1 })
    .limit(10); // Top 10 users
};

module.exports = mongoose.model("User", UserSchema);
