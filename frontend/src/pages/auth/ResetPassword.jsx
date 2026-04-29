import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ParticlesBackground from "../../components/ParticlesBackground";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState("");

  // Password strength checker
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    setStrength(score);
  };

  // Tailwind color classes for the strength bar and text
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

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkStrength(val);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

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
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Set New Password
          </h3>

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPwd ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  value={password}
                  onChange={handlePasswordChange}
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

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 cursor-pointer text-lg select-none"
                >
                  {showConfirmPwd ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;