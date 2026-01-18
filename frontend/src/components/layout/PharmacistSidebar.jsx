import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBox, FaBell, FaFilePrescription, FaChartBar, FaSignOutAlt, FaDashcube } from "react-icons/fa";
import { logout } from "../../api/authService";

const PharmacistSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? "staff-sidebar-active-item" : "";

    const handleLogout = () => {
      logout();
      navigate("/login"); // Force redirect after logout
      window.location.reload(); // Ensures state is wiped clean
    };

  return (
    <div className="staff-sidebar">
      <div className="staff-sidebar-header">
        <div className="staff-sidebar-logo-image">
          <img src="/images/logo.png" alt="Phillips Pharmacy Logo" className="logo-vsm" style={{ alignSelf: "center" }}/>
          <div>
            <h6 className="staff-sidebar-logo">Phillips Pharmacy</h6>
          </div>
        </div>
        <p className="user-role-identification">Pharmacist Panel</p>
      </div>
      
      <nav className="staff-sidebar-navblock">
        <Link to="/pharmacist/dashboard" className={`staff-nav-item ${isActive('/pharmacist-dashboard')}`}>
          <FaDashcube /> <span>Pharmacist Overview</span>
        </Link>

        <Link to="/pharmacist/inventory" className={`staff-nav-item ${isActive('/pharmacist/inventory')}`}>
          <FaBox /> <span>Inventory & POS</span>
        </Link>
        
        <Link to="/pharmacist/alerts" className={`staff-nav-item ${isActive('/pharmacist/alerts')}`}>
          <FaBell /> <span>Stock Alerts</span>
        </Link>
        
        <Link to="/pharmacist/prescriptions" className={`staff-nav-item ${isActive('/pharmacist/prescriptions')}`}>
          <FaFilePrescription /> <span>Prescriptions</span>
        </Link>
        
        <Link to="/pharmacist/reports" className={`staff-nav-item ${isActive('/pharmacist/reports')}`}>
          <FaChartBar /> <span>Sales Reports</span>
        </Link>
      </nav>

      <div className="staff-sidebar-footer">
        <Link to="/login" className="staff-logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
      </div>
    </div>
  );
};

export default PharmacistSidebar;