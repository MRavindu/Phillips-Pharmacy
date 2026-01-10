import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children, user }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={user} />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
