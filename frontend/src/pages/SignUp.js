import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/SignUp.css';

/**
 * Sign Up page component.
 * Allows new users to create an account.
 * Includes fields for username, email, and password, and buttons for sign up, login, and cancel.
 * 
 * @returns {JSX.Element} The rendered Sign Up page component.
 */
const SignUp = () => {
  const [username, setUsername] = useState(''); // State to manage the username input field
  const [email, setEmail] = useState(''); // State to manage the email input field
  const [password, setPassword] = useState(''); // State to manage the password input field
  const [error, setError] = useState(''); // State to manage registration errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handles the sign up form submission.
   * Sends a POST request to the backend to create a new user account.
   * On success, redirects to the Home page. On failure, displays an error message.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/auth/signup', { username, email, password });
      navigate('/home'); // Redirect to the Home page
    } catch (err) {
      setError('Error creating account. Please try again.'); // Display error message
    }
  };

  /**
   * Handles navigation to the Login page.
   */
  const handleLogin = () => {
    navigate('/login'); // Redirect to the Login page
  };

  /**
   * Handles navigation to the Welcome page.
   */
  const handleCancel = () => {
    navigate('/'); // Redirect to the Welcome page
  };

  return (
    <div className="signup-container">
      <Header />
      <div className="signup-form">
        <img src="/path/to/your/logo.svg" alt="TaskMaster Logo" className="logo" />
        <h1>TaskMaster</h1>
        <form onSubmit={handleSignUp}>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
