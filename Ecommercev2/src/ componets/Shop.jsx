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
   <Navbar/>
   <PageLayout title="Shop" subtitle="Browse our collection of records">
      <div className="product-list">
        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          records.map(record => (
            <div key={record.id} className="product-item">
              <img src={record.image_url} alt={record.title} className="product-image" />
              <h3>{record.title}</h3>
              <p>{record.artist}</p>
              <p>{record.genre}</p>
              <p>{record.release_year}</p>
              <p>${parseFloat(record.price).toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </PageLayout>
 </>
  );
};

export default Shop;
