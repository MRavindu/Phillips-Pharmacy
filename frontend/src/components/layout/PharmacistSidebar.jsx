import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaBell, FaFilePrescription, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../api/authService";

const PharmacistSidebar = () => {
  const location = useLocation();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? "active-link" : "";

    const handleLogout = () => {
      logout();
      navigate("/login"); // Force redirect after logout
      window.location.reload(); // Ensures state is wiped clean
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Phillips Pharmacy</h3>
        <p>Pharmacist Panel</p>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/pharmacist/inventory" className={`nav-item ${isActive('/pharmacist/inventory')}`}>
          <FaBox /> <span>Inventory & POS</span>
        </Link>
        
        <Link to="/pharmacist/alerts" className={`nav-item ${isActive('/pharmacist/alerts')}`}>
          <FaBell /> <span>Stock Alerts</span>
        </Link>
        
        <Link to="/pharmacist/prescriptions" className={`nav-item ${isActive('/pharmacist/prescriptions')}`}>
          <FaFilePrescription /> <span>Prescriptions</span>
        </Link>
        
        <Link to="/pharmacist/reports" className={`nav-item ${isActive('/pharmacist/reports')}`}>
          <FaChartBar /> <span>Sales Reports</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
      </div>
    </div>
  );
};

export default PharmacistSidebar;