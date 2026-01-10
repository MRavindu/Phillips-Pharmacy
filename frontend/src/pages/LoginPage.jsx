import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../api/authService";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in (Persistence check)
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.urole === "admin") navigate("/admin-dashboard");
      else navigate("/staff-dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await login(username, password);

      // 1. Update the Global State in App.jsx
      onLoginSuccess(userData);

      // 2. Role-based Redirection
      if (userData.urole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/staff-dashboard");
      }
    } catch (err) {
      // This catches 401, 403, and Network Errors
      setError(typeof err === "string" ? err : "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Phillips Pharmacy</h2>
        <p style={styles.subtitle}>Medical Inventory System</p>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.errorMsg}>{error}</div>}

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Simple inline styling to mirror a professional PHP-style dashboard login
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loginBox: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "24px",
  },
  subtitle: {
    margin: "0 0 30px 0",
    color: "#7f8c8d",
    fontSize: "14px",
  },
  inputGroup: {
    textAlign: "left",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "not-allowed",
  },
  errorMsg: {
    color: "#e74c3c",
    backgroundColor: "#fdeaea",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
    fontSize: "14px",
  },
};

export default LoginPage;
