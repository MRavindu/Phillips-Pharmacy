import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { logout } from "../api/authService";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Force redirect after logout
    window.location.reload(); // Ensures state is wiped clean
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#2c3e50",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h3>Phillips Pharmacy</h3>
      <p>
        Welcome, <b>{user?.sname}</b>
      </p>
      <p style={{ fontSize: "0.8rem", color: "#bdc3c7" }}>
        Role: {user?.role?.roleName}
      </p>{" "}
      {/* Added for clarity */}
      <hr />
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        {/* FIXED: Admin Only Menus */}
        {user?.role?.roleName === "admin" && (
          <>
            <Link
              to="/manage-staff"
              style={{ color: "white", textDecoration: "none" }}
            >
              Manage Staff
            </Link>
            <Link
              to="/inventory"
              style={{ color: "white", textDecoration: "none" }}
            >
              Inventory Management
            </Link>
          </>
        )}

        {/* FIXED: Receptionist Only Menus */}
        {user?.role?.roleName === "receptionist" && (
          <>
            <Link
              to="/billing"
              style={{ color: "white", textDecoration: "none" }}
            >
              Create Bill
            </Link>
            <Link
              to="/patients"
              style={{ color: "white", textDecoration: "none" }}
            >
              Patient Records
            </Link>
          </>
        )}

        {/* FIXED: Delivery Person Only Menus */}
        {user?.role?.roleName === "delivery person" && (
          <>
            <Link
              to="/delivery-orders"
              style={{ color: "white", textDecoration: "none" }}
            >
              Delivery Orders
            </Link>
            <Link
              to="/patients"
              style={{ color: "white", textDecoration: "none" }}
            >
              Patient Records
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
