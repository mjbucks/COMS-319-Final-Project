import React, { useState } from 'react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      // Logic for creating an account
      console.log('Creating account with username:', username, 'and password:', password);
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
      <p>
        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button>
      </p>
    </div>
  );
};

export default LoginForm;
