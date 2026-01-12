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
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Contact Us</h2>
      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ flex: 1 }}>
          <h3>Get In Touch</h3>
          <p>
            Have a question about your prescription or our services? Drop us a
            message.
          </p>
          <form
            onSubmit={handleSendMessage}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="form-control"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="form-control"
              required
            />
            <textarea
              placeholder="How can we help you?"
              className="form-control"
              style={{ height: "150px" }}
              required
            ></textarea>
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
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h4>Our Pharmacy Locations</h4>
          <p>
            <strong>Main Branch:</strong> No 45, Galle Road, Colombo 03
          </p>
          <p>
            <strong>Opening Hours:</strong> 24/7 Service
          </p>
          <div
            style={{
              width: "100%",
              height: "250px",
              backgroundColor: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            [Map Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
