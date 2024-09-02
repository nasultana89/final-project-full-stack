
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/ShoppingPage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext'; // Import CartProvider

function App() {
    return (
        <CartProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shopping" element={<ShoppingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <Footer />
        </CartProvider>
    );
}

export default App;