import React from "react";
import Sidebar from "./Sidebar"; // This is your old/common one
import PharmacistSidebar from "./layout/PharmacistSidebar"; // The new one
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Check if the current URL starts with /pharmacist
  const isPharmacistPath = location.pathname.startsWith("/pharmacist");

  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      {/* Dynamic Sidebar Selection */}
      {isPharmacistPath ? <PharmacistSidebar /> : <Sidebar />}
      
      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;