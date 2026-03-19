import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(to bottom, var(--primary-base), var(--bg-light))', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <img src="/images/logo.png" alt="Logo" style={{margin: "0 2% 0 0", height: "70px"}}/>
          <span><h4 style={{ color: 'var(--grey-shade)' }}>Your Health,</h4></span> <br/>
          <h1><span style={{ color: 'var(--primary-shade)' }}>Our Priority.</span></h1>
          <p style={{margin: '20px 0', color: '#4a5568' }}>Providing quality healthcare services and medicine delivery right to your doorstep.</p>
          <button className="btn-tertiary" style={{ padding: '15px 30px', fontSi3ze: '1rem'}}>Order Medicines</button>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src="/images/hero-pharmacist.jpg" alt="Pharmacist" style={{ maxWidth: '100%' }} />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 50px', textAlign: 'center', backgroundColor: 'var(--bg-light)'}}>
        <h2 style={{color: '--grey-shade'}}>Why <span style={{color: 'var(--primary-base)'}}>Choose Us?</span></h2>
        <div style={{ display: 'flex', gap: '6%', marginTop: '7%', justifyContent: 'center'}}>
          <div className="card">
            <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>Fast Delivery</h4>
            <p style={{margin: '15px'}}>Get your prescriptions delivered<br />within 2 hours.</p>
          </div>
          <div className="card">
            <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>Expert Advice</h4>
            <p style={{margin: '15px'}}>Consult with our certified<br />pharmacists anytime.</p>
          </div>
          <div className="card">
            <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>24/7 Support</h4>
            <p style={{margin: '15px'}}>We are always here<br />to help with your medical needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;