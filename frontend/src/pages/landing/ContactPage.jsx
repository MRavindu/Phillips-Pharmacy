import React, { useState } from "react";

const ContactPage = () => {
  const [status, setStatus] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    setStatus(
      "Thank you! Your message has been sent. We will get back to you soon."
    );
  };

  return (
    <div style={{ padding: "80px 50px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "7%", color: 'var(--grey-shade)'}}>Contact <span style={{color: 'var(--primary-base)'}}>Us</span></h2>
      <div style={{ display: "flex", gap: "10%" }}>
        <div style={{ flex: 1 }}>
          <h5 style={{marginTop: '30px'}}>Get In <span style={{color: 'var(--secondary-shade)'}}>Touch</span></h5>
          <p style={{marginBottom: "5%"}}>
            Have a question about your prescription or our services? Drop us a
            message.
          </p>
          <form
            onSubmit={handleSendMessage}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <label>Name</label>
            <input
              type="text"
              placeholder="Alan Parish"
              className="form-control"
              required
            />
            </div>
            
            <div>
              <label>Email</label>
              <input
              type="email"
              placeholder="alan.parish@gmail.com"
              className="form-control"
              required
            />
            </div>
            
            <div>
              <label>How can we help you?</label>
              <textarea
              placeholder="May I know your work hours?"
              className="form-control"
              style={{ height: "150px" }}
              required
            ></textarea>
            </div>
            
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "200px" }}
            >
              Send Message
            </button>
          </form>
          {status && (
            <p style={{ marginTop: "20px", color: "green" }}>{status}</p>
          )}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#f7fafc",
            borderRadius: "10px",
          }}
        >
          <h5 style={{marginTop: '6%', marginBottom: '3%'}}>Our <span style={{color: 'var(--secondary-shade)'}}>Locations</span></h5>
          <p>
            <span style={{color: 'var(--tertiary-shade)'}}><strong>Main Branch:</strong></span> No 45, Galle Road, Colombo 03
          </p>
          <p style={{marginBottom: '5%'}}>
            <span style={{color: 'var(--tertiary-shade)'}}><strong>Opening Hours:</strong></span> 24/7 Service
          </p>
          <div style={{ width: "100%", height: "65%", borderRadius: "10px", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.715862281761!2d79.9168989758489!3d6.804378575641825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24ff780e34c45%3A0x3f29957eea6b86e4!2sMEDIHELP%20Hospitals%20-%20Piliyandala!5e0!3m2!1sen!2slk!4v1773914309497!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
