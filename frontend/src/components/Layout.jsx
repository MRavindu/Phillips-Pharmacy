import React from "react";
import Sidebar from "./Sidebar"; // This is your old/common one
import PharmacistSidebar from "./layout/PharmacistSidebar"; // The new one
import AdminSidebar from "./layout/AdminSidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Check if the current URL starts with /pharmacist
  const isPharmacistPath = path.startsWith("/pharmacist");
  const isAdminPath = path.startsWith("/admin");

  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      {/* Dynamic Sidebar Selection */}
      {isPharmacistPath ? <PharmacistSidebar /> :
      isAdminPath ? <AdminSidebar /> :
      <Sidebar />}
      
      <main className="main-content" style={{ flex: 1, marginLeft: (isPharmacistPath || isAdminPath) ? "260px" : "0" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;