import React from "react";

const PharmacistDashboard = () => {
  // ---------- Sample data (replace with API calls) ----------
  const salesData = {
    totalSales: 832,
    revenue: 18300,
    profit: 1000,
    cost: 17300,
  };

  const purchaseData = {
    purchase: 17573,
    cost: 12000,
    cancel: 1200,
    return: 1742,
  };

  const inventoryData = {
    quantityInHand: 868,
    toBeReceived: 200,
  };

  const productData = {
    suppliers: 31,
    categories: 21,
  };

  // Monthly labels
  const salesChartMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Static dummy data for Sales & Purchase chart (bar chart)
  const salesChartData = [
    { purchased: 25000, sold: 22000 },
    { purchased: 28000, sold: 24000 },
    { purchased: 32000, sold: 29000 },
    { purchased: 35000, sold: 31000 },
    { purchased: 40000, sold: 38000 },
    { purchased: 38000, sold: 36000 },
    { purchased: 42000, sold: 39000 },
    { purchased: 45000, sold: 41000 },
    { purchased: 38000, sold: 35000 },
    { purchased: 34000, sold: 32000 },
    { purchased: 30000, sold: 27000 },
    { purchased: 26000, sold: 23000 },
  ];

  // Static dummy data for Order Summary (line chart)
  const orderChartData = [
    { ordered: 1500, delivered: 1400 },
    { ordered: 1800, delivered: 1700 },
    { ordered: 2200, delivered: 2000 },
    { ordered: 2500, delivered: 2300 },
    { ordered: 2800, delivered: 2600 },
    { ordered: 3000, delivered: 2900 },
    { ordered: 3200, delivered: 3100 },
    { ordered: 3100, delivered: 3000 },
    { ordered: 2700, delivered: 2500 },
    { ordered: 2400, delivered: 2200 },
    { ordered: 2000, delivered: 1800 },
    { ordered: 1600, delivered: 1400 },
  ];

  // Top Selling Stock table data
  const topSellingStock = [
    { name: "Surf Excel", soldQty: 30, remainingQty: 12, price: "Rs.100" },
    { name: "Rin", soldQty: 21, remainingQty: 15, price: "Rs.207" },
    { name: "Parle G", soldQty: 19, remainingQty: 17, price: "Rs.105" },
  ];

  // Low Quantity Stock table data
  const lowStock = [
    { name: "Tala Salt", price: "Rs.100", remainingQty: "15 Packet" },
    { name: "Lays", price: "Rs.100", remainingQty: "15 Packet" },
  ];

  // ---------- Card component for reuse ----------
  const StatCard = ({ title, value, bgColor }) => (
    <div className={`${bgColor} p-5 rounded-xl shadow-sm`}>
      <p className="text-sm font-medium text-white/80">{title}</p>
      <h3 className="text-xl font-bold text-white mt-1">{value}</h3>
    </div>
  );

  // ---------- Bar Chart component ----------
  const BarChart = ({ data, months, legend }) => {
    const allValues = data.flatMap(d => [d[legend[0].key], d[legend[1].key]]);
    const maxValue = Math.max(...allValues);

    return (
      <div>
        <div className="flex gap-4 mb-4">
          {legend.map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-xs">
              <span className={`w-3 h-3 rounded-sm ${item.color}`}></span>
              <span className="text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between h-48 gap-1">
          {months.map((month, idx) => (
            <div key={month} className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
              <div className="w-full flex gap-[2px] h-full items-end">
                {legend.map((item) => {
                  const value = data[idx][item.key];
                  const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
                  return (
                    <div
                      key={item.key}
                      className={`${item.color} flex-1 rounded-t-sm transition-all duration-300`}
                      style={{ 
                        height: `${heightPercent}%`,
                        minHeight: value > 0 ? '4px' : '0px'
                      }}
                      title={`${item.label}: ${value.toLocaleString()}`}
                    ></div>
                  );
                })}
              </div>
              <span className="text-xs text-gray-500 mt-1">{month}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------- SVG Line Chart component ----------
  const LineChart = ({ data, months, lines, yAxisLabel }) => {
    // Chart dimensions
    const width = 600;
    const height = 220;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value across all lines
    const allValues = data.flatMap(d => lines.map(line => d[line.key]));
    const maxValue = Math.max(...allValues);
    const yMax = Math.ceil(maxValue / 500) * 500; // Round up to nearest 500

    // Y-axis ticks
    const yTicks = 5;
    const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => 
      Math.round((yMax / yTicks) * i)
    );

    // Calculate point positions
    const getX = (index) => {
      return (index / (months.length - 1)) * chartWidth + padding.left;
    };

    const getY = (value) => {
      return chartHeight - (value / yMax) * chartHeight + padding.top;
    };

    // Create line paths
    const createLinePath = (lineKey) => {
      return data.map((d, i) => {
        const x = getX(i);
        const y = getY(d[lineKey]);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
    };

    return (
      <div>
        {/* Legend */}
        <div className="flex gap-4 mb-4">
          {lines.map((line) => (
            <div key={line.key} className="flex items-center gap-2 text-xs">
              <span className={`w-4 h-[2px] ${line.color}`}></span>
              <span className="text-gray-600">{line.label}</span>
            </div>
          ))}
        </div>

        {/* SVG Chart */}
        <div className="w-full overflow-x-auto">
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full"
            style={{ minWidth: '500px' }}
          >
            {/* Y-axis grid lines and labels */}
            {yTickValues.map((value, i) => {
              const y = getY(value);
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[10px] fill-gray-400"
                  >
                    {value.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Line paths */}
            {lines.map((line) => (
              <g key={line.key}>
                {/* Background line (wider, transparent for better hover) */}
                <path
                  d={createLinePath(line.key)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="8"
                />
                {/* Visible line */}
                <path
                  d={createLinePath(line.key)}
                  fill="none"
                  stroke={line.stroke}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={getX(i)}
                    cy={getY(d[line.key])}
                    r="3"
                    fill="white"
                    stroke={line.stroke}
                    strokeWidth="2"
                  />
                ))}
              </g>
            ))}

            {/* X-axis labels */}
            {months.map((month, i) => (
              <text
                key={month}
                x={getX(i)}
                y={height - 5}
                textAnchor="middle"
                className="text-[10px] fill-gray-400"
              >
                {month}
              </text>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Row 1: Sales Overview & Purchase Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Sales Overview</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard title="Sales" value={salesData.totalSales} bgColor="bg-cyan-500" />
            <StatCard title="Revenue" value={`Rs.${salesData.revenue.toLocaleString()}`} bgColor="bg-green-500" />
            <StatCard title="Profit" value={`Rs.${salesData.profit.toLocaleString()}`} bgColor="bg-blue-500" />
            <StatCard title="Cost" value={`Rs.${salesData.cost.toLocaleString()}`} bgColor="bg-amber-500" />
          </div>
        </div>

        {/* Purchase Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Purchase Overview</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard title="Purchase" value={`Rs.${purchaseData.purchase.toLocaleString()}`} bgColor="bg-cyan-500" />
            <StatCard title="Cost" value={`Rs.${purchaseData.cost.toLocaleString()}`} bgColor="bg-green-500" />
            <StatCard title="Cancel" value={`Rs.${purchaseData.cancel.toLocaleString()}`} bgColor="bg-blue-500" />
            <StatCard title="Return" value={`Rs.${purchaseData.return.toLocaleString()}`} bgColor="bg-amber-500" />
          </div>
        </div>
      </div>

      {/* Row 2: Inventory Summary & Product Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Inventory Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <StatCard title="Quantity in Hand" value={inventoryData.quantityInHand} bgColor="bg-cyan-500" />
            <StatCard title="To be received" value={`Rs.${inventoryData.toBeReceived}`} bgColor="bg-teal-500" />
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Product Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <StatCard title="Number of Suppliers" value={productData.suppliers} bgColor="bg-amber-500" />
            <StatCard title="Number of Categories" value={productData.categories} bgColor="bg-rose-500" />
          </div>
        </div>
      </div>

      {/* Row 3: Sales & Purchase Chart + Order Summary Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Sales & Purchase</h4>
          <BarChart
            data={salesChartData}
            months={salesChartMonths}
            legend={[
              { key: "purchased", label: "Purchased", color: "bg-cyan-500" },
              { key: "sold", label: "Sold", color: "bg-amber-500" },
            ]}
          />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Order Summary</h4>
          <LineChart
            data={orderChartData}
            months={salesChartMonths}
            lines={[
              { key: "ordered", label: "Ordered", color: "bg-cyan-500", stroke: "#06b6d4" },
              { key: "delivered", label: "Delivered", color: "bg-amber-500", stroke: "#f59e0b" },
            ]}
            yAxisLabel="Number of Orders"
          />
        </div>
      </div>

      {/* Row 4: Top Selling Stock & Low Quantity Stock Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Stock */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Top Selling Stock</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Sold Qty</th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Remaining Qty</th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody>
                {topSellingStock.map((item) => (
                  <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">{item.name}</td>
                    <td className="py-3 px-3">{item.soldQty}</td>
                    <td className="py-3 px-3">{item.remainingQty}</td>
                    <td className="py-3 px-3">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Quantity Stock */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-4">Low Quantity Stock</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Price</th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">Remaining Qty</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((item) => (
                  <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">{item.name}</td>
                    <td className="py-3 px-3">{item.price}</td>
                    <td className="py-3 px-3">{item.remainingQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;





















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as medService from "../../services/medicineService";
// import {
//   FaBox,
//   FaExclamationTriangle,
//   FaRupeeSign,
//   FaHistory,
//   FaPlusCircle,
// } from "react-icons/fa";
// // ❌ Remove this import - Layout handles the sidebar now
// // import SideNavbar from "../../components/navbars/SideNavbar";

// const PharmacistDashboard = () => {
//   const navigate = useNavigate();
//   // ❌ Remove this - Layout already gets the user
//   // const user = JSON.parse(localStorage.getItem("user"));
  
//   const [stats, setStats] = useState({
//     totalItems: 0,
//     lowStockCount: 0,
//     expiringCount: 0,
//     todaySales: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const allMeds = await medService.getAllMedicines();
//       const lowStock = allMeds.filter((m) => m.quantity < 10);

//       setStats({
//         totalItems: allMeds.length,
//         lowStockCount: lowStock.length,
//         expiringCount: 5,
//         todaySales: 12500,
//       });
//     };
//     fetchStats();
//   }, []);

//   const statCards = [
//     {
//       label: "Total Medicines",
//       value: stats.totalItems,
//       icon: <FaBox size={30} />,
//       bg: "bg-blue-50",
//       text: "text-blue-700",
//     },
//     {
//       label: "Low Stock Items",
//       value: stats.lowStockCount,
//       icon: <FaExclamationTriangle size={30} />,
//       bg: "bg-orange-50",
//       text: "text-orange-700",
//     },
//     {
//       label: "Near Expiry",
//       value: stats.expiringCount,
//       icon: <FaExclamationTriangle size={30} />,
//       bg: "bg-red-50",
//       text: "text-red-700",
//     },
//     {
//       label: "Today's Revenue",
//       value: `Rs. ${stats.todaySales}`,
//       icon: <FaRupeeSign size={30} />,
//       bg: "bg-green-50",
//       text: "text-green-700",
//     },
//   ];

//   return (
//     // ✅ Remove the outer <div className="flex"> and <SideNavbar />
//     // Start directly with the main content
//     <div className="p-8">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//         Pharmacist Overview
//       </h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {statCards.map((card) => (
//           <div
//             key={card.label}
//             className={`${card.bg} ${card.text} p-5 rounded-xl flex items-center gap-4 shadow-sm`}
//           >
//             {card.icon}
//             <div>
//               <h3 className="text-xl font-bold">{card.value}</h3>
//               <p className="text-sm font-medium opacity-80">{card.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Panels */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Quick Actions */}
//         <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//           <h4 className="text-lg font-semibold text-gray-700 mb-3">
//             Quick Actions
//           </h4>
//           <hr className="mb-4" />
//           <div className="flex flex-col gap-3">
//             <button
//               onClick={() => navigate("/pharmacist/inventory")}
//               className="flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
//             >
//               <FaPlusCircle />
//               Go to Inventory / POS
//             </button>
//             <button
//               onClick={() => navigate("/pharmacist/reports")}
//               className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300 border border-gray-200"
//             >
//               <FaHistory />
//               View Sales Reports
//             </button>
//           </div>
//         </div>

//         {/* Recent Stock Alerts */}
//         <div className="flex-[2] bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//           <h4 className="text-lg font-semibold text-gray-700 mb-3">
//             Recent Stock Alerts
//           </h4>
//           <hr className="mb-4" />
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="py-2 px-4 text-sm font-medium text-gray-600">
//                     Medicine
//                   </th>
//                   <th className="py-2 px-4 text-sm font-medium text-gray-600">
//                     Status
//                   </th>
//                   <th className="py-2 px-4 text-sm font-medium text-gray-600">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-gray-800">Panadol 500mg</td>
//                   <td className="py-3 px-4">
//                     <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
//                       Critical (2 left)
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <button className="text-cyan-700 hover:text-cyan-500 font-medium text-sm">
//                       Restock
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacistDashboard;