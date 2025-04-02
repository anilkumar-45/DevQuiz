// frontend/components/QuizAttempt.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`/api/quizzes/${id}`);
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const nextQuestion = () => {
    if (selectedAnswer === questions[currentIndex]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(null);
    setTimer(30);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  if (questions.length === 0) return <p>Loading quiz...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">{questions[currentIndex].question}</h2>
      <p className="text-gray-600">Time Left: {timer} sec</p>
      <div className="mt-4">
        {questions[currentIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`block w-full p-2 mb-2 border rounded ${
              selectedAnswer === option ? "bg-blue-300" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={nextQuestion}
        className="bg-blue-500 text-white p-2 rounded w-full mt-4"
      >
        Next
      </button>
    </div>
  );
};

export default QuizAttempt;
