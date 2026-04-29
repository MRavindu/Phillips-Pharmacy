import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/authService"; // adjust path as needed
import {
  FaDashcube,
  FaBox,
  FaBell,
  FaFilePrescription,
  FaChartBar,
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaTruckLoading,
  FaBook,
  FaIndustry,
  FaSignOutAlt,
} from "react-icons/fa";

// ---------- Role‑based navigation config ----------
const NAV_ITEMS = {
  pharmacist: [
    { path: "/pharmacist-dashboard", icon: <FaDashcube />, label: "Pharmacist Overview" },
    { path: "/pharmacist/inventory", icon: <FaBox />, label: "Inventory & POS" },
    { path: "/pharmacist/alerts", icon: <FaBell />, label: "Stock Alerts" },
    { path: "/pharmacist/prescriptions", icon: <FaFilePrescription />, label: "Prescriptions" },
    { path: "/pharmacist/reports", icon: <FaChartBar />, label: "Sales Reports" },
  ],
  admin: [
    { path: "/admin-dashboard", icon: <FaDashcube />, label: "Admin Overview" },
    { path: "/admin/managestaff", icon: <FaUsers />, label: "Manage Staff" },
    { path: "/admin/manageinventory", icon: <FaTruckLoading />, label: "Manage Inventory" },
    { path: "/admin/managesupplier", icon: <FaIndustry />, label: "Manage Suppliers" },
    { path: "/admin/adminreports", icon: <FaBook />, label: "Reports" },
    { path: "/admin/systemlog", icon: <FaClipboardList />, label: "System Logs" },
  ],
  receptionist: [
    // define receptionist links here
  ],
  doctor: [
    // define doctor links here
  ],
  "delivery person": [
    // define delivery person links here
  ],
};

// ---------- Component ----------
const SideNavbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine role name (case‑insensitive)
  const role = user?.role?.roleName?.toLowerCase();
  const navItems = NAV_ITEMS[role] || [];

  // Helper for active styling
  const isActive = (path) =>
    location.pathname === path
      ? "bg-cyan-800 text-white font-semibold"
      : "text-gray-300 hover:bg-cyan-800 hover:text-white";

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload(); // ensures state is completely wiped
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-cyan-900 text-white flex flex-col shadow-xl z-40">
      {/* Header */}
      <div className="p-5 border-b border-cyan-800">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-7 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">
            Phillips Pharmacy
          </span>
        </Link>
        <p className="text-sm uppercase tracking-widest text-cyan-300 mt-1">
          {user?.role?.roleName} Panel
        </p>
        {user?.sname && (
          <p className="text-sm text-gray-300 mt-1">
            Welcome, <span className="font-medium">{user.sname}</span>
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${isActive(item.path)}`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cyan-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          <FaSignOutAlt className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;