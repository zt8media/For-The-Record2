import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||https://for-the-record.onrender.com
});

export const fetchRecords = () => api.get('/records');
export const addRecord = (record) => api.post('/records', record);
export const updateRecord = (id, record) => api.put(`/records/${id}`, record);
export const deleteRecord = (id) => api.delete(`/records/${id}`);
