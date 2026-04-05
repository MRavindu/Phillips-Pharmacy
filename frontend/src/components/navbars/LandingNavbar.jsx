import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-0">
      {/* Top border */}
      <div className="flex flex-row justify-between gap-auto px-5 py-2 bg-cyan-900 text-white">
        <p>+91 9664526886</p>
        <p>Free shipping on orders over $50!</p>
        <p>support@carepharma.com</p>
      </div>
      {/* Main Navigation Bar */}
      <nav>
        <div className="flex flex-row justify-between h-4rem px-3">
          {/* Philips Pharmacy Logo and Home Page Link */}
          <div className="flex flex-row text-left justify-baseline py-4 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="Logo" className="h-10 ml-3 mr-2" />
            <span className="py-2 font-medium text-lg">PHILLIPS PHARMACY</span>
          </div>
        {/* Navigation Links for other pages */}
          <div className="flex flex-row gap-6 text-lg font-medium justify-baseline">
            <button to="/" className="cursor-pointer">Home</button>
            <button to="/about" className="cursor-pointer">About</button>
            <button to="/services" className="cursor-pointer">Services</button>
            <button to="/contact" className="cursor-pointer">Contact</button>
          </div>
          {/* Login and Sign Up Buttons */}
          <div className="flex flex-row gap-2 text-lg font-medium justify-baseline py-4 cursor-pointer">
          <button onClick={() => navigate("/login")} className="cursor-pointer bg-none border-2 border-cyan-800 text-gray-500 rounded-xl px-3 hover:bg-cyan-800 hover:text-white">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="cursor-pointer bg-none border-2 border-cyan-800 text-white bg-cyan-800 rounded-xl px-3 hover:text-cyan-800 hover:bg-white">
            Join for Free!
          </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;