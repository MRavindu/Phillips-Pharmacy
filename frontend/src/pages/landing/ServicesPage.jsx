import React from "react";
import { FaPrescriptionBottleAlt, FaSyringe, FaTruck, FaNotesMedical } from "react-icons/fa";

const ServicesPage = () => {
  const services = [
    {
      title: "Prescription Refills",
      desc: "Easily upload your prescription and get your refills processed in minutes.",
      icon: <FaPrescriptionBottleAlt size={40} color="var(--primary-base)" />,
    },
    {
      title: "Vaccinations",
      desc: "Schedule your flu shots or travel vaccines with our certified pharmacists.",
      icon: <FaSyringe size={40} color="var(--primary-base)" />,
    },
    {
      title: "Home Delivery",
      desc: "Free island-wide delivery for orders over Rs. 5000. Fast and secure.",
      icon: <FaTruck size={40} color="var(--primary-base)" />,
    },
    {
      title: "Health Consultations",
      desc: "Private one-on-one consultations to discuss your medication and wellness.",
      icon: <FaNotesMedical size={40} color="var(--primary-base)" />,
    },
  ];

  return (
    <div style={{ padding: "80px 50px", backgroundColor: "#fdfdfd" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#2d3748" }}>Our Professional Services</h1>
        <p style={{ color: "#718096" }}>Comprehensive healthcare solutions tailored for you.</p>
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
            <h3 style={{ marginBottom: "15px", color: "#2d3748" }}>{service.title}</h3>
            <p style={{ color: "#4a5568", lineHeight: "1.6" }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;