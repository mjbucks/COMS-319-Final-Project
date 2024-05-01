import React, { useState } from 'react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous error messages
    if (!isSignup) {
      try {
        const data = {
          username: username,
          password: password
        }
        const response = await fetch('http://localhost:8081/player/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }

        console.log('Form data submitted successfully');
      } catch (error) {
        console.error('Error submitting form data:', error.message);
        setError('Failed to login to account'); // Set error message
      }
    } else {
      // Logic for logging in
      console.log('Logging in with username:', username, 'and password:', password);
    }
    // Reset username and password fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>{isSignup ? 'Create Account' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">{isSignup ? 'Create Account' : 'Log In'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Render error message if error is not empty */}
      <p>
        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button>
      </p>
    </div>
  );
};

export default LoginForm;
