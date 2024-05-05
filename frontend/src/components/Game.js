import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"
import WikiCard from "./WikiCard";

import PropTypes from "prop-types";

function Log({ gameStats, p1stats, p2stats, p1username, p2username, p1prevMove, p2prevMove }) {
    return (
      <div className="log">
        <div className="log-column">
          <h3>{p1username.username}'s Stats:</h3>
          <p>HP: {Math.floor(p1stats.hp)}</p>
          <p>Attack: {Number(p1stats.attack.toFixed(2))}</p>
          <p>Special Attack: {Number(p1stats.special_attack.toFixed(2))}</p>
          <p>Speed: {Number(p1stats.speed.toFixed(2))}</p>
          <p>Defense: {Number(p1stats.defense.toFixed(2))}</p>
          <p>Special Defense: {Number(p1stats.special_defense.toFixed(2))}</p>
          {/* Add other stats for Player 1 */}
        </div>
        <div className="log-column">
          <h3>Game Stats:</h3>
          <p>Weather: {gameStats.snow ? 'Snowy' : 'Clear'}</p>
          <p>Inversed: {gameStats.inverse ? 'Active' : 'Inactive'}</p>
          <p>{p1username.username}'s Prev Move: {p1prevMove.name}</p>
          <p>{p2username.username}'s Prev Move: {p2prevMove.name}</p>
          {/* Add other game stats */}
        </div>
        <div className="log-column">
          <h3>{p2username.username}'s Stats:</h3>
          <p>HP: {Number(p2stats.hp.toFixed(2))}</p>
          <p>Attack: {Number(p2stats.attack.toFixed(2))}</p>
          <p>Special Attack: {Number(p2stats.special_attack.toFixed(2))}</p>
          <p>Speed: {Number(p2stats.speed.toFixed(2))}</p>
          <p>Defense: {Number(p2stats.defense.toFixed(2))}</p>
          <p>Special Defense: {Number(p2stats.special_defense.toFixed(2))}</p>
          {/* Add other stats for Player 2 */}
        </div>
      </div>
    );
  }
  

