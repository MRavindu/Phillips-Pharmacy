import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="landing-navbar">
      <div className="nav-logo-container" onClick={() => navigate("/")}>
        <img src="/images/logo.png" alt="Logo" className="nav-logo-img" />
        <span className="nav-brand-name">PHILLIPS PHARMACY</span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link-item">Home</Link>
        <Link to="/about" className="nav-link-item">About</Link>
        <Link to="/services" className="nav-link-item">Services</Link>
        <Link to="/contact" className="nav-link-item">Contact</Link>
        
        <div className="navbuttons-div">
          <button onClick={() => navigate("/login")} className="navbtn navbtn-primary">Login</button>
          <button onClick={() => navigate("/signup")} className="navbtn navbtn-secondary">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;