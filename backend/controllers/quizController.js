const Quiz = require("../models/Quiz");

exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, category, difficulty } = req.body;

    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Quiz({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
    });
    await newQuestion.save();

    res
      .status(201)
      .json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    console.error("Error adding question", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
