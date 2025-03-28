const Quiz = require("../models/Quiz");
const User = require("../models/User");
// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, category, difficulty, questions } = req.body;

    if (!title || !category || !questions || questions.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuiz = new Quiz({
      title,
      category,
      difficulty,
      questions,
    });

    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add questions to an existing quiz
exports.addQuestion = async (req, res) => {
  try {
    const { quizId, questions } = req.body;

    if (!quizId || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Quiz ID and questions are required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.questions.push(...questions);
    await quiz.save();

    res.status(201).json({ message: "Questions added successfully", quiz });
  } catch (error) {
    console.error("Error adding questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Attempt a quiz
exports.attemptQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user.id; // Get user from token

    if (!quizId || !answers) {
      return res.status(400).json({ message: "Quiz ID and answers are required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question._id.toString()
      );
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        score++;
      }
    });

    // **Save score to user**
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Before updating user scores:", user.scores);

    await user.updateScore(quizId, score);

    console.log("After updating user scores:", user.scores);

    res.json({ message: "Quiz completed", score, totalQuestions });
  } catch (error) {
    console.error("Error in quiz attempt:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.submitQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(401).json({ message: "User authentication failed" });
  }

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] !== undefined && question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Before saving scores:", user.scores);
    await user.updateScore(quizId, score);
    console.log("After saving scores:", user.scores);

    res.json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    console.error("Quiz submission error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
