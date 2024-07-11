import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Welcome.css';
import Footer from '../components/Footer';

/**
 * Welcome page component.
 * Provides navigation options for users to log in or sign up.
 * Displays the TaskMaster logo and navigation buttons.
 * 
 * @returns {JSX.Element} The rendered Welcome page component.
 */
const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="TaskMaster Logo" className="large-logo" />
        <h1>TaskMaster</h1>
      </div>
      <div className="button-container">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
