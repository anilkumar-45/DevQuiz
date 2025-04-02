import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [category, setCategory] = useState('HTML');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`/api/leaderboard?category=${category}`);
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchScores();
  }, [category]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS">JavaScript</option>
      </select>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
