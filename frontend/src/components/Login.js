import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // Ensure this path is correct

/**
 * Login component for user authentication.
 * 
 * @returns {JSX.Element} The rendered Login page component.
 */
const Login = () => {
  const [username, setUsername] = useState(''); // State to manage the username input field
  const [password, setPassword] = useState(''); // State to manage the password input field
  const [error, setError] = useState(''); // State to manage login errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handle login form submission.
   * @param {React.FormEvent<HTMLFormElement>} event - Event object for form submission.
   */
  const handleLogin = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate login by checking credentials against local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === username && user.password === password) {
      console.log('Login successful!');
      navigate('/home'); // Redirect to the Home page
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to the Sign Up page
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the Welcome page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
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
    </div>
  );
};

export default Login;
