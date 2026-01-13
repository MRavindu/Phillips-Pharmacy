import React, { useState } from "react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sales, setSales] = useState([]);

  const fetchReports = () => {
    // Logic to call /api/reports/sales?start=...&end=...
  };

  const setPresetRange = (type) => {
    const end = new Date();
    let start = new Date();

    if (type === "daily") start.setHours(0, 0, 0, 0);
    if (type === "weekly") start.setDate(end.getDate() - 7);
    if (type === "monthly") start.setMonth(end.getMonth() - 1);
    if (type === "yearly") start.setFullYear(end.getFullYear() - 1);

    // Format to YYYY-MM-DD for the input fields
    const formatDate = (d) => d.toISOString().split("T")[0];
    setDateRange({ start: formatDate(start), end: formatDate(end) });
  };

  const calculateTotalRevenue = () =>
    sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  return (
    <div className="dashboard-content">
      <h2>Financial Reports</h2>
      <div
        className="card"
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <div>
          <label>Start Date</label>
          <input
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </div>
        // Use it in your JSX
        <div className="btn-group">
          <button onClick={() => setPresetRange("daily")}>Today</button>
          <button onClick={() => setPresetRange("weekly")}>This Week</button>
          <button onClick={() => setPresetRange("monthly")}>This Month</button>
        </div>
        <button className="btn-primary" onClick={fetchReports}>
          Generate Report
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card info">
          <h3>Rs. {calculateTotalRevenue().toFixed(2)}</h3>
          <p>Total Revenue for Selected Period</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;