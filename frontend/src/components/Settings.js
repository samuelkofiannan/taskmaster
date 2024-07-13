import React, { useState, useEffect } from 'react';
import './styles/Settings.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfilePicture, updateUsername, changePassword } from '../api/settings';

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

  useEffect(() => {
    // Fetch user data from the API or local storage on component mount
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/profile', { headers: { Authorization: token } });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

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
   * Handle saving profile picture.
   */
  const handleSaveProfilePicture = async () => {
    const token = localStorage.getItem('token');
    try {
      await updateProfilePicture(newProfilePicture, token);
      alert('Profile picture updated successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating profile picture', error);
    }
  };

  /**
   * Handle saving username.
   */
  const handleSaveUsername = async () => {
    const token = localStorage.getItem('token');
    try {
      await updateUsername(profile.username, token);
      alert('Username updated successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating username', error);
    }
  };

  /**
   * Handle saving password.
   */
  const handleSavePassword = async () => {
    const token = localStorage.getItem('token');
    try {
      await changePassword(profile.oldPassword, profile.newPassword, token);
      alert('Password changed successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error changing password', error);
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
      <div className="settings-content">
        <h2>Profile Settings</h2>
        <div className="form-group">
          <label>Profile Picture:</label>
          <div className="profile-picture">
            {newProfilePicture ? (
              <img src={newProfilePicture} alt="New Profile" />
            ) : (
              <img src={profile.profilePicture} alt="Current Profile" />
            )}
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            <button onClick={handleSaveProfilePicture}>Save Profile Picture</button>
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
          <button onClick={handleSaveUsername}>Save Username</button>
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
          <button onClick={handleSavePassword}>Save Password</button>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
