import React, { useState } from "react";
import Hearder from "./component/Header.jsx";
import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/cart.jsx";
import Order from "./pages/ordres.jsx";
import Footer from "./component/Footer.jsx";
import NewUser from "./pages/NewUser.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Page404 from "./pages/Page404.jsx"
import CheckOut from "./pages/CheckOut.jsx";
import { BrowserRouter as Router, ScrollRestoration } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import ProductDetail from "./component/ProductDetail.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Hearder />
      <ScrollToTop />
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/ProductView/:id" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
