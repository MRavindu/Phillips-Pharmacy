import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import { signup } from "../api/authService";

// Import eye icons (or use emojis/lucide-react if preferred)
// import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    sname: "",
    snic: "",
    semail: "",
    stelno: "",
    uname: "",
    upswrd: "",
    confirmPassword: "",
    roleId: "", // Matches the Integer roleId the backend expects
  });

  const [roles, setRoles] = useState([]); // Initialize as empty array to prevent crash
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [strength, setStrength] = useState(0); // 0 to 4
  const navigate = useNavigate();

  // Password Strength Logic
  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++; // Length check
    if (/[0-9]/.test(password)) score++; // Number check
    if (/[!@#$%^&*]/.test(password)) score++; // Special char check
    if (/[A-Z]/.test(password)) score++; // Uppercase check
    setStrength(score);
  };

  // 1. Fetch roles from Backend when page loads
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/roles"
        );
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to load roles:", err);
        setError("Could not load roles from server.");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    // Destructure name and value from e.target
    const { name, value } = e.target;

    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (name === "upswrd") checkStrength(value);
  };

  // Helper for strength bar color
  const getStrengthColor = () => {
    if (strength === 0) return "#e0e0e0";
    if (strength <= 2) return "#ff4d4d"; // Red
    if (strength === 3) return "#ffa500"; // Orange
    return "#22c55e"; // Green
  };

  const validatePassword = (password) => {
    // Regex: Min 8 chars, 1 special char, 1 number
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.roleId) {
      setError("Please select a user role.");
      return;
    }

    // 1. Check if fields match
    if (formData.upswrd !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // 2. Check complexity
    if (!validatePassword(formData.upswrd)) {
      setError(
        "Password must be at least 8 characters long and include at least one number & one special character."
      );
      return;
    }

    if (strength < 3) {
      setError(
        "Password is too weak. Ensure it has 8+ chars, a number, and a special character."
      );
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      await signup(submitData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{ justifyContent: "center", padding: "50px 0" }}
    >
      <div className="card" style={{ width: "500px" }}>
        <h5 className="logintitle">Staff Registration</h5>
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>Full Name</label>
          <input
            className="form-control"
            name="sname"
            placeholder="Janindu Perera"
            onChange={handleChange}
            required
          />

          <label>NIC Number</label>
          <input
            className="form-control"
            name="snic"
            placeholder="xxxxxxxxxv"
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            className="form-control"
            name="semail"
            type="email"
            placeholder="janinduperera@gmail.com"
            onChange={handleChange}
            required
          />

          <label>Telephone Number</label>
          <input
            className="form-control"
            name="stelno"
            placeholder="0761231234"
            onChange={handleChange}
            required
          />

          <label>Designation</label>
          <select
            className="form-control"
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="" style={{}}>
              Select Role
            </option>
            {/* The ?. ensures we don't crash if roles is still loading */}
            {roles?.map((r) => (
              <option key={r.roleId} value={r.roleId}>
                {r.roleName}
              </option>
            ))}
          </select>

          <label>Username</label>
          <input
            className="form-control"
            name="uname"
            placeholder="Please enter a username here..."
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showPwd ? "text" : "password"}
              name="upswrd"
              className="form-control"
              onChange={handleChange}
              required
              style={{ width: "100%", paddingRight: "40px" }} // Add padding so text doesn't go under icon
            />
            <span
              onClick={() => setShowPwd(!showPwd)}
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                fontSize: "1.2rem",
                userSelect: "none",
              }}
            >
              {showPwd ? "🙈" : "👁️"}
            </span>
          </div>

          {/* --- STRENGTH METER BAR --- */}
          <div
            style={{
              height: "5px",
              width: "100%",
              backgroundColor: "#e0e0e0",
              marginTop: "5px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(strength / 4) * 100}%`,
                backgroundColor: getStrengthColor(),
                transition: "width 0.3s ease",
                borderRadius: "5px",
              }}
            />
          </div>
          <small style={{ color: getStrengthColor(), marginBottom: "10px" }}>
            {strength === 0
              ? ""
              : strength < 3
              ? "Weak"
              : strength === 3
              ? "Medium"
              : "Strong"}
          </small>

          <label>Confirm Password</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showCPwd ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              onChange={handleChange}
              required
              style={{ width: "100%", paddingRight: "40px" }} // Add padding so text doesn't go under icon
            />
            <span
              onClick={() => setShowCPwd(!showCPwd)}
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                fontSize: "1.2rem",
                userSelect: "none",
              }}
            >
              {showCPwd ? "🙈" : "👁️"}
            </span>
          </div>

          {error && (
            <div
              className="error-text"
              style={{ color: "red", marginTop: "10px" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "20px" }}
          >
            Register Staff
          </button>
          <p style={{ marginTop: "5%", textAlign: "center" }}>
            Back to
            <span
              onClick={() => navigate("/login")}
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
      </div>
    </div>
  );
};

export default SignupPage;
