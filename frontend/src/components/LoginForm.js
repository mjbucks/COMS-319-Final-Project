import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types"

export function LoginForm({
  setPlayerUsername, player
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [errorColor, setErrorColor] = useState('red');

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

        setError("Login Successfully")
        setErrorColor("green");
        setPlayerUsername(username);

        console.log('Form data submitted successfully');
      } catch (error) {
        console.error('Error submitting form data:', error.message);
        setErrorColor("red");
        setError('Failed to login to account');
      }
    } else {
      try {
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 12);
        const data = {
          username: username,
          password: password,
          id: small_id,
          win: 0,
          loss: 0
        }
        const response = await fetch('http://localhost:8081/addPlayer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }

        setError('Account Created Successfully');
        setErrorColor("green");
        setPlayerUsername(username);

        console.log('Form data submitted successfully');
      } catch (error) {
        console.error('Error submitting form data:', error.message);
        setErrorColor("red");
        setError('Failed to login to account');
      }
    }
    // Reset username and password fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>{isSignup ? `Create Account ${player}` : `Log In ${player}`}</h2>
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
      {error && <p style={{ color: errorColor }}>{error}</p>} {/* Render error message if error is not empty */}
      <p>
        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  playerUsername: PropTypes.func,
  player: PropTypes.string
};

export default LoginForm;
