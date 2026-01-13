import React, { useEffect, useState } from "react";
import * as medService from "../../services/medicineService";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCartPlus, FaTimes } from "react-icons/fa";

const InventoryPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentMed, setCurrentMed] = useState({ name: "", brand: "", category: "", stockQuantity: 0, unitPrice: 0, expiryDate: "" });
  const [cart, setCart] = useState([]);

  useEffect(() => { loadMedicines(); }, []);

  const loadMedicines = async () => {
    const data = await medService.getAllMedicines();
    setMedicines(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    currentMed.id ? await medService.updateMedicine(currentMed.id, currentMed) : await medService.addMedicine(currentMed);
    setShowModal(false);
    setCurrentMed({});
    loadMedicines();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await medService.deleteMedicine(id);
      loadMedicines();
    }
  };

  // --- Cart Logic ---
  const addToCart = (med) => {
    const existing = cart.find(item => item.id === med.id);
    if (existing) {
      setCart(cart.map(i => i.id === med.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...med, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const total = cart.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0);

  const handleCheckout = async () => {
    try {
      // We will create this service next
      await medService.finalizeOrder(cart);
      alert("Checkout Successful!");
      setCart([]);
      loadMedicines(); // Refresh stock levels
    } catch (err) {
      alert("Error during checkout: " + err.message);
    }
  };

  const filtered = medicines.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dashboard-content" style={{ display: 'flex', gap: '25px', padding: '20px' }}>
      
      {/* LEFT: Inventory List */}
      <div style={{ flex: 3 }}>
        <div className="inventory-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search medicines..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={() => { setCurrentMed({}); setShowModal(true); }}>
            <FaPlus /> New Medicine
          </button>
        </div>

        <table className="custom-table">
          <thead>
            <tr><th>Medicine</th><th>Stock</th><th>Price</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map(med => (
              <tr key={med.id}>
                <td>{med.name} <br/><small>{med.brand}</small></td>
                <td><span className={`badge ${med.stockQuantity < 10 ? 'danger' : 'success'}`}>{med.stockQuantity}</span></td>
                <td>Rs.{med.unitPrice}</td>
                <td>
                  <button className="btn-icon" onClick={() => { setCurrentMed(med); setShowModal(true); }}><FaEdit /></button>
                  <button className="btn-icon cart" onClick={() => addToCart(med)}><FaCartPlus /></button>
                  <button className="btn-icon delete" onClick={() => handleDelete(med.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT: Cart Sidebar */}
      <div className="cart-sidebar">
        <h3>Current Bill</h3>
        <hr />
        {cart.length === 0 ? <p>No items added.</p> : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>{item.name} x {item.qty}</div>
                <div>Rs. {item.unitPrice * item.qty} <FaTimes onClick={() => removeFromCart(item.id)} className="remove-item" /></div>
              </div>
            ))}
            <div className="cart-total">
              <h4>Total: Rs. {total.toFixed(2)}</h4>
              <button className="btn-checkout" onClick={handleCheckout}>Finalize & Print</button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL (Add/Edit) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentMed.id ? "Edit Stock" : "Add Stock"}</h3>
            <form onSubmit={handleSave}>
              <input type="text" placeholder="Name" value={currentMed.name || ""} onChange={e => setCurrentMed({...currentMed, name: e.target.value})} required />
              <div className="form-row">
                <input type="number" placeholder="Qty" value={currentMed.stockQuantity || ""} onChange={e => setCurrentMed({...currentMed, stockQuantity: parseInt(e.target.value)})} />
                <input type="number" step="0.01" placeholder="Price" value={currentMed.unitPrice || ""} onChange={e => setCurrentMed({...currentMed, unitPrice: parseFloat(e.target.value)})} />
              </div>
              <input type="date" value={currentMed.expiryDate || ""} onChange={e => setCurrentMed({...currentMed, expiryDate: e.target.value})} />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;