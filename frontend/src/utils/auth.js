import {jwtDecode} from "jwt-decode";

export const getAuthToken = () => localStorage.getItem("token");

export const getUserId = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.id||decoded.userId|| decoded._id)
    return decoded.id || decoded.userId|| decoded._id; // Ensure your backend encodes user ID
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
