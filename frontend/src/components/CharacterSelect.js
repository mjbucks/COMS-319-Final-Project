import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

import PropTypes from "prop-types";

export function ViewCharacters({setP1Character, setP2Character, setScreen, p1username, p2username}) {
    const [chars, setCharacters] = useState([]);
    const [char, setChar] = useState({});
    const [charId, setCharId] = useState("");
    //set characters
    const [equip, setEquip] = useState("");
    const [equip2, setEquip2] = useState("");

    const [selectedEquip, setSelectedEquip] = useState(null);
    const [selectedEquip2, setSelectedEquip2] = useState(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        if (charId) { 
            handleDisplayChar();
        }
    }, [charId]);

    const handleDisplayChar = () => {
        fetch(`http://localhost:8081/characters/${charId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setChar(data))
        .catch(error => console.error("Error fetching character:", error));
    };

    const fetchCharacters = () => {
        fetch("http://localhost:8081/characters")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch characters");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched chracter:", data);
                setCharacters(data);
            })
            .catch(error => console.error("Error fetching characters:", error));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>{p1username}</h3>
                    {chars.map((char, index) => (
                        <div key={index}>
                            <button 
                                className={char === selectedEquip ? "character-display-clicked" : "character-display"}
                                onClick={() => {
                                    setEquip(char);
                                    setSelectedEquip(char);
                                    setP1Character(char);
                                }}
                            >  {char.name} </button>
                        </div>
                    ))}
                </div>
                <div className="col">
                <h3>Characters</h3>

                </div>
                <div className="col">
                <h3>{p2username}</h3>
                    {chars.map((char, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                            className={char === selectedEquip2 ? "character-display-clicked" : "character-display"}
                            onClick={() => {
                                setEquip2(char);
                                setSelectedEquip2(char);
                                setP2Character(char);
                            }}
                            style={{ height: '50px' }}
                        >  {char.name} </button> 
                        <img src={char.picture} alt={char.name} style={{ height: '50px' }}></img>
                    </div>
                    ))}
                </div>
            </div>
            <button disabled={!equip || !equip2} onClick={() => {
                setScreen("game")
            }}> Begin Game </button>
        </div>
    );
}
ViewCharacters.propTypes = {
    setP1Character: PropTypes.func,
    setP1Character: PropTypes.func,
    setScreen: PropTypes.func,
    p1username: PropTypes.string,
    p2username: PropTypes.string,
  };
  
  export default ViewCharacters;
