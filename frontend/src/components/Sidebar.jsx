import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/authService';

const Sidebar = ({ user }) => {
    return (
        <div style={{ width: '250px', height: '100vh', background: '#2c3e50', color: 'white', padding: '20px', position: 'fixed' }}>
            <h3>Phillips Pharmacy</h3>
            <p>Welcome, <b>{user?.sname}</b></p>
            <hr />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                
                {/* Admin Only Menus */}
                {user?.urole === 'admin' && (
                    <>
                        <Link to="/manage-staff" style={{ color: 'white', textDecoration: 'none' }}>Manage Staff</Link>
                        <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory Management</Link>
                    </>
                )}

                {/* Receptionist Only Menus */}
                {user?.urole === 'receptionist' && (
                    <>
                        <Link to="/billing" style={{ color: 'white', textDecoration: 'none' }}>Create Bill</Link>
                        <Link to="/patients" style={{ color: 'white', textDecoration: 'none' }}>Patient Records</Link>
                    </>
                )}

                <button onClick={logout} style={{ marginTop: '30px', background: '#e74c3c', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;