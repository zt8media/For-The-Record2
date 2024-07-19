import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';
import getAlbumDetails from './spotifyAPI';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const ProductCard = ({ record, onPreview, playingPreview }) => {
  const { addToCart } = useCart();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [albumFound, setAlbumFound] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      const details = await getAlbumDetails(record.album_title, record.artist_name, record.year);
      console.log('Album details:', details); // Log album details
      if (details && details.tracks && details.tracks.some(track => track.preview_url)) {
        setAlbumDetails(details);
        setAlbumFound(true);
      } else {
        setAlbumFound(false);
      }
    };

    fetchAlbumDetails();
  }, [record.album_title, record.artist_name, record.year]);

  const displayPrice = isNaN(record.price) ? 0 : parseFloat(record.price).toFixed(2);

  return (
    <ProductItem>
      <ProductImage src={record.image_url} alt={record.album_title} />
      <ProductTitle>{record.album_title}</ProductTitle>
      <ProductArtist>{record.artist_name}</ProductArtist>
      <ProductDetails>{record.genre} | {record.year}</ProductDetails>
      <ProductDescription>{record.description}</ProductDescription>
      <ProductPrice>${displayPrice}</ProductPrice>
      <ButtonContainer>
        <AddToCartButton onClick={(e) => {
          e.preventDefault();
          addToCart({
            ...record,
            price: parseFloat(record.price)
          });
        }}>Add to Cart</AddToCartButton>
        {albumFound ? (
          <PreviewButton onClick={() => onPreview(albumDetails)}>
            <i className={`fas ${playingPreview === albumDetails?.name ? 'fa-stop' : 'fa-play'}`}></i>
          </PreviewButton>
        ) : (
          <NoPreviewButton>No preview available</NoPreviewButton>
        )}
      </ButtonContainer>
    </ProductItem>
  );
};

export default ProductCard;

// Styled Components
const ProductItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 2px -2px 17px -2px rgba(255, 0, 0, 0.8);
  margin: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
  width: 250px;

  &:hover {
    transform: scale(1.09);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  color: white;
  font-size: 1.5em;
`;

const ProductArtist = styled.p`
  color: red;
  font-size: 1.5em;
  font-weight: 400;
`;

const ProductDetails = styled.p`
  color: yellow;
  font-size: 0.9em;
`;

const ProductDescription = styled.p`
  color: white;
  font-size: 0.9em;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  color: red;
  font-size: 1.1em;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Gap between buttons */
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
  }
`;

const PreviewButton = styled.button`
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1ED760;
  }

  i {
    font-size: 1.2em;
  }
`;

const NoPreviewButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 10px;
  cursor: not-allowed;
  border-radius: 5px;
`;
