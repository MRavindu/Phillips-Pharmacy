import React, { useEffect, useState } from "react";
import axios from "axios";

const AlertsPage = () => {
  const [expiring, setExpiring] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    // Fetch medicines expiring in 60 days
    const today = new Date().toISOString().split('T')[0];
    const next60 = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    axios.get(`http://localhost:8080/api/medicines/expiry?start=${today}&end=${next60}`)
      .then(res => setExpiring(res.data));

    axios.get(`http://localhost:8080/api/medicines/low-stock`)
      .then(res => setLowStock(res.data));
  }, []);

  return (
    <div className="dashboard-content">
      <section>
        <h2 style={{color: '#e53e3e'}}>⚠️ Expiry Alerts (Next 60 Days)</h2>
        <table className="custom-table">
          <thead><tr><th>Medicine</th><th>Expiry Date</th><th>Stock</th></tr></thead>
          <tbody>
            {expiring.map(m => (
              <tr key={m.id}><td>{m.name}</td><td>{m.expiryDate}</td><td>{m.stockQuantity}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{marginTop: '40px'}}>
        <h2 style={{color: '#dd6b20'}}>📉 Low Stock Tracker</h2>
        <div className="stats-container">
          {lowStock.map(m => (
            <div key={m.id} className="stat-card danger">
              <h4>{m.name}</h4>
              <p>Only {m.stockQuantity} left</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlertsPage;