import axios from "axios";
const API_URL = "http://localhost:8080/api/medicines";

export const getAllMedicines = () =>
  axios.get(`${API_URL}/all`).then((res) => res.data);

export const addMedicine = (data) => axios.post(`${API_URL}/add`, data);

export const updateMedicine = (id, data) =>
  axios.put(`${API_URL}/update/${id}`, data);

export const deleteMedicine = (id) => axios.delete(`${API_URL}/delete/${id}`);

export const getLowStockMedicines = async () => {
  const response = await axios.get(`${API_URL}/low-stock`);
  return response.data;
};

export const getExpiringSoonMedicines = async () => {
  const response = await axios.get(`${API_URL}/expiring-soon`);
  return response.data;
};

export const searchMedicines = (query) =>
  axios.get(`${API_URL}/search`, { params: { query } }).then((res) => res.data);

export const filterMedicines = (filters) =>
  axios.get(`${API_URL}/filter`, { params: filters }).then((res) => res.data);

export const getInventoryStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};

export const getExpiryCount = async () => {
  const response = await axios.get(`${API_URL}/expiry-count`);
  return response.data;
};
