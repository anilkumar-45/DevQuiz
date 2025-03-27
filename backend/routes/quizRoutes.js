const express = require("express");
const { addQuestion, getQuestions } = require("../controllers/quizController");
const router = express.Router();

router.post("/add", addQuestion);
router.get("/questions", getQuestions);

module.exports = router;
