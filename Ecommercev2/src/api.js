import axios from 'axios';

const api = axios.create({
  baseURL: 'https://for-the-record.onrender.com', // Update this to your remote server's URL
  timeout: 30000
});

export const fetchRecords = () => {
  console.log('Fetching records...');
  return api.get('/records')
    .then(response => {
      console.log('Records fetched:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching records:', error);
      throw error;
    });
};

export const addRecord = (record) => api.post('/records', record);
export const updateRecord = (id, record) => api.put(`/records/${id}`, record);
export const deleteRecord = (id) => api.delete(`/records/${id}`);
