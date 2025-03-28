import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, attemptQuiz } from "../services/api";

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await getQuizById(id);
        setQuiz(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSelectAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    try {
      const quizData = {
        userId: "replace_with_user_id", // Replace with actual user ID from auth
        quizId: id,
        answers: Object.keys(answers).map((questionId) => ({
          questionId,
          selectedOption: answers[questionId],
        })),
      };

      const { data } = await attemptQuiz(quizData);
      alert(`Quiz Completed! Score: ${data.score}/${data.totalQuestions}`);
      navigate("/leaderboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
      {quiz.questions.map((q) => (
        <div key={q._id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name={q._id}
                value={option}
                checked={answers[q._id] === option}
                onChange={() => handleSelectAnswer(q._id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizAttempt;
