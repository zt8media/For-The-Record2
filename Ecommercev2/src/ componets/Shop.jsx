import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import Filters from './Filters';

const Shop = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ genre: '', price: [0, 50], category: '' });
  const [previewTrack, setPreviewTrack] = useState(null);
  const audioRef = useRef(null);

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
      tempRecords = tempRecords.filter(record => record.genre.toLowerCase() === filter.genre.toLowerCase());
    }

    tempRecords = tempRecords.filter(record => record.price >= filter.price[0] && record.price <= filter.price[1]);

    if (filter.category) {
      tempRecords = tempRecords.filter(record =>
        record.artist_name.toLowerCase().includes(filter.category.toLowerCase()) ||
        record.album_title.toLowerCase().includes(filter.category.toLowerCase()) ||
        record.year.toString().includes(filter.category.toLowerCase()) ||
        record.genre.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    setFilteredRecords(tempRecords);
  };

  const handlePreview = (albumDetails) => {
    console.log('Playing preview for album:', albumDetails);
    if (albumDetails.tracks && albumDetails.tracks.length > 0) {
      const previewUrl = albumDetails.tracks[0].preview_url;
      console.log('Preview URL:', previewUrl);
      if (previewUrl === previewTrack && audioRef.current) {
        // If the same track is already playing, pause it
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
          });
        }
      } else {
        setPreviewTrack(previewUrl);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = previewUrl;
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
          });
        }
      }
    }
  };

  if (error) {
    return <div>Error fetching records: {error.message}</div>;
  }

  const genres = [...new Set(records.map(record => record.genre))];

  return (
    <>
      <Navbar />
      <Container>
        <FiltersContainer>
          <Filters genres={genres} filter={filter} handleFilterChange={handleFilterChange} />
        </FiltersContainer>
        <MainContent>
          <Title>Records</Title>
          <ProductList>
            {filteredRecords.length === 0 ? (
              <NoRecords>No records found.</NoRecords>
            ) : (
              filteredRecords.map((record) => (
                <ProductCard key={record.record_id} record={record} onPreview={handlePreview} />
              ))
            )}
          </ProductList>
        </MainContent>
      </Container>
      <Footer />
      <audio ref={audioRef} />
    </>
  );
};

export default Shop;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FiltersContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 20%;
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding: 20px;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 50px;
  text-shadow: 2px 5px 15px rgb(215,70,51);
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  gap:75px;
  padding:65px;
  max-width:100%;
`;

const NoRecords = styled.p`
  text-align: center;
  color: red;
`;
