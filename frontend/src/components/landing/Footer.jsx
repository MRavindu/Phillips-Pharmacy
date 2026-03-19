import React from "react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaExternalLinkAlt, 
  FaStethoscope 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section" style={{ minWidth: "700px" }}>
          <div className="foot-logo-container" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="Logo" className="foot-logo-img" />
            <h4 style={{ color: "var(--white)" }}>Phillips Pharmacy</h4>
          </div>
          <p style={{margin: '15px 0px'}}>Your trusted partner in healthcare.<br />Providing quality medicines since 1998.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h5 style={{ color: 'var(--secondary-tint)', margin: '15px', textAlign: 'center'}}>Quick Links</h5>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li><a href="/" className="nav-link-item">Home</a></li>
            <li><a href="/about" className="nav-link-item">About Us</a></li>
            <li><a href="/services" className="nav-link-item">Services</a></li>
            <li><a href="#" className="nav-link-item">Careers</a></li>
            <li><a href="/contact" className="nav-link-item">Contact</a></li>
          </ul>
        </div>

        {/* Medical Portals Section */}
        <div className="footer-section" style={{textAlign: "right"}}>
          <h5 style={{ color: 'var(--secondary-tint)', margin: '15px 0px'}}>e Channeling</h5>
          <div style={{ marginTop: "15px"}}>
            <a href="#"></a>
            <a href="https://www.doc.lk" target="_blank" rel="noreferrer" className="medical-link">
              Doc990 <FaStethoscope />
            </a>
            <a href="https://www.echannelling.com" target="_blank" rel="noreferrer" className="medical-link">
              eChanneling <FaExternalLinkAlt />
            </a>
          </div>
          {/* Social Icons */}
          <div className="footer-social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><FaYoutube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Phillips Pharmacy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;