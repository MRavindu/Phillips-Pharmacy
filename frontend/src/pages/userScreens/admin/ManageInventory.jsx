import React, { useState, useEffect } from "react";
import {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getLowStockMedicines,
  getExpiringSoonMedicines,
  searchMedicines,
  filterMedicines,
  getInventoryStats,
} from "../../../services/medicineService";

const ManageInventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringSoonItems, setExpiringSoonItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [formData, setFormData] = useState({
    medicinename: "",
    commercialname: "",
    strength: "",
    medicinetype: "",
    quantity: "",
    price: "",
    expdate: "",
    description: "",
    batchno: "",
  });

  useEffect(() => {
    loadMedicines();
    loadStats();
    loadAlerts();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await getAllMedicines();
      setMedicines(data);
    } catch (err) {
      setError("Failed to load medicines");
    }
  };

  const loadStats = async () => {
    try {
      const data = await getInventoryStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats");
    }
  };

  const loadAlerts = async () => {
    try {
      const lowStock = await getLowStockMedicines();
      const expiring = await getExpiringSoonMedicines();
      setLowStockItems(lowStock);
      setExpiringSoonItems(expiring);
    } catch (err) {
      console.error("Failed to load alerts");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadMedicines();
      return;
    }
    try {
      const data = await searchMedicines(searchQuery);
      setMedicines(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleFilter = async () => {
    if (!filterType) {
      loadMedicines();
      return;
    }
    try {
      const data = await filterMedicines({ type: filterType });
      setMedicines(data);
    } catch (err) {
      setError("Filter failed");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingMedicine) {
        await updateMedicine(editingMedicine.medicineid, formData);
      } else {
        await addMedicine(formData);
      }
      setShowModal(false);
      setEditingMedicine(null);
      setFormData({
        medicinename: "",
        commercialname: "",
        strength: "",
        medicinetype: "",
        quantity: "",
        price: "",
        expdate: "",
        description: "",
        batchno: "",
      });
      loadMedicines();
      loadStats();
      loadAlerts();
    } catch (err) {
      setError(err.response?.data || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      medicinename: medicine.medicinename,
      commercialname: medicine.commercialname,
      strength: medicine.strength,
      medicinetype: medicine.medicinetype,
      quantity: medicine.quantity,
      price: medicine.price,
      expdate: medicine.expdate,
      description: medicine.description,
      batchno: medicine.batchno,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?"))
      return;
    try {
      await deleteMedicine(id);
      loadMedicines();
      loadStats();
      loadAlerts();
    } catch (err) {
      setError("Failed to delete medicine");
    }
  };

  const getFilteredMedicines = () => {
    switch (activeTab) {
      case "low-stock":
        return medicines.filter((m) => m.quantity < 10);
      case "expiring":
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getDate() + 30);
        return medicines.filter((m) => {
          const expDate = new Date(m.expdate);
          return expDate >= today && expDate <= nextMonth;
        });
      default:
        return medicines;
    }
  };

  const displayedMedicines = getFilteredMedicines();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <button
          onClick={() => {
            setEditingMedicine(null);
            setFormData({
              medicinename: "",
              commercialname: "",
              strength: "",
              medicinetype: "",
              quantity: "",
              price: "",
              expdate: "",
              description: "",
              batchno: "",
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Medicine
        </button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Medicines
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.totalMedicines}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Low Stock Items
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {stats.lowStockCount}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Expiring Soon</h3>
            <p className="text-3xl font-bold text-orange-600">
              {stats.expiringSoonCount}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Value</h3>
            <p className="text-3xl font-bold text-green-600">
              $
              {medicines
                .reduce((sum, m) => sum + m.price * m.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Alerts Section */}
      {(lowStockItems.length > 0 || expiringSoonItems.length > 0) && (
        <div className="mb-6 space-y-2">
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-semibold mb-2">
                ⚠️ Low Stock Alert
              </h4>
              <ul className="text-red-700 text-sm">
                {lowStockItems.slice(0, 5).map((item) => (
                  <li key={item.medicineid}>
                    {item.medicinename} - {item.quantity} units remaining
                  </li>
                ))}
              </ul>
            </div>
          )}
          {expiringSoonItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="text-orange-800 font-semibold mb-2">
                ⏰ Expiring Soon Alert
              </h4>
              <ul className="text-orange-700 text-sm">
                {expiringSoonItems.slice(0, 5).map((item) => (
                  <li key={item.medicineid}>
                    {item.medicinename} - Expires: {item.expdate}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Search
        </button>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Antibiotic">Antibiotic</option>
          <option value="Painkiller">Painkiller</option>
          <option value="Supplement">Supplement</option>
          <option value="Cardiovascular">Cardiovascular</option>
          <option value="Diabetes">Diabetes</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Filter
        </button>
        <button
          onClick={() => {
            setSearchQuery("");
            setFilterType("");
            loadMedicines();
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Medicines
        </button>
        <button
          onClick={() => setActiveTab("low-stock")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "low-stock"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Low Stock ({medicines.filter((m) => m.quantity < 10).length})
        </button>
        <button
          onClick={() => setActiveTab("expiring")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "expiring"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Expiring Soon ({expiringSoonItems.length})
        </button>
      </div>

      {/* Medicine Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commercial Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Strength
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedMedicines.map((medicine) => (
              <tr key={medicine.medicineid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {medicine.medicinename}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.commercialname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.medicinetype}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.strength}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      medicine.quantity < 10
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {medicine.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${medicine.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.expdate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.batchno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(medicine)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(medicine.medicineid)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingMedicine ? "Edit Medicine" : "Add New Medicine"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    name="medicinename"
                    value={formData.medicinename}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Commercial Name *
                  </label>
                  <input
                    type="text"
                    name="commercialname"
                    value={formData.commercialname}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Strength *
                  </label>
                  <input
                    type="text"
                    name="strength"
                    value={formData.strength}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Medicine Type *
                  </label>
                  <select
                    name="medicinetype"
                    value={formData.medicinetype}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Painkiller">Painkiller</option>
                    <option value="Supplement">Supplement</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="expdate"
                    value={formData.expdate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Batch Number *
                  </label>
                  <input
                    type="number"
                    name="batchno"
                    value={formData.batchno}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingMedicine
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInventory;
