import React from "react";
import author1Image from "../authorImages/max_A.jpg";
import author2Image from "../authorImages/tate_A.jpg";
import PropTypes from 'prop-types';

export function Authors({setScreen}) {

    const handleBack = () =>{
        setScreen('home');
    };

    return (
        <div>
            <div style={{ marginTop: "20px", textAlign: "center", marginLeft: '20px', marginRight: '20px' }}>
                <h2>COM S 319: Construction of User Interfaces</h2>
                <p>The date is 05/4/2024. This is our final project for COMS 319, a course taught by Dr. Abraham Aldaco at Iowa State University. In this project, Tate and Max have made a turn based game in which players select moves and play against each other on the same local machine.</p>
                <p>Professor contacts:</p>
                <p>Abraham Aldaco, Ph.D. Email: aaldaco@iastate.edu</p>
                <p> Ali Jannesari, Ph.D. Email: jannesar@iastate.edu</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
                <div style={cardStyle}>
                    <img src={author1Image} alt="Author 1" style={imageStyle} />
                    <div style={contentStyle}>
                        <h3>Max</h3>
                        <p>Contact Max: <a href="mailto:mrohrer@iastate.edu">mrohrer@iastate.edu</a></p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <img src={author2Image} alt="Author 2" style={imageStyle} />
                    <div style={contentStyle}>
                        <h3>Tate</h3>
                        <p>Contact Tate: <a href="mailto:tatmyers@iastate.edu">tatmyers@iastate.edu</a></p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button onClick={handleBack} style={buttonStyle}>Back</button>
    </div>
        </div>
    );
}

const cardStyle = {
    width: "40%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    backgroundColor: "white"
};
const buttonStyle = {
    backgroundColor: '#081f5c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

const imageStyle = {
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
};

const contentStyle = {
    padding: "20px",
};

Authors.propTypes = {
    setScreen: PropTypes.func.isRequired,
};
export default Authors;