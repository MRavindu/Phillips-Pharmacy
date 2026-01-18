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
import LandingNavbar from "./components/landing/LandingNavbar";
import Footer from "./components/landing/Footer";
import HomePage from "./pages/landing/HomePage";
import ServicesPage from "./pages/landing/ServicesPage";
import AboutPage from "./pages/landing/AboutPage";
import ContactPage from "./pages/landing/ContactPage";

/* ================================================================
COMPONENTS
================================================================*/
import Layout from "./components/Layout";

/* ================================================================
AUTH PAGES
================================================================*/
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ================================================================
DASHBOARDS OF DIFFERENT USER ROLES
================================================================*/
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";

/* ================================================================
SUBPAGES OF DIFFERENT USER ROLES
================================================================*/

/*------------ PHARMACIST SUBPAGES ------------*/
import PharmacistSidebar from "./components/layout/PharmacistSidebar";
import InventoryPage from "./pages/pharmacist/InventoryPage";
import AlertsPage from "./pages/pharmacist/AlertsPage";
import PrescriptionView from "./pages/pharmacist/PrescriptionView";
import ReportsPage from "./pages/pharmacist/ReportsPage";

/*------------ ADMIN SUBPAGES ------------*/
import AdminSidebar from "./components/layout/AdminSidebar";
import SystemLogsPage from "./pages/admin/SystemLog";
import UserManagementPage from "./pages/admin/ManageStaff";
import SupplierManagementPage from "./pages/admin/ManageSupplier";
import InventoryManagementPage from "./pages/admin/ManageInventory";
import AdminReportsPage from "./pages/admin/AdminReports";

/**
 * ProtectedRoute Component
 * Wraps protected pages with the Layout and passes the user data
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  // 1. If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.roleName?.toLowerCase();

  // 2. If role doesn't match, redirect to a safe page (avoiding a loop back to itself)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // 3. Return the Layout. Do NOT put any setStates or logic here.
  return <Layout user={user}>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* The root path is now your HomePage */}
        {/* The Root Path MUST be "/" for the Home Page to show immediately */}
        <Route path="/" element={ <> <LandingNavbar /> <HomePage /> <Footer /> </> } />

        {/* Public Landing Pages with Navbar & Footer */}
        <Route path="/services" element={ <> <LandingNavbar /> <ServicesPage /> <Footer /> </> } />
        <Route path="/about" element={ <> <LandingNavbar /> <AboutPage /> <Footer /> </> } />
        <Route path="/contact" element={ <> <LandingNavbar /> <ContactPage /> <Footer /> </> } />

        {/* ... Services & Contact ... */}

        {/* Public Auth Routes - No Sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes - Sidebar included */}
        <Route path="/admin-dashboard" element={ <ProtectedRoute allowedRoles={["admin"]}> <AdminDashboard /> </ProtectedRoute> } />

        {/* Admin Subpages */}
        <Route path="/admin/systemlog" element={<><AdminSidebar /><SystemLogsPage /></>} />
        <Route path="/admin/managestaff" element={<><AdminSidebar /><UserManagementPage /></>} />
        <Route path="/admin/managesupplier" element={<><AdminSidebar /><SupplierManagementPage /></>} />
        <Route path="/admin/manageinventory" element={<><AdminSidebar /><InventoryManagementPage /></>} />
        <Route path="/admin/adminreports" element={<><AdminSidebar /><AdminReportsPage /></>} />

        <Route path="/receptionist-dashboard" element={ <ProtectedRoute allowedRoles={["receptionist"]}> <ReceptionistDashboard /> </ProtectedRoute> } />

        <Route path="/delivery-dashboard" element={ <ProtectedRoute allowedRoles={["delivery person"]}> <DeliveryDashboard /> </ProtectedRoute> } />

        {/* <Route 
          path="/doctor-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        /> */}

        {/* Pharmacist Routes */}
        <Route path="/pharmacist-dashboard" element={ <ProtectedRoute allowedRoles={["pharmacist"]}> <PharmacistDashboard /> </ProtectedRoute> } />

        <Route path="/pharmacist/inventory" element={<><PharmacistSidebar /><InventoryPage /></>} />
        <Route path="/pharmacist/alerts" element={<><PharmacistSidebar /><AlertsPage /></>} />
        <Route path="/pharmacist/prescriptions" element={<><PharmacistSidebar /><PrescriptionView /></>} />
        <Route path="/pharmacist/reports" element={<><PharmacistSidebar /><ReportsPage /></>} /> 

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
