import React from 'react';
import PageLayout from './PageLayout';
// import StickyNavbar from './StickyNavbar';
// import homeImage from '../assets/home.jpg'; // Add your own image
import Navbar from './Navbar';
const Home = () => {
  return (
   <>   
  <Navbar/>
   <PageLayout title="Welcome to home page " subtitle="Discover the best records here">

      <section className="home-content">
        <h1>HOME PAGE</h1>
        <p>hERE IS THE HOME PAGE</p>
        {/* Add more content here */}
      </section>
    </PageLayout>
  </>
  );
};

export default Home;
