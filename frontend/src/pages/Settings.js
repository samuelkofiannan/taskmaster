import React, { useState } from 'react';
import './styles/Settings.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

/**
 * Settings component for managing user profile and password settings.
 * Provides functionality to update the profile picture, username, and password.
 * 
 * @returns {JSX.Element} The rendered Settings page component.
 */
const Settings = () => {
  const [profile, setProfile] = useState({
    profilePicture: '', // URL or base64 string for the current profile picture
    username: '',
    oldPassword: '',
    newPassword: '',
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handle input changes for form fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event object for input change.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  /**
   * Handle profile picture upload.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event object for file input change.
   */
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handle form submission for saving profile and password changes.
   * @param {React.FormEvent<HTMLFormElement>} e - Event object for form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { ...profile };
    if (newProfilePicture) {
      updatedProfile.profilePicture = newProfilePicture;
    }
    try {
      await axios.put('/api/user/settings', updatedProfile);
      alert('Changes saved successfully!');
      navigate('/home'); // Redirect to the Home page or any other page as required
    } catch (error) {
      console.error('Error updating settings', error);
    }
  };

  /**
   * Handle cancellation of changes and redirect to previous page.
   */
  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="settings-container">
      <Header />
      <div className="settings-content">
        <h2>Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile Picture:</label>
            <div className="profile-picture">
              {newProfilePicture ? (
                <img src={newProfilePicture} alt="New Profile" />
              ) : (
                <img src={profile.profilePicture} alt="Current Profile" />
              )}
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <h2>Password Settings</h2>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={profile.oldPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
