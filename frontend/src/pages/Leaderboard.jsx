import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await getLeaderboard();
        console.log("Leaderboard data:", data);
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Navbar/>
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
      {leaders.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Rank</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Highest Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr key={`${user.name}-${index}`} className="border-t">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2 text-center font-semibold">{user.highestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No scores available yet!</p>
      )}
    </div>
  );
};

export default Leaderboard;
