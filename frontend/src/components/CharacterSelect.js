import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import PropTypes from "prop-types";

export function ViewCharacters({
  setP1Character,
  setP2Character,
  setScreen,
  p1username,
  p2username,
}) {
  const [chars, setCharacters] = useState([]);
  const [selectedP1Character, setSelectedP1Character] = useState(null);
  const [selectedP2Character, setSelectedP2Character] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = () => {
    fetch("http://localhost:8081/characters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched characters:", data);
        setCharacters(data);
      })
      .catch((error) =>
        console.error("Error fetching characters:", error.message)
      );
  };

  const handleSelectCharacter = (character, player) => {
    if (player === 1) {
      setSelectedP1Character(character);
      setP1Character(character);
    } else if (player === 2) {
      setSelectedP2Character(character);
      setP2Character(character);
    }
  };

  const renderCharacterButtons = (player) => {
    return chars.map((character) => (
      <button
        key={character.id}
        className={
          player === 1 && selectedP1Character === character
            ? "selected-character"
            : player === 2 && selectedP2Character === character
            ? "selected-character"
            : "character-button"
        }
        onClick={() => handleSelectCharacter(character, player)}
      >
        {character.name}
      </button>
    ));
  };

  return (
    <div className="container-center">
      <div className="row">
        <div className="col text-center">
          <h3>{p1username}</h3>
          {selectedP1Character && (
            <img
              src={selectedP1Character.picture}
              alt={selectedP1Character.name}
              className="selected-character-image"
            />
          )}
          <div className="character-row">{renderCharacterButtons(1)}</div>
        </div>
        <div className="col text-center">
          <h3>Characters</h3>
        </div>
        <div className="col text-center">
          <h3>{p2username}</h3>
          {selectedP2Character && (
            <img
              src={selectedP2Character.picture}
              alt={selectedP2Character.name}
              className="selected-character-image"
            />
          )}
          <div className="character-row">{renderCharacterButtons(2)}</div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button
          disabled={!selectedP1Character || !selectedP2Character}
          className="begin-button"
          onClick={() => {
            setScreen("game");
          }}
        >
          Begin Game
        </button>
      </div>
    </div>
  );
}

ViewCharacters.propTypes = {
  setP1Character: PropTypes.func.isRequired,
  setP2Character: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired,
  p1username: PropTypes.string.isRequired,
  p2username: PropTypes.string.isRequired,
};

export default ViewCharacters;
