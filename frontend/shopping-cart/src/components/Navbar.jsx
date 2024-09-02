import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import CartContext for cart management

const Navbar = () => {
    const { cart } = useCart(); // Get cart state from CartContext

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Shopping App</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shopping">Shop</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/checkout">Checkout</Link>
                </li>
                <li>
                    <Link to="/checkout">Cart ({cart.length})</Link> {/* Displays number of items in cart */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;