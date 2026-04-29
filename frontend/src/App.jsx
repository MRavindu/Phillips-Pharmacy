import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================================================================
PUBLIC PAGES
================================================================*/
import LandingNavbar from "./components/navbars/LandingNavbar";
import Footer from "./components/footers/LandingFooter";
import HomePage from "./pages/landing/HomePage";
import ServicesPage from "./pages/landing/ServicesPage";
import AboutPage from "./pages/landing/AboutPage";
import ContactPage from "./pages/landing/ContactPage";

/* ================================================================
COMPONENTS
================================================================*/
import Layout from "./components/layout/Layout";

/* ================================================================
AUTH PAGES
================================================================*/
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* ================================================================
DASHBOARDS OF DIFFERENT USER ROLES
================================================================*/
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ReceptionistDashboard from "./pages/dashboards/ReceptionistDashboard";
import DeliveryDashboard from "./pages/dashboards/DeliveryDashboard";
import PharmacistDashboard from "./pages/dashboards/PharmacistDashboard";

/* ================================================================
SUBPAGES OF DIFFERENT USER ROLES
================================================================*/

/*------------ PHARMACIST SUBPAGES ------------*/
import InventoryPage from "./pages/userScreens/pharmacist/InventoryPage";
import AlertsPage from "./pages/userScreens/pharmacist/AlertsPage";
import PrescriptionView from "./pages/userScreens/pharmacist/PrescriptionView";
import ReportsPage from "./pages/userScreens/pharmacist/ReportsPage";

/*------------ ADMIN SUBPAGES ------------*/
import SystemLogsPage from "./pages/userScreens/admin/SystemLog";
import UserManagementPage from "./pages/userScreens/admin/ManageStaff";
import SupplierManagementPage from "./pages/userScreens/admin/ManageSupplier";
import InventoryManagementPage from "./pages/userScreens/admin/ManageInventory";
import AdminReportsPage from "./pages/userScreens/admin/AdminReports";

/**
 * ProtectedRoute Component
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

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Pages with Navbar & Footer */}
        <Route path="/" element={ <> <LandingNavbar /> <HomePage /> <Footer /> </> } />
        <Route path="/services" element={ <> <LandingNavbar /> <ServicesPage /> <Footer /> </> } />
        <Route path="/about" element={ <> <LandingNavbar /> <AboutPage /> <Footer /> </> } />
        <Route path="/contact" element={ <> <LandingNavbar /> <ContactPage /> <Footer /> </> } />

        {/* Public Auth Routes - No Sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={ <ProtectedRoute allowedRoles={["admin"]}> <AdminDashboard /> </ProtectedRoute> } />
        <Route path="/admin/systemlog" element={ <ProtectedRoute allowedRoles={["admin"]}> <SystemLogsPage /> </ProtectedRoute> } />
        <Route path="/admin/managestaff" element={ <ProtectedRoute allowedRoles={["admin"]}> <UserManagementPage /> </ProtectedRoute> } />
        <Route path="/admin/managesupplier" element={ <ProtectedRoute allowedRoles={["admin"]}> <SupplierManagementPage /> </ProtectedRoute> } />
        <Route path="/admin/manageinventory" element={ <ProtectedRoute allowedRoles={["admin"]}> <InventoryManagementPage /> </ProtectedRoute> } />
        <Route path="/admin/adminreports" element={ <ProtectedRoute allowedRoles={["admin"]}> <AdminReportsPage /> </ProtectedRoute> } />

        {/* Pharmacist Routes */}
        <Route path="/pharmacist-dashboard" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <PharmacistDashboard /> </ProtectedRoute> } />
        <Route path="/pharmacist/inventory" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <InventoryPage /> </ProtectedRoute> } />
        <Route path="/pharmacist/alerts" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <AlertsPage /> </ProtectedRoute> } />
        <Route path="/pharmacist/prescriptions" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <PrescriptionView /> </ProtectedRoute> } />
        <Route path="/pharmacist/reports" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <ReportsPage /> </ProtectedRoute> } />

        {/* Receptionist Routes */}
        <Route path="/receptionist-dashboard" element={ <ProtectedRoute allowedRoles={["receptionist"]}> <ReceptionistDashboard /> </ProtectedRoute> } />
        
        {/* Delivery Routes */}
        <Route path="/delivery-dashboard" element={ <ProtectedRoute allowedRoles={["delivery person"]}> <DeliveryDashboard /> </ProtectedRoute> } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;