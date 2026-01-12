import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Add this import

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate(); // 2. Initialize the hook here

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email,
      });
      setMessage("If this email exists, a reset link has been sent.");
    } catch (err) {
      setMessage("Error sending reset link.");
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
        <h3>Forgot Password</h3>
        <p>Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "20px", width: "100%" }}
          >
            Send Link
          </button>
          
          <p style={{ marginTop: "5%", textAlign: "center" }}>
            Back to
            <span
              onClick={() => navigate("/login")} // This will now work!
              style={{
                color: "var(--primary-base)",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              Login
            </span>
          </p>
        </form>
        {message && (
          <p style={{ marginTop: "10px", color: "blue", textAlign: "center" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;