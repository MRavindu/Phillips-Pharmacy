import React, { useEffect, useState } from "react";
import * as medService from "../../services/medicineService";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCartPlus, FaTimes } from "react-icons/fa";

const InventoryPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  // Updated currentMed structure to match new MySQL schema
  const [currentMed, setCurrentMed] = useState({ 
    medicinename: "", 
    commercialname: "", 
    strength: "", 
    description: "",
    medicinetype: "",
    quantity: 0, 
    price: 0, 
    expdate: "",
    batchno: ""
  });
  
  const [cart, setCart] = useState([]);

  useEffect(() => { loadMedicines(); }, []);

  const loadMedicines = async () => {
    const data = await medService.getAllMedicines();
    setMedicines(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Use medicineid (from DB) for the update check
    currentMed.medicineid 
      ? await medService.updateMedicine(currentMed.medicineid, currentMed) 
      : await medService.addMedicine(currentMed);
    
    setShowModal(false);
    resetForm();
    loadMedicines();
  };

  const resetForm = () => {
    setCurrentMed({ medicinename: "", commercialname: "", strength: "", description: "", medicinetype: "", quantity: 0, price: 0, expdate: "", batchno: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this medicine permanently?")) {
      await medService.deleteMedicine(id);
      loadMedicines();
    }
  };

  // --- Cart Logic (Updated field names) ---
  // Inside InventoryPage.jsx

const addToCart = (med) => {
  const existing = cart.find(item => item.medicineid === med.medicineid);
  
  // Validation: Check if we have enough stock
  if (med.quantity <= 0) {
    alert("This item is out of stock!");
    return;
  }

  if (existing) {
    if (existing.qty >= med.quantity) {
      alert(`Cannot add more. Only ${med.quantity} units available in stock.`);
      return;
    }
    setCart(cart.map(i => i.medicineid === med.medicineid ? { ...i, qty: i.qty + 1 } : i));
  } else {
    setCart([...cart, { ...med, qty: 1 }]);
  }
};

const updateQty = (id, delta) => {
  setCart(cart.map(item => {
    if (item.medicineid === id) {
      const newQty = item.qty + delta;
      
      // Validation: Prevent going below 1
      if (newQty < 1) return item;

      // Validation: Prevent exceeding stock
      if (newQty > item.quantity) {
        alert(`Maximum stock reached (${item.quantity} units).`);
        return item;
      }
      
      return { ...item, qty: newQty };
    }
    return item;
  }));
};

  const removeFromCart = (id) => setCart(cart.filter(item => item.medicineid !== id));
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckout = async () => {
    try {
      // Map cart to match OrderItem expectation (id, qty)
      const orderData = cart.map(item => ({ id: item.medicineid, qty: item.qty }));
      await medService.finalizeOrder(orderData);
      alert("Checkout Successful!");
      setCart([]);
      loadMedicines();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filtered = medicines.filter(m => 
    m.medicinename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.commercialname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-content" style={{ display: 'flex', gap: '25px', padding: '20px' }}>
      
      {/* LEFT: Inventory List */}
      <div style={{ flex: 3 }}>
        <div className="inventory-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search medicine or brand..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            <FaPlus /> New Medicine
          </button>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Medicine (Generic)</th>
              <th>Commercial Name</th>
              <th>Strength</th>
              <th>Stock</th>
              <th>Price (Rs.)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(med => (
              <tr key={med.medicineid}>
                <td><strong>{med.medicinename}</strong><br/><small>{med.medicinetype}</small></td>
                <td>{med.commercialname}</td>
                <td>{med.strength}</td>
                <td>
                  <span className={`badge ${med.quantity <= 15 ? 'danger' : 'success'}`}>
                    {med.quantity}
                  </span>
                </td>
                <td>{med.price.toFixed(2)}</td>
                <td>
                  <button className="btn-icon" onClick={() => { setCurrentMed(med); setShowModal(true); }}><FaEdit /></button>
                  <button className="btn-icon cart" onClick={() => addToCart(med)}><FaCartPlus /></button>
                  <button className="btn-icon delete" onClick={() => handleDelete(med.medicineid)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT: Cart Sidebar */}
      <div className="cart-sidebar">
        <h4 style={{ marginBottom: '15px' }}>Point of Sale</h4>
        
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No items added.</p>
        ) : (
          <div className="cart-container">
            {/* Grid Headers */}
            <div className="cart-grid-header">
              <span>Item</span>
              <span style={{ textAlign: 'center' }}>Qty</span>
              <span style={{ textAlign: 'right' }}>Price</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.medicineid} className="cart-grid-row">
                  {/* Item Info */}
                  <div className="cart-item-info">
                    <span className="generic-name">{item.medicinename}</span>
                    <span className="brand-name">{item.commercialname}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart-qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.medicineid, -1)}>-</button>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="qty-display">{item.qty}</span>
                      <small style={{ fontSize: '0.65rem', color: '#999' }}>Max: {item.quantity}</small>
                    </div>
                    
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQty(item.medicineid, 1)}
                      disabled={item.qty >= item.quantity} // Disable button if max stock reached
                      style={{ cursor: item.qty >= item.quantity ? 'not-allowed' : 'pointer', opacity: item.qty >= item.quantity ? 0.5 : 1 }}
                    >
                      +
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div className="cart-item-price">
                    <span>Rs. {(item.price * item.qty).toFixed(2)}</span>
                    <FaTimes 
                      className="cart-remove-icon" 
                      onClick={() => removeFromCart(item.medicineid)} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-line">
                <span>Total Amount:</span>
                <span className="total-price">Rs. {total.toFixed(2)}</span>
              </div>
              <button className="btn-checkout-full" onClick={handleCheckout}>
                Process Sale & Print
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL (Add/Edit) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '500px' }}>
            <h3>{currentMed.medicineid ? "Edit Medicine" : "Add New Medicine"}</h3>
            <form onSubmit={handleSave}>
              <div className="form-row">
                <input type="text" placeholder="Generic Name" value={currentMed.medicinename || ""} onChange={e => setCurrentMed({...currentMed, medicinename: e.target.value})} required />
                <input type="text" placeholder="Commercial Name" value={currentMed.commercialname || ""} onChange={e => setCurrentMed({...currentMed, commercialname: e.target.value})} required />
              </div>
              
              <div className="form-row">
                <input type="text" placeholder="Strength (e.g. 500mg)" value={currentMed.strength || ""} onChange={e => setCurrentMed({...currentMed, strength: e.target.value})} />
                <input type="text" placeholder="Type (Tablet/Syrup)" value={currentMed.medicinetype || ""} onChange={e => setCurrentMed({...currentMed, medicinetype: e.target.value})} />
              </div>

              <div className="form-row">
                <input type="number" placeholder="Quantity" value={currentMed.quantity || ""} onChange={e => setCurrentMed({...currentMed, quantity: parseInt(e.target.value)})} required />
                <input type="number" step="0.01" placeholder="Price" value={currentMed.price || ""} onChange={e => setCurrentMed({...currentMed, price: parseFloat(e.target.value)})} required />
              </div>

              <div className="form-row">
                <input type="number" placeholder="Batch No" value={currentMed.batchno || ""} onChange={e => setCurrentMed({...currentMed, batchno: parseInt(e.target.value)})} required />
                <input type="date" title="Expiry Date" value={currentMed.expdate || ""} onChange={e => setCurrentMed({...currentMed, expdate: e.target.value})} required />
              </div>

              <textarea placeholder="Description" value={currentMed.description || ""} onChange={e => setCurrentMed({...currentMed, description: e.target.value})} rows="3" style={{ width: '100%', marginBottom: '10px' }}></textarea>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;