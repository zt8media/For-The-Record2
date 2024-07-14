import React from 'react';
import PageLayout from './PageLayout';
// import cartImage from '../assets/records/sza-ctrl-record.webp';
const Cart = () => {
  return (
    <PageLayout image={cartImage} title="Cart" subtitle="Your selected records">
      <h3>Your cart is currently empty</h3>
      {/* Add more content here */}
    </PageLayout>
  );
};

export default Cart;
