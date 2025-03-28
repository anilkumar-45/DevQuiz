const mongoose = require("mongoose");
// 
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
