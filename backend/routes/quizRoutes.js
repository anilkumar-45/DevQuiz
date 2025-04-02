const express = require("express");
const { createQuiz, getAllQuizzes, getQuizById, attemptQuiz } = require("../controllers/quizController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createQuiz); // Protected route
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/attempt", protect, attemptQuiz); // Protected route

module.exports = router;
