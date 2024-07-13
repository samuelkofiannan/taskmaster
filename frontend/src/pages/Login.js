import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css'; // Ensure this path is correct

/**
 * Login component for user authentication.
 * 
 * @returns {JSX.Element} The rendered Login page component.
 */
const Login = () => {
  const [username, setUsername] = useState(''); // State to manage the username input field
  const [password, setPassword] = useState(''); // State to manage the password input field
  const [error, setError] = useState(''); // State to manage authentication errors
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

    // Simulate a successful login
    setTimeout(() => {
      console.log('Login successful!');
      localStorage.setItem('token', 'dummy-token'); // Simulate storing a token
      navigate('/home'); // Redirect to the Home page
    }, 1000); // Simulate a delay of 1 second

    // Simulate an error for demonstration
    // Uncomment the code below to simulate an error response
    // setTimeout(() => {
    //   setError('Invalid username or password.');
    // }, 1000); // Simulate a delay of 1 second
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
