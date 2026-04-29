import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Forgot Password
            </h3>
            <p className="text-gray-600 text-sm">
              Enter your email to receive a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Send Link
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

          {message && (
            <p className="mt-4 text-blue-600 text-center text-sm font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;