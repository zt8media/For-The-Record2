import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      // Direct DOM manipulation logic here
    };

    const handleResize = () => {
      // Direct DOM manipulation logic here
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Removed currentPath dependency to avoid unnecessary re-renders

  const onTabClick = (event, path) => {
    setCurrentPath(path);
    // Additional logic for handling tab click can go here
  };

  return (
    <>
      <section className="et-hero-tabs">
        <div className="et-hero-tabs-container">
          <Link className={`et-hero-tab ${currentPath === '/' ? 'active' : ''}`} to="/" onClick={(e) => onTabClick(e, '/')}>Home</Link>
          <Link className={`et-hero-tab ${currentPath === '/shop' ? 'active' : ''}`} to="/shop" onClick={(e) => onTabClick(e, '/shop')}>Shop</Link>
          <Link className={`et-hero-tab ${currentPath === '/contact' ? 'active' : ''}`} to="/contact" onClick={(e) => onTabClick(e, '/contact')}>Contact</Link>
          <Link className={`et-hero-tab ${currentPath === '/cart' ? 'active' : ''}`} to="/cart" onClick={(e) => onTabClick(e, '/cart')}>Cart</Link>

          {/* Slider element */}
        </div>
      </section>
    </>
  );
};

export default Navbar;
