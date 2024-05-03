import LoginForm from "./components/LoginForm";
import TitleText from "./components/TitleText";
import React, { useState } from 'react';
import './styles/style.css';
import Homepage from "./components/Homepage";

function App() {
  const [p1username, setP1Username] = useState('');
  const [p2username, setP2Username] = useState('');
  const [screen, setScreen] = useState('login');

  // Render the current screen based on the value of the screen state
  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
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
      case 'home':
        return <Homepage
          p1User={p1username}
          p2User={p2username}
          setScreen={setScreen}
        />;
      case 'other1':
        return <></>;
      case 'other2':
        return <></>;
      // Add more cases for additional screens
      default:
        return null;
    }
  };

  // Check if both players have logged in to change screen to home
  if (p1username && p2username && screen === 'login') {
    setScreen('home');
  }

  return (
    <div className="App">
      <TitleText />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
