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
    setError("");   // Clear previous errors
    setLoading(true);
    
    // 1. Manual Validation Check
    if (!username.trim() && !password.trim()) {
        setError('Username and Password fields cannot be empty');
        return; // Stop execution
    } 

    if (!username.trim()) {
        setError('Username field cannot be empty');
        return; // Stop execution
    } 

    if (!password.trim()) {
        setError('Password field cannot be empty');
        return; // Stop execution
    }

    // If it reaches here, both fields have text. Proceed to API call...

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
    // Instead of <div style={styles.container}>
    <div
      className="dashboard-container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="card" style={{ width: "400px" }}>
        <div className="logintitle">
            <img src="/images/logo.png" alt="Phillips Pharmacy Logo" className="logo-sm" style={{alignSelf: "center"}} />
            <div>
                <h6>Phillips</h6>
                <h6>Pharmacy</h6>
            </div>
        </div>
        
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleLogin}
          noValidate
        >
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        {/* The Red Error Message */}
          {error && <div className="error-text">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5% 30%"}}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
