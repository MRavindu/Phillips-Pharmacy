import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); 
  const navigate = useNavigate();

  // State Management
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState("");

  // 1. Password Strength Logic (Moved outside handleReset)
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++; 
    if (/[0-9]/.test(pwd)) score++; 
    if (/[!@#$%^&*]/.test(pwd)) score++; 
    if (/[A-Z]/.test(pwd)) score++; 
    setStrength(score);
  };

  // 2. Strength Color Helper
  const getStrengthColor = () => {
    if (strength === 0) return "#e0e0e0";
    if (strength <= 2) return "#ff4d4d"; 
    if (strength === 3) return "#ffa500"; 
    return "#22c55e"; 
  };

  // 3. Validation Regex
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(pwd);
  };

  // 4. Input Handler
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkStrength(val);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    // Validation checks
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be 8+ characters with a number and special character.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        token: token,
        password: password,
      });
      alert("Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Link expired or invalid.");
    }
  };

  return (
    <div className="dashboard-container" style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="card" style={{ width: "400px" }}>
        <h3 className="logintitle">Set New Password</h3>
        <form onSubmit={handleReset}>
          
          <label>New Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPwd ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPwd(!showPwd)}
              style={{ position: "absolute", right: "10px", cursor: "pointer" }}
            >
              {showPwd ? "🙈" : "👁️"}
            </span>
          </div>

          {/* STRENGTH METER */}
          <div style={{ height: "5px", width: "100%", backgroundColor: "#e0e0e0", marginTop: "10px", borderRadius: "5px" }}>
            <div style={{ 
              height: "100%", 
              width: `${(strength / 4) * 100}%`, 
              backgroundColor: getStrengthColor(), 
              transition: "width 0.3s ease",
              borderRadius: "5px" 
            }} />
          </div>
          <small style={{ color: getStrengthColor() }}>
            {strength === 0 ? "" : strength < 3 ? "Weak" : strength === 3 ? "Medium" : "Strong"}
          </small>

          <label style={{ marginTop: "15px" }}>Confirm New Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showConfirmPwd ? "text" : "password"}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              style={{ position: "absolute", right: "10px", cursor: "pointer" }}
            >
              {showConfirmPwd ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "10px" }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "20px" }}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;