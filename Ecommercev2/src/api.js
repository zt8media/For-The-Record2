import axios from 'axios';

const api = axios.create({
  baseURL: 'https://172.31.19.35:5000', // Corrected URL format
});

export const fetchRecords = () => api.get('/records');
export const addRecord = (record) => api.post('/records', record);
export const updateRecord = (id, record) => api.put(`/records/${id}`, record);
export const deleteRecord = (id) => api.delete(`/records/${id}`);
