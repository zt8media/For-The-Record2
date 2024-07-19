import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import Filter from './Filters';

const Shop = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ genre: '', price: '' });

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/records');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError(error);
      }
    };

    getRecords();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [filter, records]);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  const filterRecords = () => {
    let tempRecords = [...records];

    if (filter.genre) {
      tempRecords = tempRecords.filter(record => record.genre === filter.genre);
    }

    if (filter.price === 'lowToHigh') {
      tempRecords.sort((a, b) => a.price - b.price);
    } else if (filter.price === 'highToLow') {
      tempRecords.sort((a, b) => b.price - a.price);
    }

    setFilteredRecords(tempRecords);
  };

  if (error) {
    return <div>Error fetching records: {error.message}</div>;
  }

  const genres = [...new Set(records.map(record => record.genre))];

  return (
    <>
      <Navbar />
      <Container>
        <Title>Shop</Title>
        <Filter genres={genres} onFilterChange={handleFilterChange} />
        <ProductList>
          {filteredRecords.length === 0 ? (
            <NoRecords>No records found.</NoRecords>
          ) : (
            filteredRecords.map((record) => (
              <ProductItem key={record.record_id}>
                <ProductImage src={record.image_url} alt={record.album_title} />
                <ProductTitle>{record.album_title}</ProductTitle>
                <ProductArtist>{record.artist_name}</ProductArtist>
                <ProductDetails>{record.genre} | {record.year}</ProductDetails>
                <ProductDescription>{record.description}</ProductDescription>
                <ProductPrice>${parseFloat(record.price).toFixed(2)}</ProductPrice>
                <AddToCartButton>Add to Cart</AddToCartButton>
              </ProductItem>
            ))
          )}
        </ProductList>
      </Container>
      <Footer />
    </>
  );
};

export default Shop;

const Container = styled.div`
  padding: 20px;
  background-color: black;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 100px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NoRecords = styled.p`
  text-align: center;
  color: red;
`;

const ProductItem = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 200px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  color: black;
  font-size: 1.2em;
`;

const ProductArtist = styled.p`
  color: gray;
  font-size: 0.9em;
`;

const ProductDetails = styled.p`
  color: black;
  font-size: 0.9em;
`;

const ProductDescription = styled.p`
  color: black;
  font-size: 0.9em;
`;

const ProductPrice = styled.p`
  color: red;
  font-size: 1.1em;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
  }
`;
