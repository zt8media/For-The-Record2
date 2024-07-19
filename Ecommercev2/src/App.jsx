import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './ componets/Navbar';
// import Footer from './ componets/Footer';
import Home from './ componets/Home';
import Shop from './ componets/Shop';
import Cart from './ componets/Cart';
import Contact from './ componets/Contact';
import Error from './ componets/Pagenotfound';
import './index.css'
import { CartProvider } from './ componets/CartContext'

// import NewNav from './ componets/Newnav';
// import Navbar from './ componets/Newnav';

const App = () => {
  return (
    <CartProvider>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path = "*" element={<Error/>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  </CartProvider>
 );
};

export default App;
