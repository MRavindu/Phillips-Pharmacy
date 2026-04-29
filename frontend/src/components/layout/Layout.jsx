import React from "react";
import SideNavbar from "../navbars/SideNavbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Get user from localStorage (or your global state/context)
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Determine if sidebar should be shown (staff/admin routes)
  const isDashboardRoute = 
    location.pathname.startsWith("/pharmacist") || 
    location.pathname.startsWith("/admin") || 
    location.pathname.startsWith("/receptionist") || 
    location.pathname.startsWith("/doctor") || 
    location.pathname.startsWith("/delivery");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Show sidebar only on dashboard routes and when user exists */}
      {isDashboardRoute && user && <SideNavbar user={user} />}
      
      {/* Main content shifts right when sidebar is present */}
      <main className={`flex-1 ${isDashboardRoute && user ? "ml-64" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;