import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await getLeaderboard();
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Highest Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={user._id} className="border-t">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2 text-center">{user.highestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
