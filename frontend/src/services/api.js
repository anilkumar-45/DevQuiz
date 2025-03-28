import axios from "axios";
import { getAuthToken, getUserId } from "../utils/auth";

const API_BASE_URL = "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if available
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
export const getProfile = () => api.get("/auth/profile");

// Quiz APIs
export const getQuizzes = () => api.get("/quizzes");
export const getQuizById = (quizId) => api.get(`/quizzes/${quizId}`);

export const attemptQuiz = (quizData) => {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return api.post("/quizzes/attempt", { userId, ...quizData });
};

export const submitQuiz = (quizId, answers) => {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return api.post(`/quizzes/${quizId}/submit`, { userId, answers });
};

// Leaderboard API
export const getLeaderboard = () => api.get("/leaderboard");

export default api;
