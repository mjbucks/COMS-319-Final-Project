import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

import PropTypes from "prop-types";

export function ViewGame({p1Character, p2Character, setScreen, p1username, p2username, p1move, p2move}) {
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
    //get 2 for each player
    const p1stats = {...statBoostTracker};
    const p2stats = {...statBoostTracker};
    const gameStats = {...statBoostTracker};

    p1stats.hp = p1Character.stats.hp
    p2stats.hp = p2Character.stats.hp

    const handleGameCalcs = () => {
        //do stat increases here
        let p1crit = ((Math.floor(Math.random() * 1000) <= p1Character.stats.luck) && p2Character.ability !== "Point guard") ? 2.5 : 1;
        let p2crit = ((Math.floor(Math.random() * 1000) <= p2Character.stats.luck) && p1Character.ability !== "Point guard") ? 2.5 : 1;
        var p1atk = (((52 * p1move.physical * ((p1Character.stats.attack * p1stats.attack)/ (p2Character.stats.defense * p2stats.defense)))/50) + 2);
        p1atk = p1atk + (((52 * p1move.special * ((p1Character.stats.special_attack * p1stats.special_attack)/ (p2Character.stats.special_defense * p2stats.special_defense)))/50) + 2)* p1crit;//Crit rate at the end
        var p2atk = (((52 * p2move.physical * ((p2Character.stats.attack * p2stats.attack) / (p1Character.stats.defense * p1stats.defense)))/50) + 2);
        p2atk = p2atk + (((52 * p2move.special * ((p2Character.stats.special_attack * p2stats.special_attack) / (p1Character.stats.special_defense * p1stats.special_defense)))/50) + 2)* p2crit;

        //Ability check
        if(p1Character.ability.equals("Shiver")){
            if(gameStats.snow){
                p1atk = p1atk * 2;
            }
        }
        if(p1Character.ability.equals("LAYD")){
            if(p2move.physical > 0){
                p1stats.hp += p2atk * 0.1
            }
        }
        if(p1Character.ability.equals("Speed Run")){
            if((Math.floor(Math.random() * 1000) < 299)){
                p1atk = p1atk * 1.3
            }
        }
        if(p1Character.ability.equals("Peanut Butter Paws")){
            if((Math.floor(Math.random() * 1000) < 299)){
                p1atk = p1atk * 1.3
            }
        }
        if(p1Character.ability.equals("LightWeight")){
            if((Math.floor(Math.random() * 1000) < 299)){
                p1atk = p1atk * 1.3
            }
        }
    };
    const handleMoveEffects = () => {
        if(!p1move.effect.equals("none")){
            //add effects
            p1stats.attack += p1stats.attack * (p1move.effect?.atk * 0.5);
            p1stats.defense += p1stats.defense * (p1move.effect?.def * 0.5);
            p1stats.special_attack += p1stats.special_attack * (p1move.effect?.spatk * 0.5);
            p1stats.special_defense += p1stats.special_defense * p1move.effect?.spdef * 0.5;
            p1stats.speed += p1stats.speed * (p1move.effect?.spe * 0.5);
            p1stats.priority = p1move.effect?.priority;

            p2stats.attack += p2stats.attack * (p2move.effect?.atk * 0.5);
            p2stats.defense += p2stats.defense * (p2move.effect?.def * 0.5);
            p2stats.special_attack += p2stats.special_attack * (p2move.effect?.spatk * 0.5);
            p2stats.special_defense += p2stats.special_defense * (p2move.effect?.spdef * 0.5);
            p2stats.speed += p2stats.speed * (p2move.effect?.spe * 0.5);
            p1stats.priority = p2move.effect?.priority;

            if(gameStats.snow !== true){
                gameStats.snow = p1move.effect?.snow
            }
            if(gameStats.snow !== true){
                gameStats.snow = p2move.effect?.snow
            }
            if(gameStats.inverse !== true){
                gameStats.inverse = p2move.effect?.inverse
            }
            if(gameStats.inverse !== true){
                gameStats.inverse = p2move.effect?.inverse
            }

        }
    }
    return (
        <div className="container">
            <p>{p1Character.name} {p2Character.name} {p1username.username} {p2username.username}</p>
        </div>
    );
}
ViewGame.propTypes = {
    P1Character: PropTypes.func,
    P2Character: PropTypes.func,
    setScreen: PropTypes.func,
    p1username: PropTypes.string,
    p2username: PropTypes.string,
    p1move: PropTypes.func,
    p2move: PropTypes.func
  };
  
  export default ViewGame;
