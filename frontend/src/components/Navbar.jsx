import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">Home</Link>
      {user ? (
        <div>
          <span className="mr-4">Hello, {user.name}</span>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
