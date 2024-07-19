import React, { useState, useEffect } from 'react';
import './Styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext'; // Ensure this is correctly imported
import styled from 'styled-components';

// Styled component for the dropdown content
const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  width: 400px; // Adjust width as needed
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 100; // Ensure it's on top
  right: 0; // Align to the right side of the cart tab
  top: 70px; // Position below the navbar
  display: none; // Start hidden
  max-height: 300px; // Adjust height as needed
  overflow-y: auto; // Add scroll if content exceeds max-height

  &.show {
    display: block; // Show when cart is clicked
  }
`;

const CartItem = styled.div`
  padding: 16px; // Increased padding for better spacing
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd; // Add border between items
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  margin-right: 10px;
  font-size: 1.1em; // Make text bigger
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  color: red;
  cursor: pointer;
  padding: 5px 10px; // Add padding for better click area
  margin: 0 5px;

  &:hover {
    color: black;
    border-color: black; // Change border color on hover
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: black;
  }

  i {
    font-size: 1.5em; // Make trash icon bigger
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart(); // Use removeFromCart from context
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDropdownVisible(false); // Optionally hide on small screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <section className="et-hero-tabs">
      <div className="et-hero-tabs-container">
        <Link className={`et-hero-tab ${currentPath === '/' ? 'active' : ''}`} to="/" onClick={() => setCurrentPath('/')}>Home</Link>
        <Link className={`et-hero-tab ${currentPath === '/shop' ? 'active' : ''}`} to="/shop" onClick={() => setCurrentPath('/shop')}>Shop</Link>
        <Link className={`et-hero-tab ${currentPath === '/contact' ? 'active' : ''}`} to="/contact" onClick={() => setCurrentPath('/contact')}>Contact</Link>
        <div className="cart-dropdown">
          <Link className={`et-hero-tab cart-link ${currentPath === '/cart' ? 'active' : ''}`} to="#" onClick={toggleDropdown}>
            Cart ({cartItems.length})
          </Link>
          <DropdownContent className={dropdownVisible ? 'show' : ''}>
            {cartItems.map(item => (
              <CartItem key={item.record_id}>
                <ItemDetails>
                  {item.album_title} - ${item.price.toFixed(2)} x {item.quantity}
                </ItemDetails>
                <ButtonGroup>
                  <QuantityButton onClick={() => incrementQuantity(item.record_id)}>+</QuantityButton>
                  <QuantityButton onClick={() => decrementQuantity(item.record_id)}>-</QuantityButton>
                </ButtonGroup>
                <RemoveButton onClick={() => removeFromCart(item.record_id)}>
                  <i className="fas fa-trash-alt"></i>
                </RemoveButton>
              </CartItem>
            ))}
            {cartItems.length === 0 && <p>Your cart is empty.</p>}
          </DropdownContent>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
