import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function ViewCharacters({setCharacterP1, setCharacterP2}) {
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
                    <h3>Player 1: {equip.name}</h3>
                    {chars.map((char, index) => (
                        <div key={index}>
                            <h5>{char.name}</h5>
                            <button 
                                style={{backgroundColor: char === selectedEquip ? 'blue' : 'white'}} 
                                onClick={() => {
                                    setEquip(char);
                                    setSelectedEquip(char);
                                    setCharacterP1 = equip1;
                                }}
                            > Choose </button>
                        </div>
                    ))}
                </div>
                <div className="col">
                <h3>Player 2: {equip2.name}</h3>
                    {chars.map((char, index) => (
                        <div key={index}>
                            <h5>{char.name}</h5>
                            <button 
                                style={{backgroundColor: char === selectedEquip2 ? 'blue' : 'white'}} 
                                onClick={() => {
                                    setEquip2(char);
                                    setSelectedEquip2(char);
                                    setCharacterP2 = equip2;setCharacterP1 = equip;
                                }}
                            > Choose </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
