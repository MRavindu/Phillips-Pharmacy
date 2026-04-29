import React, { useState } from "react";

const PrescriptionView = () => {
  const [prescriptions, setPrescriptions] = useState([
    { id: 101, user: "Janindu", date: "2026-01-13", img: "/mock/presc1.jpg", status: "Pending" }
  ]);

  return (
    <div className="dashboard-content">
      <h2>Prescription Requests</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {prescriptions.map(p => (
          <div key={p.id} className="card">
            <img src={p.img} alt="Prescription" style={{ width: '100%', borderRadius: '8px' }} />
            <div style={{ padding: '15px' }}>
              <h4>Patient: {p.user}</h4>
              <p>Received: {p.date}</p>
              <button className="btn-primary" style={{ width: '100%' }}>Create Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionView;