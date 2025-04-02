import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import QuizList from "./pages/QuizList";
import QuizAttempt from "./pages/QuizAttempt";
import Leaderboard from "./pages/Leaderboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import UserLayout from "./layout/UserLayout";
// routing
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<QuizList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="quiz/se" />
          </Route>
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <QuizAttempt />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
