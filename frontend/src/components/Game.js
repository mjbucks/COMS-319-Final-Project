import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

import PropTypes from "prop-types";

export function ViewGame({p1Character, p2Character, setScreen, p1username, p2username, p1move, p2move}) {
    const statBoostTracker = {
        attack: 0,
        special_attack: 0,
        speed: 0,
        defense: 0,
        special_defense: 0,
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
        var p1atk = (((52 * p1move.physical * (p1Character.stats.attack / p2Character.stats.defense))/50) + 2);
        p1atk = p1atk + (((52 * p1move.special * (p1Character.stats.special_attack / p2Character.stats.special_defense))/50) + 2);
        var p2atk = (((52 * p2move.physical * (p2Character.stats.attack / p1Character.stats.defense))/50) + 2);
        p2atk = p2atk + (((52 * p2move.special * (p2Character.stats.special_attack / p1Character.stats.special_defense))/50) + 2);
    };
    const handleMoveEffects = () => {
        //if mountain
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
