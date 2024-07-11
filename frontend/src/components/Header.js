import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/logo.svg';
import defaultUserIcon from '../assets/defaultUserIcon.png';

/**
 * Header component to display the application header.
 * @returns {JSX.Element}
 */
const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleUserIconClick = () => {
    navigate('/settings');
  };

  const handleLogoutClick = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    navigate('/welcome');
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={logo} alt="TaskMaster Logo" className="logo" />
      </div>
      <h1 className="title">TaskMaster</h1>
      <div className="user-container">
        <img
          src={defaultUserIcon}
          alt="User Icon"
          className="user-icon"
          onClick={handleUserIconClick}
        />
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
