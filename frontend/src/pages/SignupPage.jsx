import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import { signup } from "../api/authService";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    sname: "",
    snic: "",
    semail: "",
    stelno: "",
    uname: "",
    upswrd: "",
    roleId: "", // Matches the Integer roleId the backend expects
  });

  const [roles, setRoles] = useState([]); // Initialize as empty array to prevent crash
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 1. Fetch roles from Backend when page loads
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/roles");
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to load roles:", err);
        setError("Could not load roles from server.");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.roleId) {
      setError("Please select a user role.");
      return;
    }
    try {
      await signup(formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="dashboard-container" style={{ justifyContent: "center", padding: "50px 0" }}>
      <div className="card" style={{ width: "500px" }}>
        <h2 className="logintitle">Staff Registration</h2>
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column" }}>
          
          <label>Full Name</label>
          <input name="sname" onChange={handleChange} required />

          <label>NIC Number</label>
          <input name="snic" onChange={handleChange} required />

          <label>Email Address</label>
          <input name="semail" type="email" onChange={handleChange} required />

          <label>Telephone Number</label>
          <input name="stelno" onChange={handleChange} required />

          <label>User Role</label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {/* The ?. ensures we don't crash if roles is still loading */}
            {roles?.map((r) => (
              <option key={r.roleId} value={r.roleId}> 
                {r.roleName} 
              </option>
            ))}
          </select>

          <label>Username</label>
          <input name="uname" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="upswrd" onChange={handleChange} required />

          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

          <button type="submit" className="btn-primary" style={{ marginTop: "20px" }}>
            Register Staff
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;