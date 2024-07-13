import React from 'react';
import './styles/Welcome.css';
import { useNavigate } from 'react-router-dom';

/**
 * Welcome component for the TaskMaster application.
 * Provides navigation to login and sign-up pages.
 * 
 * @returns {JSX.Element} The rendered Welcome page component.
 */
const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to TaskMaster</h1>
        <p>Stay on top of tasks and goals</p>
        <div className="button-container">
          <button onClick={handleLogin} className="btn login-btn">Login</button>
          <button onClick={handleSignUp} className="btn signup-btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

