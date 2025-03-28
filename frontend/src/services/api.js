import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("token");

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const loginUser = (userData) => api.post("/auth/login", userData);
export const registerUser = (userData) => api.post("/auth/register", userData);
export const getProfile = (token) =>
  api.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } });

// Quiz APIs
export const getQuizzes = () =>
  api.get("/quizzes", {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
export const getQuizById = (quizId) =>
  api.get(`/quizzes/${quizId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
export const attemptQuiz = (quizData) => api.post("/quizzes/attempt", quizData);

export const submitQuiz = (quizId, answers) =>
  api.post(`/quizzes/${quizId}/submit`, { answers });

// Leaderboard API
export const getLeaderboard = () => api.get("/leaderboard");

export default api;
