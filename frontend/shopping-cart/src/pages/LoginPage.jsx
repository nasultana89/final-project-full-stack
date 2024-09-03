import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api'; // Import both login and register functions
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name input in signup
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);
      // Handle login success (e.g., save token, update context, redirect)
      navigate('/shopping'); // Redirect to shopping page on successful login
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });
      console.log('Signup successful:', data);
      // Handle signup success (e.g., login user automatically, redirect)
      navigate('/shopping'); // Redirect to shopping page on successful signup
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Signup failed');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default LoginPage;