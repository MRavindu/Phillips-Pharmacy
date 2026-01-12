import React from "react";

const AboutPage = () => {
  return (
    <div>
      {/* Introduction Section */}
      <section style={{ padding: "80px 50px", textAlign: "center", backgroundColor: "#f8fafc" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#2d3748" }}>Dedicated to Your <span style={{ color: "var(--primary-base)" }}>Well-being</span></h1>
        <p style={{ maxWidth: "800px", margin: "20px auto", color: "#4a5568", lineHeight: "1.6" }}>
          Since 1998, Phillips Pharmacy has been a cornerstone of the community. We started with a simple mission: 
          to provide accessible, affordable, and high-quality healthcare products to every family.
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "60px 50px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px", padding: "30px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", borderRadius: "10px" }}>
          <h3 style={{ color: "var(--primary-base)" }}>Our Mission</h3>
          <p>To improve the lives of our customers by providing professional pharmaceutical care and personalized health solutions.</p>
        </div>
        <div style={{ flex: 1, minWidth: "300px", padding: "30px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", borderRadius: "10px" }}>
          <h3 style={{ color: "var(--primary-base)" }}>Our Vision</h3>
          <p>To be the most trusted healthcare provider in the region, known for innovation in pharmacy services and excellence in patient care.</p>
        </div>
      </section>

      {/* Meet Our Pharmacists */}
      <section style={{ padding: "80px 50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Meet Our Professional Team</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          
          {/* Member 1 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <img src="/images/pharmacist1.png" alt="Chief Pharmacist" style={{ width: "100%", borderRadius: "50%", marginBottom: "15px", border: "5px solid #e2e8f0" }} />
            <h4>Dr. Sarah Phillips</h4>
            <p style={{ color: "var(--primary-base)", fontWeight: "bold" }}>Chief Pharmacist</p>
            <p style={{ fontSize: "0.9rem", color: "#718096" }}>20+ years of experience in clinical pharmacy.</p>
          </div>

          {/* Member 2 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <img src="/images/pharmacist2.png" alt="Senior Pharmacist" style={{ width: "100%", borderRadius: "50%", marginBottom: "15px", border: "5px solid #e2e8f0" }} />
            <h4>Mr. Janindu Perera</h4>
            <p style={{ color: "var(--primary-base)", fontWeight: "bold" }}>Senior Pharmacist</p>
            <p style={{ fontSize: "0.9rem", color: "#718096" }}>Expert in medication management and safety.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;