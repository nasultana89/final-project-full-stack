
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Shopping App</h1>
      <nav>
        <Link to="/shopping">Shop Now</Link> | <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default HomePage;