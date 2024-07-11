import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/login.css';

/**
 * Login page component.
 * Allows existing users to log in to their account.
 * Includes fields for username and password, and buttons for login, sign up, and cancel.
 * 
 * @returns {JSX.Element} The rendered login page component.
 */
const Login = () => {
  const [username, setUsername] = useState(''); // State to manage the username input field
  const [password, setPassword] = useState(''); // State to manage the password input field
  const [error, setError] = useState(''); // State to manage authentication errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handles the login form submission.
   * Sends a POST request to the backend to authenticate the user.
   * On success, redirects to the Home page. On failure, displays an error message.
   * 
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token); // Save the token to local storage
      navigate('/home'); // Redirect to the Home page
    } catch (err) {
      setError('Invalid credentials. Please try again.'); // Display error message
    }
  };

  /**
   * Handles navigation to the Sign Up page.
   */
  const handleSignUp = () => {
    navigate('/signup'); // Redirect to the Sign Up page
  };

  /**
   * Handles navigation to the Welcome page.
   */
  const handleCancel = () => {
    navigate('/'); // Redirect to the Welcome page
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form">
        <img src="/path/to/your/logo.svg" alt="TaskMaster Logo" className="logo" />
        <h1>TaskMaster</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
