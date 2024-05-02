import LoginForm from "./components/LoginForm";
import TitleText from "./components/TitleText";
import React, { useState } from 'react';
import './styles/style.css';

function App() {
  const [p1username, setP1Username] = useState('');
  const [p2username, setP2Username] = useState('');

  const bothPlayersLoggedIn = p1username && p2username;

  const renderLoginScreens = !bothPlayersLoggedIn && (
    <>
      <div className="card-container">
        <LoginForm
          setPlayerUsername={setP1Username}
          player="P1"
        />
      </div>
      <div className="card-container">
        <LoginForm
          setPlayerUsername={setP2Username}
          player="P2"
        />
      </div>
    </>
  );

  return (
    <div className="App">
      <TitleText />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {renderLoginScreens}
      </div>
    </div>
  );
}

export default App;