export function ViewGame({ p1Character, p2Character, setScreen, p1username, p2username }) {
    const statBoostTracker = {
        hp: 0,
        attack: 1,
        special_attack: 1,
        speed: 1,
        defense: 1,
        special_defense: 1,
        heal: 1,
        priority: 0,
        snow: false,
        inverse: false
    }
    const [p1move, setP1Move] = useState({});
    const [p2move, setP2Move] = useState({});
    const [p1MovesVisible, setP1MovesVisible] = useState(false);
    const [p2MovesVisible, setP2MovesVisible] = useState(false);
    const [p1stats, setP1Stats] = useState(statBoostTracker);
    const [p2stats, setP2Stats] = useState(statBoostTracker);
    const [gameStats, setGameStats] = useState(statBoostTracker)
    const [winner, setWinner] = useState('');
    const [showWikiCard, setShowWikiCard] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [p1prevMove, setP1PrevMove] = useState({name: 'None'});
    const [p2prevMove, setP2PrevMove] = useState({name: 'None'});
    //get 2 for each player

    useEffect(() => {
        setP1Stats(stats => ({ ...stats, hp: Math.floor(p1Character.stats.hp * 2.5) }));
        setP2Stats(stats => ({ ...stats, hp: Math.floor(p2Character.stats.hp * 2.5) }));
    }, [p1Character, p2Character]);


    function handleGameCalcs() {
        //do stat increases here

        let p1hits = p1move.effect.hits > 0 ? p1move.effect.hits : 1;
        let p2hits = p2move.effect.hits > 0 ? p2move.effect.hits : 1;
        let p1crit = ((Math.floor(Math.random() * 1000 / p1hits) <= p1Character.stats.luck) && p2Character.ability !== "Point guard") ? 2.5 : 1;
        let p2crit = ((Math.floor(Math.random() * 1000 / p2hits) <= p2Character.stats.luck) && p1Character.ability !== "Point guard") ? 2.5 : 1;
        let p1atk = Math.floor((((52 * p1move.physical * ((p1Character.stats.attack * p1stats.attack) / (p2Character.stats.defense * p2stats.defense))) / 50) + 2) * p1crit * p1hits);
        p1atk = Math.floor(p1atk + (((52 * p1move.special * ((p1Character.stats.special_attack * p1stats.special_attack) / (p2Character.stats.special_defense * p2stats.special_defense))) / 50) + 2) * p1crit * p1hits);//Crit rate at the end
        let p2atk = Math.floor((((52 * p2move.physical * ((p2Character.stats.attack * p2stats.attack) / (p1Character.stats.defense * p1stats.defense))) / 50) + 2) * p2crit) * p2hits;
        p2atk = Math.floor(p2atk + (((52 * p2move.special * ((p2Character.stats.special_attack * p2stats.special_attack) / (p1Character.stats.special_defense * p1stats.special_defense))) / 50) + 2) * p2crit * p2hits);

        //NOW CALC SPEED
        let p1turn = false;
        if ((p1Character.stats.speed * p1stats.speed) > (p2Character.stats.speed * p2stats.speed)) {
            p1turn = true;
        }
        else if ((p1Character.stats.speed * p1stats.speed) === (p2Character.stats.speed * p2stats.speed)) {
            let random = Math.floor(Math.random() * 2)
            if (random === 1) {
                p1turn = true;
            }
            else {
                p1turn = false;
            }
        }
        else {
            p1turn = false;
        }
        if (gameStats.inverse) {
            if (p1turn) {
                p1turn = false;
            }
            else {
                p1turn = true;
            }
        }
        if ((p1move.effect.priority ? p1move.effect.priority : 0) > (p2move.effect.priority ? p2move.effect.priority : 0)) {
            p1turn = true;
        }
        if ((p1move.effect.priority ? p1move.effect.priority : 0) < (p2move.effect.priority ? p2move.effect.priority : 0)) {
            p1turn = false;
        }
        //Ability check
        if (p1Character.ability === ("Shiver")) {
            if (gameStats.snow) {
                p1atk = p1atk * 2;
            }
        }
        if (p1Character.ability === ("LAYD")) {
            if (p2move.physical > 0) {
                p1stats.hp += p2atk * 0.1
            }
        }
        if (p1Character.ability === ("Speed Run")) {
            if ((Math.floor(Math.random() * 1000) < 299)) {
                p1atk = p1atk * 1.3
            }
        }
        if (p1Character.ability === ("Peanut Butter Paws")) {
            p1stats.speed += p1stats.speed * (-0.5);
        }
        if (p1Character.ability === ("Lightweight")) {
            if (p1move.name === ("Drawn Instincts")) {
                p1stats.attack += p1stats.attack * (0.5);
                p1stats.defense += p1stats.defense * (0.5);
                p1stats.special_attack += p1stats.special_attack * (0.5);
                p1stats.special_defense += p1stats.special_defense * (0.5);
                p1stats.speed += p1stats.speed * (0.5);
            }
        }
        if (p1Character.ability === ("ACL tear")) {
            p1stats.speed += p1stats.speed * (-0.5);
            p1stats.attack += p1stats.attack * (0.5);
        }
        //P2//////////////////////////////////////////////////////////////////
        if (p2Character.ability === ("Shiver")) {
            if (gameStats.snow) {
                p2atk = p2atk * 2;
            }
        }
        if (p2Character.ability === ("LAYD")) {
            if (p1move.physical > 0) {
                p2stats.hp += p1atk * 0.1
            }
        }
        if (p2Character.ability === ("Speed Run")) {
            if ((Math.floor(Math.random() * 1000) < 299)) {
                p2atk = p2atk * 1.3
            }
        }
        if (p2Character.ability === ("Peanut Butter Paws")) {
            p2stats.speed += p2stats.speed * (-0.5);
        }
        if (p2Character.ability === ("Lightweight")) {
            if (p2move.name === ("Drawn Instincts")) {
                p2stats.attack += p2stats.attack * (0.5);
                p2stats.defense += p2stats.defense * (0.5);
                p2stats.special_attack += p2stats.special_attack * (0.5);
                p2stats.special_defense += p2stats.special_defense * (0.5);
                p2stats.speed += p2stats.speed * (0.5);
            }
        }
        if (p2Character.ability === ("ACL tear")) {
            p2stats.speed += p2stats.speed * (-0.5);
            p2stats.attack += p2stats.attack * (0.5);
        }
        //now apply
        if (p1turn) {
            p2stats.hp -= Math.floor(p1atk);
            if (!(p2stats.hp <= 0)) {
                p1stats.hp -= Math.floor(p2atk);
            }
        }
        else {
            p1stats.hp -= Math.floor(p2atk);
            if (!(p1stats.hp <= 0)) {
                p2stats.hp -= Math.floor(p1atk);
            }
        }
    };
    function handleMoveEffects() {
        if (typeof p1move.effect === 'object' && p1move.effect !== null) {
            //add effects
            p1stats.attack += p1stats.attack * ((p1move.effect.atk ? p1move.effect.atk : 0) * 0.5);
            p1stats.defense += p1stats.defense * ((p1move.effect.def ? p1move.effect.def : 0) * 0.5);
            p1stats.special_attack += p1stats.special_attack * ((p1move.effect.spatk ? p1move.effect.spatk : 0) * 0.5);
            p1stats.special_defense += p1stats.special_defense * ((p1move.effect.spdef ? p1move.effect.spdef : 0) * 0.5);
            p1stats.speed += p1stats.speed * (((p1move.effect.spe ? p1move.effect.spe : 0)) * 0.5);
            p1stats.hp += (p1move.effect.heal ? p1move.effect.heal : 0);
        }
        if (typeof p2move.effect === 'object' && p2move.effect !== null) {
            p2stats.attack += p2stats.attack * ((p2move.effect.atk ? p2move.effect.atk : 0) * 0.5);
            p2stats.defense += p2stats.defense * ((p2move.effect.def ? p2move.effect.def : 0) * 0.5);
            p2stats.special_attack += p2stats.special_attack * ((p2move.effect.spatk ? p2move.effect.spatk : 0) * 0.5);
            p2stats.special_defense += p2stats.special_defense * ((p2move.effect.spdef ? p2move.effect.spdef : 0) * 0.5);
            p2stats.speed += p2stats.speed * ((p2move.effect.spe ? p2move.effect.spe : 0) * 0.5);
            p2stats.hp += (p2move.effect.heal ? p2move.effect.heal : 0);
        }
        if (gameStats.snow !== true && p1move.effect.snow) {
            gameStats.snow = true
        }
        if (gameStats.snow !== true && p2move.effect.snow) {
            gameStats.snow = p2move.effect?.snow
        }
        if (gameStats.inverse !== true && p1move.effect.inverse) {
            gameStats.inverse = !gameStats.inverse;
        }
        if (gameStats.inverse !== true && p2move.effect.inverse) {
            gameStats.inverse = !gameStats.inverse;
        }


    }
    function isGameOver() {
        if (p1stats.hp < 0) {
            //add to DB, pop up 
            p2username.win += 1;
            p1username.loss += 1;
            setWinner(p2username.username);
        }
        else if (p2stats.hp < 0) {
            p1username.win += 1;
            p2username.loss += 1;
            setWinner(p1username.username);
        }
    }

    function handleBackToHome() {
        handleUpdate(p1username);
        handleUpdate(p2username);
        setScreen("home");
    }

    const handleUpdate = (user) => {
        fetch(`http://localhost:8081/updatePlayers/${user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "win" : (user.win),
                    "loss" : (user.loss)
                })
        })
        .then(response => {
            if (response.ok) {
                console.log(`${user.name} updated successfully.`);
            } else {
                console.log(`Failed to update ${user.name}.`);
            }
        })
        .catch(error => {
            console.error("Error updating:", error);
            console.log(`Error updating ${user.name}.`)
        });
    }
    const handleAddLoss = (user) => {
        fetch(`http://localhost:8081/updatePlayers/${user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "win" : (user.win),
                    "loss" : (user.loss + 1)
                })
        })
        .then(response => {
            if (response.ok) {
                console.log(`${user.name} updated successfully.`);
            } else {
                console.log(`Failed to update ${user.name}.`);
            }
        })
        .catch(error => {
            console.error("Error updating:", error);
            console.log(`Error updating ${user.name}.`)
        });
    }
    function handleSetP1Move(move) {
        setP1Move(move);
        setP1MovesVisible(false);
    };

    function handleSetP2Move(move) {
        setP2Move(move);
        setP2MovesVisible(false);
    };
    function handleNewTurn() {
        handleGameCalcs();
        handleMoveEffects();
        setP1PrevMove(p1move);
        setP2PrevMove(p2move);
        setP1Move({});
        setP2Move({});
        isGameOver();
    };

    const openWikiCard = (character) => {
        setSelectedCharacter(character);
        setShowWikiCard(true);
      };
    
    const closeWikiCard = () => {
        setSelectedCharacter(null);
        setShowWikiCard(false);
    };

    return (
        <div className="container-center">
          {showWikiCard && selectedCharacter && (
            <div className="wiki-card-overlay">
              <WikiCard character={selectedCharacter} onClose={closeWikiCard} />
            </div>
          )}
          {winner === '' ? (
            <>
              <div className="player-container">
                {/* Player 1 */}
                <div className="player">
                  <h3>{p1username.username}</h3>
                  <div className="container-center">
                    <img src={p1Character.picture} alt={p1Character.name} className="character-image" />
                  </div>
                  <div className="toggle-wik-container">
                    <div className="button-row">
                      <button onClick={() => setP1MovesVisible(!p1MovesVisible)} disabled={p1MovesVisible}>
                        Toggle {p1Character.name}'s Moves
                      </button>
                      <button onClick={() => openWikiCard(p1Character)}>Wiki</button>
                    </div>
                  </div>
                  <div className="moves-container">
                    {p1MovesVisible && (
                        <div className="moves-row">
                            <div>
                            <button onClick={() => handleSetP1Move(p1Character.moves.move1)}>{p1Character.moves.move1.name}</button>
                            <button onClick={() => handleSetP1Move(p1Character.moves.move2)}>{p1Character.moves.move2.name}</button>
                            <button onClick={() => handleSetP1Move(p1Character.moves.move3)}>{p1Character.moves.move3.name}</button>
                            </div>
                        </div>
                        )}
                  </div>
                </div>
                {/* Log */}
                <Log
                  gameStats={gameStats}
                  p1stats={p1stats}
                  p2stats={p2stats}
                  p1username={p1username}
                  p2username={p2username}
                  p1prevMove={p1prevMove}
                  p2prevMove={p2prevMove}
                />
                {/* Player 2 */}
                <div className="player">
                  <h3>{p2username.username}</h3>
                  <div className="container-center">
                    <img src={p2Character.picture} alt={p2Character.name} className="character-image" />
                  </div>
                  <div className="toggle-wik-container">
                    <div className="button-row">
                      <button onClick={() => setP2MovesVisible(!p2MovesVisible)} disabled={p2MovesVisible}>
                        Toggle {p2Character.name}'s Moves
                      </button>
                      <button onClick={() => openWikiCard(p2Character)}>Wiki</button>
                    </div>
                  </div>
                  <div className="moves-container">
                    {p2MovesVisible && (
                        <div className="moves-row">
                            <div>
                            <button onClick={() => handleSetP2Move(p2Character.moves.move1)}>{p2Character.moves.move1.name}</button>
                            <button onClick={() => handleSetP2Move(p2Character.moves.move2)}>{p2Character.moves.move2.name}</button>
                            <button onClick={() => handleSetP2Move(p2Character.moves.move3)}>{p2Character.moves.move3.name}</button>
                            </div>
                        </div>
                        )}
                  </div>
                </div>
              </div>
              <button onClick={handleNewTurn} disabled={!p1move.name || !p2move.name}>
                Begin Turn
              </button>
            </>
          ) : (
            <div>
              <p>{winner}</p>
              <button onClick={handleBackToHome}>Return Home</button>
            </div>
          )}
        </div>
      );
      
          
         

}
ViewGame.propTypes = {
    p1Character: PropTypes.func,
    p2Character: PropTypes.func,
    setScreen: PropTypes.func,
    p1username: PropTypes.func,
    p2username: PropTypes.func,
};

export default ViewGame;