import React from 'react';
import './PageLayout.css';

const PageLayout = ({ image, title, subtitle, children }) => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
    
      </section>
      <main className="page-content">
        {children}
      </main>
    </>
  );
};

export default PageLayout;
