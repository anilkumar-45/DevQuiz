const Quiz = require("../models/Quiz");

// ✅ Create a Quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, category, difficulty, questions } = req.body;
    if (!title || !category || !difficulty || !questions.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuiz = await Quiz.create({ title, category, difficulty, questions });
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const { category, difficulty, limit } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter).limit(Number(limit) || 10);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Attempt a Quiz
exports.attemptQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user.id; // Extract user from token

    if (!quizId || !answers) return res.status(400).json({ message: "Quiz ID and answers are required" });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        score++;
      }
    });

    res.json({ message: "Quiz completed", score, totalQuestions: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
