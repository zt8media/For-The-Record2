import React, { useEffect, useState } from 'react';

const Shop = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/records');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched records:', data); // Debugging log
        setRecords(data);
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
    <div>
      <h1>Shop</h1>
      <div className="product-list">
        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          records.map((record) => (
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
    </div>
  );
};

export default Shop;
