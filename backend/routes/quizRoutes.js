const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  addQuestion, // Now it exists
  attemptQuiz,
} = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, admin, createQuiz);
router.get("/", protect, getAllQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/add", protect, admin, addQuestion); // This was causing the error earlier
router.post("/attempt", protect, attemptQuiz);

module.exports = router;
