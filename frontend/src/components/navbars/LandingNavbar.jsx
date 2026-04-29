import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LandingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-0">
      {/* Top border */}
      <div className="flex flex-row justify-between gap-auto px-5 py-2 bg-cyan-900 text-white text-xs">
        <p>+91 9664526886</p>
        <p>Free shipping on orders over $50!</p>
        <p>support@carepharma.com</p>
      </div>
      {/* Main Navigation Bar */}
      <nav>
        <div className="flex flex-row justify-between px-3">
          {/* Philips Pharmacy Logo and Home Page Link */}
          <div className="flex flex-row text-left justify-baseline py-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="Logo" className="h-10 ml-3 mr-2" />
            <span className="py-2 font-medium text-lg ">PHILLIPS PHARMACY</span>
          </div>
          {/* Navigation Links for other pages */}
          <div className="flex flex-row gap-6 text-lg font-medium justify-baseline">
            <button 
              onClick={() => navigate("/")} 
              className={`cursor-pointer px-3 hover:text-cyan-600 ${isActive("/") ? "text-cyan-600" : "text-neutral-500"}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/about")} 
              className={`cursor-pointer px-3 hover:text-cyan-600 ${isActive("/about") ? "text-cyan-600" : "text-neutral-500"}`}
            >
              About
            </button>
            <button 
              onClick={() => navigate("/services")} 
              className={`cursor-pointer px-3 hover:text-cyan-600 ${isActive("/services") ? "text-cyan-600" : "text-neutral-500"}`}
            >
              Services
            </button>
            <button 
              onClick={() => navigate("/contact")} 
              className={`cursor-pointer px-3 hover:text-cyan-600 ${isActive("/contact") ? "text-cyan-600" : "text-neutral-500"}`}
            >
              Contact
            </button>
          </div>
          {/* Login and Sign Up Buttons */}
          <div className="flex flex-row gap-2 text-lg font-medium justify-baseline py-4 cursor-pointer">
            <button 
              onClick={() => navigate("/login")} 
              className={`cursor-pointer bg-none border-cyan-600 px-3 hover:text-cyan-600 ${isActive("/login") ? "text-cyan-600" : "text-neutral-500"}`}
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")} 
              className={`cursor-pointer bg-none border-cyan-800 text-white rounded-xl px-3 hover:text-white hover:bg-cyan-600 ${isActive("/signup") ? "bg-cyan-600" : "bg-cyan-800"}`}
            >
              Join for Free!
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;