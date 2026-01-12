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
    if (user && user.role) {
      redirectUserByRole(user.role.roleName);
    }
  }, [navigate]);

  // Helper function to handle redirection logic
  const redirectUserByRole = (roleName) => {
    const role = roleName.toLowerCase();
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "receptionist") {
      navigate("/receptionist-dashboard");
    } else if (role === "delivery person") {
      navigate("/delivery-dashboard");
    } else if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (role === "pharmacist") {
      navigate("/pharmacist-dashboard");
    } else {
      // Default fallback
      navigate("/login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username.trim() || !password.trim()) {
      setError("Username and Password fields cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const userData = await login(username, password);

      // 1. Update Global State/LocalStorage
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else {
        // Fallback if App.jsx isn't passing the prop yet
        localStorage.setItem("user", JSON.stringify(userData));
      }

      // 2. Role-based Redirection
      if (userData?.role?.roleName) {
        redirectUserByRole(userData.role.roleName);
      } else {
        setError("User role not assigned. Please contact Admin.");
      }
    } catch (err) {
      setError(typeof err === "string" ? err : "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <img
            src="/images/logo.png"
            alt="Phillips Pharmacy Logo"
            className="logo-sm"
            style={{ alignSelf: "center" }}
          />
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && (
            <div
              className="error-text"
              style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5% 30%" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          onClick={() => navigate("/forgot-password")}
          style={{
            cursor: "pointer",
            color: "blue",
            fontSize: "0.8rem",
            textAlign: "right",
          }}
        >
          Forgot Password?
        </p>

        <p style={{ marginTop: "10%", textAlign: "center" }}>
          New Staff?
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "var(--primary-base)",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
