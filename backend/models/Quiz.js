const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ["HTML", "CSS", "JavaScript"] },
  difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Quiz", QuizSchema);
