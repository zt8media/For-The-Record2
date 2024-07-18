import React, { useEffect, useState } from 'react';
import PageLayout from './PageLayout';
import { fetchRecords } from '../api';
import Navbar from './Navbar';

const Shop = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await fetchRecords();
        console.log('Fetched records:', response.data); // Debugging log
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError(error);
      }
    };

    getRecords();
  }, []);

  if (error) {
    return <div>Error fetching records: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <PageLayout title="Shop" subtitle="Browse our collection of records">
        <div className="product-list">
          {records.length === 0 ? (
            <p>No records found.</p>
          ) : (
            records.map(record => (
              <div key={record.record_id} className="product-item">
                <img src={record.image_url} alt={record.album_title} className="product-image" />
                <h3>{record.album_title}</h3>
                <p>{record.artist_name}</p>
                <p>{record.genre}</p>
                <p>{record.year}</p>
                <p>{record.description}</p>
                <p>${parseFloat(record.price).toFixed(2)}</p>
                <p>Stock: {record.stock_quantity}</p>
              </div>
            ))
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default Shop;
