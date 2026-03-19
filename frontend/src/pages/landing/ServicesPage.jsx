import React from "react";
import { FaFileMedical, FaSyringe, FaTruckMoving, FaChalkboardTeacher, FaWifi, FaGift, FaTruckLoading } from "react-icons/fa";

const ServicesPage = () => {
  const services = [
    {
      title: "Prescription Refills",
      desc: "Bring the prescription your doctor provided, and get your refills processed in minutes.",
      icon: <FaFileMedical size={40} color="var(--tertiary-base)" />,
    },
    {
      title: "Vaccinations",
      desc: "Schedule your flu shots or travel vaccines with our certified pharmacists.",
      icon: <FaSyringe size={40} color="var(--tertiary-base)" />,
    },
    {
      title: "Health Consultations",
      desc: "Private one-on-one consultations to discuss your medication and wellness.",
      icon: <FaChalkboardTeacher size={40} color="var(--tertiary-base)" />,
    },
    {
      title: "Online Orders",
      desc: "Easily upload your prescription and get your refills processed in minutes.",
      icon: <FaWifi size={40} color="var(--tertiary-base)" />,
    },
    {
      title: "Home Delivery",
      desc: "Now we offer island-wide Free delivery for orders above Rs. 5000. Fast and secure.",
      icon: <FaTruckMoving size={40} color="var(--tertiary-base)" />,
    },
    {
      title: "Loyalty Offers",
      desc: "Become one of our loyalty customer community and get opportunity to earn promotianal and Seasonal loyalty rewards.",
      icon: <FaGift size={40} color="var(--tertiary-base)" />,
    },
  ];

  return (
    <div style={{ padding: "80px 50px", background: "linear-gradient(to top, var(--primary-shade), var(--bg-light))" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{color: "#2d3748", margin: '5% 0 0 0'}}>Our Professional <span style={{color: 'var(--primary-base)'}}>Services</span></h2>
        <p style={{ color: "#718096", margin: '1% 0 5% 0'}}>Comprehensive healthcare solutions tailored for you.</p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {services.map((service, index) => (
          <div key={index} style={{ 
            padding: "40px", 
            backgroundColor: "#fff", 
            borderRadius: "15px", 
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ marginBottom: "20px" }}>{service.icon}</div>
            <h6 style={{ marginBottom: "15px", color: "var(--primary-shade)" }}>{service.title}</h6>
            <p style={{ color: "#4a5568", lineHeight: "1.6" }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;