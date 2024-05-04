import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

import PropTypes from "prop-types";

export function ViewGame({p1Character, p2Character, setScreen, p1username, p2username}) {
    const statBoostTracker = {
        hp: 0,
        attack: 1,
        special_attack: 1,
        speed: 1,
        defense: 1,
        special_defense: 1,
        heal: 0,
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
    //get 2 for each player

    useEffect(() => {
        setP1Stats(stats => ({...stats, hp: p1Character.stats.hp * 2.5}));
        setP2Stats(stats => ({...stats, hp: p2Character.stats.hp * 2.5}));
    }, [p1Character, p2Character]);


    function handleGameCalcs() {
        //do stat increases here
        
        let p1hits = p1move.effect.hits > 0 ? p1move.effect.hits : 1;
        let p2hits = p2move.effect.hits > 0 ? p2move.effect.hits : 1;
        let p1crit = ((Math.floor(Math.random() * 1000 / p1hits) <= p1Character.stats.luck) && p2Character.ability != "Point guard") ? 2.5 : 1;
        let p2crit = ((Math.floor(Math.random() * 1000 / p2hits) <= p2Character.stats.luck) && p1Character.ability != "Point guard") ? 2.5 : 1;
        let p1atk = Math.floor((((52 * p1move.physical * ((p1Character.stats.attack * p1stats.attack)/ (p2Character.stats.defense * p2stats.defense)))/50) + 2)* p1crit * p1hits);
        p1atk = Math.floor(p1atk + (((52 * p1move.special * ((p1Character.stats.special_attack * p1stats.special_attack)/ (p2Character.stats.special_defense * p2stats.special_defense)))/50) + 2)* p1crit * p1hits);//Crit rate at the end
        let p2atk = Math.floor((((52 * p2move.physical * ((p2Character.stats.attack * p2stats.attack) / (p1Character.stats.defense * p1stats.defense)))/50) + 2)* p2crit) * p2hits;
        p2atk = Math.floor(p2atk + (((52 * p2move.special * ((p2Character.stats.special_attack * p2stats.special_attack) / (p1Character.stats.special_defense * p1stats.special_defense)))/50) + 2)* p2crit * p2hits);

        //NOW CALC SPEED
        let p1turn = false;
        if((p1Character.stats.speed * p1stats.speed) > (p2Character.stats.speed * p2stats.speed)){
            p1turn = true;
        }
        else if((p1Character.stats.speed * p1stats.speed) == (p2Character.stats.speed * p2stats.speed)){
            let random = Math.floor(Math.random() * 2)
            if(random == 1){
                p1turn = true;
            }
            else{
                p1turn = false;
            }
        }
        else{
            p1turn = false;
        }
        if(gameStats.inverse){
            if(p1turn){
                p1turn = false;
            }
            else{
                p1turn = true;
            }
        }
        if((p1move.effect.priority ? p1move.effect.priority : 0) > (p2move.effect.priority ? p2move.effect.priority : 0)){
            p1turn = true;
        }
        if((p1move.effect.priority ? p1move.effect.priority : 0) < (p2move.effect.priority ? p2move.effect.priority : 0)){
            p1turn = false;
        }
        //Ability check
        if(p1Character.ability === ("Shiver")){
            if(gameStats.snow){
                p1atk = p1atk * 2;
            }
        }
        if(p1Character.ability === ("LAYD")){
            if(p2move.physical > 0){
                p1stats.hp += p2atk * 0.1
            }
        }
        if(p1Character.ability === ("Speed Run")){
            if((Math.floor(Math.random() * 1000) < 299)){
                p1atk = p1atk * 1.3
            }
        }
        if(p1Character.ability === ("Peanut Butter Paws")){
            p1stats.speed += p1stats.speed * (-0.5);
        }
        if(p1Character.ability === ("Lightweight")){
            if(p1move.name === ("Drawn Instincts")){
                p1stats.attack += p1stats.attack * (0.5);
                p1stats.defense += p1stats.defense * (0.5);
                p1stats.special_attack += p1stats.special_attack * (0.5);
                p1stats.special_defense += p1stats.special_defense * (0.5);
                p1stats.speed += p1stats.speed * (0.5);
            }
        }
        if(p1Character.ability === ("ACL tear")){
            p1stats.speed += p1stats.speed * (-0.5);
            p1stats.attack += p1stats.attack * (0.5);
        }
        //P2//////////////////////////////////////////////////////////////////
        if(p2Character.ability === ("Shiver")){
            if(gameStats.snow){
                p2atk = p2atk * 2;
            }
        }
        if(p2Character.ability === ("LAYD")){
            if(p1move.physical > 0){
                p2stats.hp += p1atk * 0.1
            }
        }
        if(p2Character.ability === ("Speed Run")){
            if((Math.floor(Math.random() * 1000) < 299)){
                p2atk = p2atk * 1.3
            }
        }
        if(p2Character.ability === ("Peanut Butter Paws")){
            p2stats.speed += p2stats.speed * (-0.5);
        }
        if(p2Character.ability === ("Lightweight")){
            if(p2move.name === ("Drawn Instincts")){
                p2stats.attack += p2stats.attack * (0.5);
                p2stats.defense += p2stats.defense * (0.5);
                p2stats.special_attack += p2stats.special_attack * (0.5);
                p2stats.special_defense += p2stats.special_defense * (0.5);
                p2stats.speed += p2stats.speed * (0.5);
            }
        }
        if(p2Character.ability === ("ACL tear")){
            p2stats.speed += p2stats.speed * (-0.5);
            p2stats.attack += p2stats.attack * (0.5);
        }
        //now apply
        if (p1turn){
            p2stats.hp -= p1atk;
            if(!p2stats.hp <= 0){
                p1stats.hp -= p2atk;
            }
        }
        else{
            p1stats.hp -= p2atk;
            if(!p1stats.hp <= 0){
                p2stats.hp -= p1atk;
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
        }
        if (typeof p2move.effect === 'object' && p2move.effect !== null) {
            p2stats.attack += p2stats.attack * ((p2move.effect.atk ? p2move.effect.atk : 0) * 0.5);
            p2stats.defense += p2stats.defense * ((p2move.effect.def ? p2move.effect.def : 0) * 0.5);
            p2stats.special_attack += p2stats.special_attack * ((p2move.effect.spatk ? p2move.effect.spatk : 0) * 0.5);
            p2stats.special_defense += p2stats.special_defense * ((p2move.effect.spdef ? p2move.effect.spdef : 0) * 0.5);
            p2stats.speed += p2stats.speed * ((p2move.effect.spe ? p2move.effect.spe : 0) * 0.5);
        }
            if(gameStats.snow != true && p1move.effect.snow){
                gameStats.snow = true
            }
            if(gameStats.snow != true && p2move.effect.snow){
                gameStats.snow = p2move.effect?.snow
            }
            if(gameStats.inverse != true && p1move.effect.inverse){
                gameStats.inverse = p2move.effect?.inverse
            }
            if(gameStats.inverse != true && p1move.effect.snow){
                gameStats.inverse = p2move.effect?.inverse
            }


    }
    function isGameOver(){
        if (p1stats.hp < 0){
            //add to DB, pop up 
            setWinner(p2username.username);
        }
        else if (p2stats.hp < 0){
            setWinner(p1username.username);
        }
    }
    function handleSetP1Move(move){
        setP1Move(move);
        setP1MovesVisible(false);
    };

    function handleSetP2Move(move){
        setP2Move(move);
        setP2MovesVisible(false);
    };
    function handleNewTurn(){
        handleGameCalcs()
        handleMoveEffects()
        setP1Move({})
        setP2Move({})
        isGameOver();
    };

    return (
    <div className="container">
        {winner === '' ? (
            <>
                <p>{p1Character.name} {p2Character.name} {p1username} {p2username}</p>
                <button onClick={() => setP1MovesVisible(!p1MovesVisible)} disabled={p1MovesVisible}>
                    Toggle {p1Character.name}'s Moves
                </button>
                {p1MovesVisible && (
                    <ul>
                        <button onClick={() => handleSetP1Move(p1Character.moves.move1)}>{p1Character.moves.move1.name}</button>
                        <button onClick={() => handleSetP1Move(p1Character.moves.move2)}>{p1Character.moves.move2.name}</button>
                        <button onClick={() => handleSetP1Move(p1Character.moves.move3)}>{p1Character.moves.move3.name}</button>
                    </ul>
                )}
                <button onClick={() => setP2MovesVisible(!p2MovesVisible)} disabled={p2MovesVisible}>
                    Toggle {p2Character.name}'s Moves
                </button>
                {p2MovesVisible && (
                    <ul>
                        <button onClick={() => handleSetP2Move(p2Character.moves.move1)}>{p2Character.moves.move1.name}</button>
                        <button onClick={() => handleSetP2Move(p2Character.moves.move2)}>{p2Character.moves.move2.name}</button>
                        <button onClick={() => handleSetP2Move(p2Character.moves.move3)}>{p2Character.moves.move3.name}</button>
                    </ul>
                )}
                <p>{p1move.name} {p2move.name}</p>
                <button onClick={handleNewTurn} disabled={!p1move.name || !p2move.name}>
                    Begin Turn?
                </button>
            </>
        ) : (
            <div>{winner}
            <button
            onClick={setScreen("home")}> Return Home
                </button>
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