import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

import PropTypes from "prop-types";

export function ViewGame({p1Character, p2Character, setScreen, p1username, p2username, p1move, p2move}) {
    const statBoostTracker = {
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

    const handleGameCalcs = () => {
        //do stat increases here
        var p1atk = (((52 * p1move.physical * ((p1Character.stats.attack * p1stats.attack)/ (p2Character.stats.defense * p2stats.defense)))/50) + 2);
        p1atk = p1atk + (((52 * p1move.special * ((p1Character.stats.special_attack * p1stats.special_attack)/ (p2Character.stats.special_defense * p2stats.special_defense)))/50) + 2);//Crit rate at the end
        var p2atk = (((52 * p2move.physical * ((p2Character.stats.attack * p2stats.attack) / (p1Character.stats.defense * p1stats.defense)))/50) + 2);
        p2atk = p2atk + (((52 * p2move.special * ((p2Character.stats.special_attack * p2stats.special_attack) / (p1Character.stats.special_defense * p1stats.special_defense)))/50) + 2);
    };
    const handleMoveEffects = () => {
        if(!p1move.effect.equals("none")){
            //add effects
            p1stats.attack += p1move.effect.atk * 0.5
            p1stats.defense += p1move.effect.def * 0.5
            p1stats.special_attack += p1move.effect.spatk * 0.5
            p1stats.special_defense += p1move.effect.spdef * 0.5
            p1stats.speed += p1move.effect.spe * 0.5

            p2stats.attack += p2move.effect.atk * 0.5
            p2stats.defense += p2move.effect.def * 0.5
            p2stats.special_attack += p2move.effect.spatk * 0.5
            p2stats.special_defense += p2move.effect.spdef * 0.5
            p2stats.speed += p2move.effect.spe * 0.5
        }
    }
    return (
        <div className="container">
            <p>{p1Character.name} {p2Character.name} {p1username} {p2username}</p>
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
