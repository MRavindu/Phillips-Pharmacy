import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Layout from "./components/Layout";
import { getCurrentUser } from "./api/authService";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on startup
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <LoginPage onLoginSuccess={(data) => setUser(data)} />
            ) : (
              <Navigate
                to={
                  user.urole === "admin"
                    ? "/admin-dashboard"
                    : "/staff-dashboard"
                }
              />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            user?.urole === "admin" ? (
              <Layout user={user}>
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/staff-dashboard"
          element={
            user?.urole === "receptionist" ? (
              <Layout user={user}>
                <StaffDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
