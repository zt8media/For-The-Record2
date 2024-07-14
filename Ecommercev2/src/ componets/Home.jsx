import React from 'react';
import PageLayout from './PageLayout';
// import homeImage from '../assets/home.jpg'; // Add your own image

const Home = () => {
  return (
    <PageLayout title="Welcome to For The Record" subtitle="Discover the best records here">
      <section className="home-content">
        <h1>Featured Products</h1>
        <p>Explore our collection of records</p>
        {/* Add more content here */}
      </section>
    </PageLayout>
  );
};

export default Home;
