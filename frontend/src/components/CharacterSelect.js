import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function ViewCharacters() {
    const [chars, setCharacters] = useState([]);
    const [char, setChar] = useState("");
    const [charId, setCharId] = useState("");
    const [equip, setEquip] = useState("");

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        if (charId) { 
            handleDisplayChar();
        }
    }, [charId]);

    const handleDisplayChar = () => {
        fetch(`http://localhost:8081/character/${charId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setChar(data))
        .catch(error => console.error("Error fetching character:", error));
    };

    const fetchCharacters = () => {
        fetch("http://localhost:8081/")
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
                    <h3>Player 1: ${equip}</h3>
                    {chars.map((char, index) => (
                        <div key={index}>
                            <h5>{char.name}</h5>
                            <button onClick={() => setEquip(char)}>Choose</button>
                        </div>
                    ))}
                </div>
                <div className="col">
                <h3>Player 2: ${equip}</h3>
                    {chars.map((char, index) => (
                        <div key={index}>
                            <h5>{char.name}</h5>
                            <button onClick={() => setEquip(char)}>Choose</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
