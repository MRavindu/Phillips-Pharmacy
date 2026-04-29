import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signup } from "../../api/authService";
import ParticlesBackground from "../../components/ParticlesBackground";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    sname: "",
    snic: "",
    semail: "",
    stelno: "",
    uname: "",
    upswrd: "",
    confirmPassword: "",
    roleId: "",
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();

  // Password Strength Logic
  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    setStrength(score);
  };

  // Fetch roles from backend
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "upswrd") checkStrength(value);
  };

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-300";
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-orange-500";
    return "bg-green-500";
  };

  const getStrengthTextColor = () => {
    if (strength === 0) return "text-gray-400";
    if (strength <= 2) return "text-red-500";
    if (strength === 3) return "text-orange-500";
    return "text-green-500";
  };

  const validatePassword = (password) => {
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

    if (formData.upswrd !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

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
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-3 mb-4 justify-center"
            >
              <img
                src="/images/logo.png"
                alt="Phillips Pharmacy Logo"
                className="h-9 object-contain"
              />
              <div className="text-left leading-tight">
                <p className="text-2xl font-bold text-cyan-700">PHILLIPS PHARMACY</p>
              </div>
            </a>
            <h5 className="text-2xl font-semibold text-gray-800">
              Staff Registration
            </h5>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                name="sname"
                placeholder="Janindu Perera"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIC Number
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                name="snic"
                placeholder="xxxxxxxxxv"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                name="semail"
                type="email"
                placeholder="janinduperera@gmail.com"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telephone Number
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                name="stelno"
                placeholder="0761231234"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                {roles?.map((r) => (
                  <option key={r.roleId} value={r.roleId}>
                    {r.roleName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                name="uname"
                placeholder="Please enter a username here..."
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPwd ? "text" : "password"}
                  name="upswrd"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 cursor-pointer text-lg select-none"
                >
                  {showPwd ? "🙈" : "👁️"}
                </span>
              </div>

              {/* Strength Meter */}
              <div className="h-1 w-full bg-gray-300 mt-1 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: `${(strength / 4) * 100}%` }}
                />
              </div>
              <small className={`${getStrengthTextColor()} block mt-0.5`}>
                {strength === 0
                  ? ""
                  : strength < 3
                  ? "Weak"
                  : strength === 3
                  ? "Medium"
                  : "Strong"}
              </small>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCPwd ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowCPwd(!showCPwd)}
                  className="absolute right-3 cursor-pointer text-lg select-none"
                >
                  {showCPwd ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-2"
            >
              Register Staff
            </button>

            <p className="text-center mt-4 text-gray-600">
              Back to{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-cyan-700 font-bold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;