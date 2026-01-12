import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Layout from "./components/Layout";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import PharmacistDashboard from "./pages/PharmacistDashboard";

/**
 * ProtectedRoute Component
 * Wraps protected pages with the Layout and passes the user data
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.roleName?.toLowerCase();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // Pass the user object to the Layout so the Sidebar can use it
  return <Layout user={user}>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No Sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/receptionist-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/delivery-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["delivery person"]}>
              <DeliveryDashboard />
            </ProtectedRoute>
          } 
        />

        {/* <Route 
          path="/doctor-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        /> */}

        {/* <Route 
          path="/pharmacist-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["pharmacist"]}>
              <PharmacistDashboard />
            </ProtectedRoute>
          } 
        /> */}

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;