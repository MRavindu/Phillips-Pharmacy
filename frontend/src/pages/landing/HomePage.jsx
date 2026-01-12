import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(to right, #f0fdf4, #ffffff)', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', color: '#1a202c' }}>Your Health, <br/><span style={{ color: 'var(--primary-base)' }}>Our Priority.</span></h1>
          <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#4a5568' }}>Providing quality healthcare services and medicine delivery right to your doorstep.</p>
          <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1rem' }}>Order Medicines</button>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src="/images/hero-pharmacist.jpg" alt="Pharmacist" style={{ maxWidth: '100%' }} />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 50px', textAlign: 'center' }}>
        <h2>Why Choose Us?</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <div className="card">
            <h3>Fast Delivery</h3>
            <p>Get your prescriptions delivered within 2 hours.</p>
          </div>
          <div className="card">
            <h3>Expert Advice</h3>
            <p>Consult with our certified pharmacists anytime.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We are always here to help with your medical needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;