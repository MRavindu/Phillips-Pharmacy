import React from "react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaExternalLinkAlt, 
  FaStethoscope, 
  FaPhone,
  FaVoicemail,
  FaMailBulk,
  FaUserShield,
  FaShieldAlt,
  FaShieldVirus
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-25 flex flex-col">

      <div className="flex gap-10 justify-between mb-8">
        <div className="flex flex-col gap-1 w-700">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <img src="/images/logo.png" alt="Logo" className="h-10 inline-block mr-2" />
              <p className="font-medium text-3xl">PHILLIPS PHARMACY</p>
            </div>
            <p>
              Your trusted online pharmacy providing authentic medicines, health supplements, and medical equipment with doorstep delivery. Licensed and regulated for your safety.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone />
            <p>+91 9664526886</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMailBulk />
            <p>support@carepharma.com</p>
          </div>
          {/* Social Media icons and links */}
          <div className="flex gap-8 mt-8">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xl"><FaYoutube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xl"><FaLinkedin /></a>
          </div>
       </div>

        <div className="flex flex-col w-200 gap-3 text-left">
          <h5 className="font-medium text-xl">Quick Links</h5>
          <ul>
            <li><a href="/" className="nav-link-item">Home</a></li>
            <li><a href="/about" className="nav-link-item">About Us</a></li>
            <li><a href="/contact" className="nav-link-item">Contact</a></li>
            <li><a href="/services" className="nav-link-item">Services</a></li>
            {/* <li><a href="/faqs" className="nav-link-item">FAQs</a></li>
            <li><a href="/careers" className="nav-link-item">Careers</a></li> */}
          </ul>
        </div>

        <div className="flex flex-col w-200 gap-3 text-left">
          <h5 className="font-medium text-xl">Categories</h5>
          <ul>
            <li><a href="/" className="nav-link-item">Medicines</a></li>
            <li>Vitamins</li>
            <li>Medical Equipments</li>
            <li>First Aid</li>
            <li>Personal Care</li>
            <li>Baby Care</li>
          </ul>
        </div>

        <div className="flex flex-col w-200 gap-3 text-left">
          <h5 className="font-medium text-xl">Legal</h5>
          <ul>
            <li><a href="/" className="nav-link-item">Privacy Policy</a></li>
            <li>Terms of Service</li>
            <li>Prescription Policy</li>
            <li>Refund Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex justify-between gap-20">
          <div className="flex justify-between items-center gap-2">
            <FaShieldAlt className="text-green-400" />
            <p>FDA Approved</p>
          </div>

          <div className="flex justify-between items-center gap-2">
            <FaShieldAlt className="text-green-400" />
            <p>SSL Secured</p>
          </div>

          <div className="flex justify-between items-center gap-2">
            <FaShieldAlt className="text-green-400" />
            <p>HIPAA Compliant</p>
          </div>
        </div>

        <div>
          <p>License No: CP-2024-001234 | Registered Pharmacy</p>
        </div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
      <div className="container">
        <p className="text-center m-4">
          © 2023 Phillips Pharmacy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


    // <footer className="site-footer">
    //   <div className="footer-content">
    //     {/* About Section */}
    //     <div className="footer-section" style={{ minWidth: "700px" }}>
    //       <div className="foot-logo-container" onClick={() => navigate("/")}>
    //         <img src="/images/logo.png" alt="Logo" className="foot-logo-img" />
    //         <h4 style={{ color: "var(--white)" }}>Phillips Pharmacy</h4>
    //       </div>
    //       <p style={{margin: '15px 0px'}}>Your trusted partner in healthcare.<br />Providing quality medicines since 1998.</p>
    //     </div>

    //     {/* Quick Links */}
    //     <div className="footer-section">
    //       <h5 style={{ color: 'var(--secondary-tint)', margin: '15px', textAlign: 'center'}}>Quick Links</h5>
    //       <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
    //         <li><a href="/" className="nav-link-item">Home</a></li>
    //         <li><a href="/about" className="nav-link-item">About Us</a></li>
    //         <li><a href="/services" className="nav-link-item">Services</a></li>
    //         <li><a href="#" className="nav-link-item">Careers</a></li>
    //         <li><a href="/contact" className="nav-link-item">Contact</a></li>
    //       </ul>
    //     </div>

    //     {/* Medical Portals Section */}
    //     <div className="footer-section" style={{textAlign: "right"}}>
    //       <h5 style={{ color: 'var(--secondary-tint)', margin: '15px 0px'}}>e Channeling</h5>
    //       <div style={{ marginTop: "15px"}}>
    //         <a href="#"></a>
    //         <a href="https://www.doc.lk" target="_blank" rel="noreferrer" className="medical-link">
    //           Doc990 <FaStethoscope />
    //         </a>
    //         <a href="https://www.echannelling.com" target="_blank" rel="noreferrer" className="medical-link">
    //           eChanneling <FaExternalLinkAlt />
    //         </a>
    //       </div>
    //       {/* Social Icons */}
    //       <div className="footer-social-links">
    //         <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
    //         <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
    //         <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><FaYoutube /></a>
    //         <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin /></a>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="footer-bottom">
    //     © 2026 Phillips Pharmacy. All rights reserved.
    //   </div>
    // </footer>