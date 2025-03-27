const Quiz = require("../models/Quiz");

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
    const { userId, quizId, answers } = req.body;

    if (!userId || !quizId || !answers) {
      return res.status(400).json({ message: "All fields are required" });
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

    res.json({ message: "Quiz completed", score, totalQuestions });
  } catch (error) {
    console.error("Error in quiz attempt:", error);
    res.status(500).json({ message: "Server error" });
  }
};
