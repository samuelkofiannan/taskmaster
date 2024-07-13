import React, { useState, useEffect } from 'react';
import './styles/Settings.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Settings component for managing user profile and password settings.
 * Provides functionality to update the profile picture, username, and password independently.
 * 
 * @returns {JSX.Element} The rendered Settings page component.
 */
const Settings = () => {
  const [profile, setProfile] = useState({
    profilePicture: 'assets/userdefault.png', // Default image path
    username: '',
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the API or local storage on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfile(response.data);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const saveProfilePicture = async () => {
    if (!newProfilePicture) return;

    try {
      await axios.put('/api/user/update-picture', { profilePicture: newProfilePicture });
      setProfile((prevProfile) => ({ ...prevProfile, profilePicture: newProfilePicture }));
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const saveUsername = async () => {
    try {
      await axios.put('/api/user/update-username', { username });
      setProfile((prevProfile) => ({ ...prevProfile, username }));
      alert('Username updated successfully!');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const savePassword = async () => {
    if (newPassword !== passwordConfirm) {
      alert('New passwords do not match.');
      return;
    }
    try {
      await axios.put('/api/user/update-password', { oldPassword, newPassword });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="settings-container">
      <div className="settings-content">
        <h2>Profile Settings</h2>
        <div className="form-group">
          <label>Profile Picture:</label>
          <div className="profile-picture">
            <img
              src={newProfilePicture || profile.profilePicture}
              alt="Profile"
            />
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            <button type="button" onClick={saveProfilePicture}>
              Save Profile Picture
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <button type="button" onClick={saveUsername}>
            Save Username
          </button>
        </div>
        <h2>Password Settings</h2>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm New Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            required
          />
        </div>
        <button type="button" onClick={savePassword}>
          Save Password
        </button>
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
