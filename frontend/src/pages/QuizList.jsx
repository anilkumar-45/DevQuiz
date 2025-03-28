import { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="border p-2 rounded mb-2">
            <h3 className="font-semibold">{quiz.title}</h3>
            <p>Category: {quiz.category}</p>
            <p>Difficulty: {quiz.difficulty}</p>
            <a href={`/quiz/${quiz._id}`} className="text-blue-500">
              Start Quiz
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
