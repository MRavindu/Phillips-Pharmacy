import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authService';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        sname: '', snic: '', semail: '', stelno: '',
        uname: '', upswrd: '', urole: 'receptionist'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            alert("Registration Successful!");
            navigate('/login');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="dashboard-container" style={{ justifyContent: "center", padding: "50px 0" }}>
            <div className="card" style={{ width: "500px" }}>
                <h2 className="logintitle">Staff Registration</h2>
                <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column" }}>
                    <label>Full Name</label>
                    <input name="sname" onChange={handleChange} required />
                    
                    <label>NIC Number</label>
                    <input name="snic" onChange={handleChange} required />

                    <label>User Role</label>
                    <select name="urole" value={formData.urole} onChange={handleChange} className="form-control">
                        <option value="admin">Admin</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="delivery person">Delivery Person</option>
                        <option value="cashier">Cashier</option>
                        <option value="counsellor">Counsellor</option>
                        <option value="doctor">Doctor</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="owner">Owner</option>
                        <option value="customer">Customer</option>
                    </select>

                    <label>Username</label>
                    <input name="uname" onChange={handleChange} required />

                    <label>Password</label>
                    <input type="password" name="upswrd" onChange={handleChange} required />

                    {error && <div className="error-text">{error}</div>}

                    <button type="submit" className="btn-primary" style={{ marginTop: "20px" }}>Register Staff</button>
                    <button type="button" onClick={() => navigate('/login')} style={{ background: "none", border: "none", color: "var(--primary-base)", cursor: "pointer", marginTop: "10px" }}>
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;