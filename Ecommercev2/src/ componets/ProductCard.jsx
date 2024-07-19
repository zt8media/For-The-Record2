import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext'; // Import useCart

const ProductCard = ({ record }) => {
  const { addToCart } = useCart();  // Use addToCart from context

  // Ensure price is a number
  const displayPrice = isNaN(record.price) ? 0 : parseFloat(record.price).toFixed(2);

  return (
    <ProductItem>
      <ProductImage src={record.image_url} alt={record.album_title} />
      <ProductTitle>{record.album_title}</ProductTitle>
      <ProductArtist>{record.artist_name}</ProductArtist>
      <ProductDetails>{record.genre} | {record.year}</ProductDetails>
      <ProductDescription>{record.description}</ProductDescription>
      <ProductPrice>${displayPrice}</ProductPrice>
      <AddToCartButton onClick={(e) => {
        e.preventDefault(); // Prevent any default action that might occur
        addToCart({
          ...record,
          price: parseFloat(record.price) // Ensure price is a number
        });
      }}>Add to Cart</AddToCartButton>
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
  width: 250px;
  transition: transform 0.2s;

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
