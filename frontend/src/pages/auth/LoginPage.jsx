import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../../api/authService";
import ParticlesBackground from "../../components/ParticlesBackground";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role) {
      redirectUserByRole(user.role.roleName);
    }
  }, [navigate]);

  // Helper function to handle redirection
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
      navigate("/login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and Password fields cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const userData = await login(username, password);

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else {
        localStorage.setItem("user", JSON.stringify(userData));
      }

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
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-3 mb-6 justify-center"
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
              Staff Login
            </h5>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <p
            onClick={() => navigate("/forgot-password")}
            className="cursor-pointer text-blue-600 text-sm text-right mt-2 hover:underline"
          >
            Forgot Password?
          </p>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            New Staff?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-700 font-bold cursor-pointer hover:underline ml-1"
            >
              Sign Up Here
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;