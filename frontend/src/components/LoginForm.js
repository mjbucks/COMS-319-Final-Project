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
  const [loggedIn, setLoggedIn] = useState(false);

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
          const responseData = await response.json();
          if (response.status === 409) {
            throw new Error(responseData.error); // Throw error message from server
          } else {
            throw new Error('Failed to submit form data');
          }
        }
        
        setPlayerUsername(username);
        setLoggedIn(true);

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
          const responseData = await response.json();
          if (response.status === 409) {
            throw new Error(responseData.error); // Throw error message from server
          } else {
            throw new Error('Failed to submit form data');
          }
        }

        setPlayerUsername(username);
        setLoggedIn(true);

      } catch (error) {
        console.error('Error submitting form data:', error.message);
        setErrorColor("red");
        setError(error.message);
      }
    }
  };

  return (
    <div>
      {loggedIn ? (
        <h2>{`Welcome, ${username}!`}</h2>
      ) : (
        <>
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
          {error && <p style={{ color: errorColor }}>{error}</p>}
          <p>
            {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
            <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button>
          </p>
        </>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  setPlayerUsername: PropTypes.func,
  player: PropTypes.string
};

export default LoginForm;
