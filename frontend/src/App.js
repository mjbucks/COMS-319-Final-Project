import { ViewCharacters } from "./components/CharacterSelect";
import { ViewGame } from "./components/Game";
import LoginForm from "./components/LoginForm";
import TitleText from "./components/TitleText";
import React, { useState } from 'react';
import './styles/style.css';
import Homepage from "./components/Homepage";
import WikiCard from "./components/WikiCard";

function App() {
  const [p1username, setP1User] = useState({});
  const [p2username, setP2User] = useState({});
  const [p1move, setP1Move] = useState({});
  const [p2move, setP2Move] = useState({});

  const [p1Character, setP1Character] = useState({});
  const [p2Character, setP2Character] = useState({});
  
  const [screen, setScreen] = useState('login');

  // Render the current screen based on the value of the screen state
  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
          <>
            <div className="card-container">
              <LoginForm
                setPlayer={setP1User}
                player="P1"
              />
            </div>
            <div className="card-container">
              <LoginForm
                setPlayer={setP2User}
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
          character={null}
        />;
        case 'chooseCharacter':
          return <div><ViewCharacters
          setP1Character = {setP1Character}
          setP2Character = {setP2Character}
          setScreen = {setScreen}
          p1username = {p1username}
          p2username = {p2username}
  
          /></div>;
        case 'game':
          return <div><ViewGame
          p1Character = {p1Character}
          p2Character = {p2Character}
          setScreen = {setScreen}
          p1username = {p1username}
          p2username = {p2username}
          /></div>;
      // Add more cases for additional screens
      default:
        return null;
    }
  };

  // Check if both players have logged in to change screen to home
  if (Object.keys(p1username).length !== 0 && Object.keys(p2username).length !== 0 && screen === 'login') {
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
