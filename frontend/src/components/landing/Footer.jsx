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
          <h3 style={{ color: "var(--primary-base)" }}>Phillips Pharmacy</h3>
          <p>Your trusted partner in healthcare. Providing quality medicines since 1998.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li><a href="/" className="nav-link-item" style={{color: '#cbd5e0'}}>Home</a></li>
            <li><a href="/about" className="nav-link-item" style={{color: '#cbd5e0'}}>About Us</a></li>
            <li><a href="/services" className="nav-link-item" style={{color: '#cbd5e0'}}>Services</a></li>
            <li><a href="#" className="nav-link-item" style={{color: '#cbd5e0'}}>Careers</a></li>
            <li><a href="/contact" className="nav-link-item" style={{color: '#cbd5e0'}}>Contact</a></li>
          </ul>
        </div>

        {/* Medical Portals Section */}
        <div className="footer-section" style={{textAlign: "right"}}>
          <h4>Channeling Partners</h4>
          <div style={{ marginTop: "15px" }}>
            <a href="https://www.doc.lk" target="_blank" rel="noreferrer" className="medical-link">
              <FaStethoscope /> Doc990
            </a>
            <a href="https://www.echannelling.com" target="_blank" rel="noreferrer" className="medical-link">
              <FaExternalLinkAlt /> eChanneling
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