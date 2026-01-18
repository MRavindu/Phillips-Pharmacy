import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaUserShield, FaClipboardList, FaSignOutAlt, FaDashcube, FaTruckLoading, FaBook, FaIndustry } from "react-icons/fa";
import { logout } from "../../api/authService";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? "staff-sidebar-active-item" : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
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
        <p className="user-role-identification">Administrator Panel</p>
      </div>
      
      <nav className="staff-sidebar-navblock">
        <Link to="/admin/dashboard" className={`staff-nav-item ${isActive('/admin-dashboard')}`}>
          <FaDashcube /> <span>Admin Overview</span>
        </Link>
        <Link to="/admin/managestaff" className={`staff-nav-item ${isActive('/admin/managestaff')}`}>
          <FaUsers /> <span>Manage Staff</span>
        </Link>
        <Link to="/admin/manageinventory" className={`staff-nav-item ${isActive('/admin/manageinventory')}`}>
          <FaTruckLoading /> <span>Manage Inventory</span>
        </Link>
        <Link to="/admin/managesupplier" className={`staff-nav-item ${isActive('/admin/managesupplier')}`}>
          <FaIndustry /> <span>Manage Suppliers</span>
        </Link>
        <Link to="/admin/adminreports" className={`staff-nav-item ${isActive('/admin/adminreports')}`}>
          <FaBook /> <span>Reports</span>
        </Link>
        <Link to="/admin/systemlog" className={`staff-nav-item ${isActive('/admin/systemlog')}`}>
          <FaClipboardList /> <span>System Logs</span>
        </Link>
      </nav>
 
      <div className="staff-sidebar-footer">
        <Link to="/login" className="staff-logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
      </div>
    </div>
  );
};

export default AdminSidebar;