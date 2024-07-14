import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const StickyNavbar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      checkTabContainerPosition();
      setCurrentTabSelector();
    };

    const handleResize = () => {
      if (currentPath) {
        setSliderCss();
      }
    };

    const onTabClick = (event, path) => {
      setCurrentPath(path);
    };

    const checkTabContainerPosition = () => {
      const offset = document.querySelector('.et-hero-tabs').offsetTop + document.querySelector('.et-hero-tabs').offsetHeight - 70;
      if (window.scrollY > offset) {
        document.querySelector('.et-hero-tabs-container').classList.add('et-hero-tabs-container--top');
      } else {
        document.querySelector('.et-hero-tabs-container').classList.remove('et-hero-tabs-container--top');
      }
    };

    const setCurrentTabSelector = () => {
      setSliderCss();
    };

    const setSliderCss = () => {
      const currentTab = document.querySelector(`.et-hero-tab[href='${currentPath}']`);
      if (currentTab) {
        const width = currentTab.offsetWidth + 'px';
        const left = currentTab.offsetLeft + 'px';
        document.querySelector('.et-hero-tab-slider').style.width = width;
        document.querySelector('.et-hero-tab-slider').style.left = left;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPath]);

  return (
    <>
      <section className="et-hero-tabs">
        <h1>For The Record</h1>
        <h3>Your Ultimate Record Shop</h3>
        <div className="et-hero-tabs-container">
          <Link className="et-hero-tab" to="/" onClick={(e) => onTabClick(e, '/')}>Home</Link>
          <Link className="et-hero-tab" to="/shop" onClick={(e) => onTabClick(e, '/shop')}>Shop</Link>
          <Link className="et-hero-tab" to="/cart" onClick={(e) => onTabClick(e, '/cart')}>Cart</Link>
          <Link className="et-hero-tab" to="/contact" onClick={(e) => onTabClick(e, '/contact')}>Contact</Link>
          <span className="et-hero-tab-slider"></span>
        </div>
      </section>
    </>
  );
};

export default StickyNavbar;
