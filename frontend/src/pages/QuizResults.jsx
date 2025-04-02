import { useNavigate } from "react-router-dom";

const QuizResults = ({ score, totalQuestions, correctAnswers, incorrectAnswers }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
      
      <div className="text-center">
        <p className="text-lg font-semibold">Final Score: {score} / {totalQuestions}</p>
        <p className="text-green-600">Correct Answers: {correctAnswers}</p>
        <p className="text-red-600">Incorrect Answers: {incorrectAnswers}</p>
        <p className="text-gray-500">Unattempted: {totalQuestions - (correctAnswers + incorrectAnswers)}</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Retry Quiz
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => navigate("/leaderboard")}
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
