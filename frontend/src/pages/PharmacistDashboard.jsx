import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as medService from "../services/medicineService";
import { FaBox, FaExclamationTriangle, FaRupeeSign, FaHistory, FaPlusCircle } from "react-icons/fa";

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockCount: 0,
    expiringCount: 0,
    todaySales: 0
  });

  useEffect(() => {
    // We will simulate the data for now, but you can link your API here
    const fetchStats = async () => {
      const allMeds = await medService.getAllMedicines();
      const lowStock = allMeds.filter(m => m.quantity < 10);
      
      setStats({
        totalItems: allMeds.length,
        lowStockCount: lowStock.length,
        expiringCount: 5, // Placeholder for expiring logic
        todaySales: 12500 // Placeholder for sales logic
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-content" style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>Pharmacist Overview</h2>

      {/* 1. STATS CARDS */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card" style={cardStyle("#e3f2fd", "#1976d2")}>
          <FaBox size={30} />
          <div>
            <h3>{stats.totalItems}</h3>
            <p>Total Medicines</p>
          </div>
        </div>

        <div className="stat-card" style={cardStyle("#fff3e0", "#f57c00")}>
          <FaExclamationTriangle size={30} />
          <div>
            <h3>{stats.lowStockCount}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>

        <div className="stat-card" style={cardStyle("#fbe9e7", "#d84315")}>
          <FaExclamationTriangle size={30} />
          <div>
            <h3>{stats.expiringCount}</h3>
            <p>Near Expiry</p>
          </div>
        </div>

        <div className="stat-card" style={cardStyle("#e8f5e9", "#2e7d32")}>
          <FaRupeeSign size={30} />
          <div>
            <h3>Rs. {stats.todaySales}</h3>
            <p>Today's Revenue</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '25px' }}>
        {/* 2. QUICK ACTIONS */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4>Quick Actions</h4>
          <hr />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <button className="btn-primary" onClick={() => navigate("/pharmacist/inventory")}>
               <FaPlusCircle /> Go to Inventory / POS
            </button>
            <button className="btn-secondary" onClick={() => navigate("/pharmacist/reports")}>
               <FaHistory /> View Sales Reports
            </button>
          </div>
        </div>

        {/* 3. RECENT ACTIVITY LOG */}
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4>Recent Stock Alerts</h4>
          <hr />
          <table className="custom-table" style={{ marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* This would be a slice of your low-stock data */}
              <tr>
                <td>Panadol 500mg</td>
                <td><span className="badge danger">Critical (2 left)</span></td>
                <td><button className="btn-small">Restock</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Simple helper for card styling
const cardStyle = (bg, color) => ({
  backgroundColor: bg,
  color: color,
  padding: '20px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
});

export default PharmacistDashboard;