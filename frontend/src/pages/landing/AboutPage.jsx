import React from "react";

const AboutPage = () => {
  return (
    <div>
      {/* Introduction Section */}
      <section
        style={{
          padding: "3% 5%",
          textAlign: "center",
          backgroundColor: "var(--bg-light)",
          margin: "3% 0 0 0",
        }}
      >
        <h2 style={{ color: "#2d3748" }}>
          Dedicated to Your
          <br />
          <span style={{ color: "var(--primary-base)" }}>Well-being</span>
        </h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            color: "#4a5568",
            lineHeight: "1.6",
          }}
        >
          Since 1998, Phillips Pharmacy has been a cornerstone of the community.
          We started with a simple mission: to provide accessible, affordable,
          and high-quality healthcare products to every family.
        </p>
      </section>

      {/* Mission & Vision */}
      <section
        style={{
          padding: "60px 50px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          backgroundColor: "var(--primary-shade)",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "30px",
            backgroundColor: "var(--white)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h5 style={{ color: "var(--primary-shade)", margin: "0 0 3% 0" }}>
            Our <span style={{color: 'var(--tertiary-base)'}}>Mission</span>
          </h5>
          <p>
            To improve the healthy lifestyles of Sri Lankan Citizen by providing
            professional pharmaceutical care and personalized health solutions.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "30px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h5 style={{ color: "var(--primary-shade)", margin: "0 0 3% 0" }}>
            Our <span style={{color: 'var(--tertiary-base)'}}>Vision</span>
          </h5>
          <p>
            To be the most trusted healthcare provider in the region, Highly
            Qualified Pharmacy Service known for innovation and excellence in
            Patient Care.
          </p>
        </div>
      </section>

      {/* Meet Our Pharmacists */}
      <section style={{ padding: "80px 50px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "4%" }}>
          Meet Our <span style={{color: 'var(--secondary-base)'}}>Professional Team</span>
        </h3>
        
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "5%"}}>
          {/* Member 1 */}
          <div style={{ textAlign: "center", width: "400px" }}>
            <div style={{ width: "250px", height: "250px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: "5px solid var(--secondary-base)", }}>
              <img src="/images/pharmacist1.jpeg" alt="Chief Pharmacist" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", }} />
            </div>
            <h6 style={{ color: "var(--primary-base)"}}>James Phillips</h6>
            <p style={{ color: "var(--tertiary-base)", fontWeight: "bold" }}>
              Chief Pharmacist
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--grey-base)" }}>
              20+ years of experience in clinical pharmacy.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "5%", flexWrap: "wrap" }}>
          {/* Member 2 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: "5px solid var(--secondary-base)", }}>
              <img src="/images/pharmacist2.jpeg" alt="Chief Pharmacist" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", }} />
            </div>
            <h6 style={{ color: "var(--primary-base)"}}>Reshan Kooray</h6>
            <p style={{ color: "var(--tertiary-base)", fontWeight: "bold" }}>
              Senior Pharmacist
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--grey-base)" }}>
              Expert in medication management and safety.
            </p>
          </div>

          {/* Member 3 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: "5px solid var(--secondary-base)", }}>
              <img src="/images/pharmacist3.jpeg" alt="Chief Pharmacist" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", }} />
            </div>
            <h6 style={{ color: "var(--primary-base)"}}>Nelumi Perera</h6>
            <p style={{ color: "var(--tertiary-base)", fontWeight: "bold" }}>
              Senior Pharmacist
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--grey-base)" }}>
              Expert in medication management and safety.
            </p>
          </div>

          {/* Member 4 */}
          <div style={{ textAlign: "center", width: "250px" }}>
            <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: "5px solid var(--secondary-base)", }}>
              <img src="/images/pharmacist4.jpeg" alt="Chief Pharmacist" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", }} />
            </div>
            <h6 style={{ color: "var(--primary-base)"}}>Alan Fernando</h6>
            <p style={{ color: "var(--tertiary-base)", fontWeight: "bold" }}>
              Senior Pharmacist
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--grey-base)" }}>
              Expert in medication management and safety.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
