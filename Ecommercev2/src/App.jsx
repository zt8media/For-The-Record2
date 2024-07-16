import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './ componets/Navbar';
// import Footer from './ componets/Footer';
import Home from './ componets/Home';
import Shop from './ componets/Shop';
import Cart from './ componets/Cart';
import Contact from './ componets/Contact';
// import NewNav from './ componets/Newnav';
// import Navbar from './ componets/Newnav';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
