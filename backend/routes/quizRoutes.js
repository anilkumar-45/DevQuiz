const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  addQuestion, 
  attemptQuiz,
  submitQuiz,
} = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/create", protect, admin, createQuiz);
router.get("/", protect, getAllQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/add", protect, admin, addQuestion); 
router.post("/attempt", protect, attemptQuiz);
router.post("/:quizId/submit", protect, submitQuiz);

module.exports = router;
