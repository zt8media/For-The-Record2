import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your Express server's base URL
});

export const fetchRecords = () => api.get('/records');
export const addRecord = (record) => api.post('/records', record);
export const updateRecord = (id, record) => api.put(`/records/${id}`, record);
export const deleteRecord = (id) => api.delete(`/records/${id}`);
