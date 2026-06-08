import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

// ==================== STAFF MANAGEMENT ====================

export const getAllStaff = () =>
  axios.get(`${API_URL}/staff`).then((res) => res.data);

export const getStaffById = (id) =>
  axios.get(`${API_URL}/staff/${id}`).then((res) => res.data);

export const createStaff = (staffData) =>
  axios.post(`${API_URL}/staff/create`, staffData).then((res) => res.data);

export const updateStaff = (id, staffData) =>
  axios.put(`${API_URL}/staff/update/${id}`, staffData).then((res) => res.data);

export const deactivateStaff = (id) =>
  axios.put(`${API_URL}/staff/deactivate/${id}`).then((res) => res.data);

export const activateStaff = (id) =>
  axios.put(`${API_URL}/staff/activate/${id}`).then((res) => res.data);

export const deleteStaff = (id) =>
  axios.delete(`${API_URL}/staff/delete/${id}`).then((res) => res.data);

// ==================== ROLE MANAGEMENT ====================

export const getAllRoles = () =>
  axios.get(`${API_URL}/roles`).then((res) => res.data);

export const getRoleById = (id) =>
  axios.get(`${API_URL}/roles/${id}`).then((res) => res.data);

export const createRole = (roleData) =>
  axios.post(`${API_URL}/roles/create`, roleData).then((res) => res.data);

export const updateRole = (id, roleData) =>
  axios.put(`${API_URL}/roles/update/${id}`, roleData).then((res) => res.data);

export const deleteRole = (id) =>
  axios.delete(`${API_URL}/roles/delete/${id}`).then((res) => res.data);
