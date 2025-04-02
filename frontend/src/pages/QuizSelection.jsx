// frontend/components/QuizSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizSelection = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(10);
  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      const { data } = await axios.get(
        `/api/quizzes?difficulty=${difficulty}&questionCount=${questionCount}`
      );

      if (data.length > 0) {
        navigate(`/quiz/${data[0]._id}`); // Navigate to the first quiz found
      } else {
        alert("No quizzes available for selected options");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Select Your Quiz</h2>
      <label className="block mb-2">Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="block mb-2">Number of Questions:</label>
      <input
        type="number"
        value={questionCount}
        onChange={(e) => setQuestionCount(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        min={1}
        max={50}
      />

      <button onClick={startQuiz} className="bg-blue-500 text-white p-2 rounded w-full">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizSelection;
