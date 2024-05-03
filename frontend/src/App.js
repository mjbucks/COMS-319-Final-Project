import LoginForm from "./components/LoginForm";
import TitleText from "./components/TitleText";
import React, { useState } from 'react';
import './styles/style.css';
import Homepage from "./components/Homepage";
import WikiCard from "./components/WikiCard";

function App() {
  const [p1username, setP1Username] = useState('');
  const [p2username, setP2Username] = useState('');
  const [screen, setScreen] = useState('wiki');

  const Gavin = {
    "_id": {
      "$oid": "66326e7c01c97675bb6c50fd"
    },
    "name": "Gavin",
    "ability": "Shiver",
    "abildesc": "Powers up the users attack while snow terrain is active.",
    "stats": {
      "speed": 50,
      "luck": 50,
      "attack": 700,
      "special_attack": 50,
      "defense": 50,
      "special_defense": 50,
      "hp": 50
    },
    "moves": {
      "move1": {
        "name": "Snow Day",
        "physical": 0,
        "special": 0,
        "description": "Turns the terrain to snow.",
        "effect": {
          "snow": "true"
        }
      },
      "move2": {
        "name": "Smash",
        "description": "The user bashes the target.",
        "physical": 100,
        "special": 0,
        "effect": "none"
      },
      "move3": {
        "name": "Bike",
        "description": "The user doubles their current speed stat.",
        "physical": 0,
        "special": 0,
        "effect": {
          "spe": 2
        }
      }
    },
    "description": "Gavin is a true force of nature. With his overwhelming power he can easily destroy trees and other obstacles in his path. Gavin gets stronger in the snow, hearing the roaring drums of each snowflake.",
    "picture": "../Images/gavin.jpg"
  };

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
      case 'wiki':
        return <WikiCard
          character={Gavin}
        />;
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
