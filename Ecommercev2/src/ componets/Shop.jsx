import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import Filters from './Filters';
import fallbackProducts from './fallbackProducts.json';

const Shop = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ genre: '', price: [0, 50], category: '' });
  const [playingPreview, setPlayingPreview] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await fetch('https://for-the-record.onrender.com/records');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('No records found in database');
        }
        setRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error fetching records from database:', error);
        setRecords(fallbackProducts);
        setFilteredRecords(fallbackProducts);
        setError('Showing fallback products due to an error fetching from the database.');
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
    if (!albumDetails || !albumDetails.tracks) {
      alert('No preview available for this album.');
      return;
    }

    if (audio && playingPreview === albumDetails.name) {
      audio.pause();
      setAudio(null);
      setPlayingPreview(null);
      return;
    }

    if (audio) {
      audio.pause();
    }

    const previewTrack = albumDetails.tracks.find(track => track.preview_url);
    const previewUrl = previewTrack ? previewTrack.preview_url : null;

    if (previewUrl) {
      const newAudio = new Audio(previewUrl);
      newAudio.play().catch(error => console.error('Error playing audio:', error));
      setAudio(newAudio);
      setPlayingPreview(albumDetails.name);
      console.log('Playing preview for album:', albumDetails);
    } else {
      console.log('Preview URL:', previewUrl);
      setPlayingPreview(null);
      alert('No preview available for this album.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <MainContent>
          <Title>Vinyls</Title>
          <Description>Explore our collection of classic and contemporary vinyl records.</Description>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <FiltersContainer>
            <Filters genres={[...new Set(records.map(record => record.genre))]} filter={filter} handleFilterChange={handleFilterChange} />
          </FiltersContainer>
          <ProductList>
            {filteredRecords.length === 0 ? (
              <NoRecords>No records found.</NoRecords>
            ) : (
              filteredRecords.map((record) => (
                <ProductCard key={record.record_id} record={record} onPreview={handlePreview} playingPreview={playingPreview} />
              ))
            )}
          </ProductList>
        </MainContent>
      </Container>
      <Footer />
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

const MainContent = styled.div`
  // width: 100%;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 50px;
  text-shadow: 2px 5px 15px rgb(215,70,51);

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: white;
  font-size: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FiltersContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NoRecords = styled.p`
  text-align: center;
  color: red;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
