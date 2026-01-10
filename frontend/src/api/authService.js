import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    if (response.data) {
      // Store user data in localStorage as a string
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server error";
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
