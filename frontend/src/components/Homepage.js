import "../styles/homepage.css";
import homelogo from "../HomepageImages/homelogo.jpg";
import PropTypes from 'prop-types';

export default function Homepage({
    p1User, p2User, setScreen
}) {
    return (
        <div className="container">
            <div className="user-greetings">
                <div className="left-greeting">Hello {p1User.username} ({p1User.win}-{p1User.loss})</div>
                <button className="play-button" onClick={() => setScreen('chooseCharacter')}>Play</button>
                <div className="right-greeting">Hello {p2User.username} ({p2User.win}-{p2User.loss})</div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h2>About The Game</h2>
                </div>
                <div className="card-body">
                    <div className="description">
                        <p>Battle Buddies is a web-based game where players can battle one another as their friends reimagined as powerful beings!
                            Select your character that you want to play as and create a strategy to ensure your success! The wiki 
                            was created in anticipation of the full game's release, some of the stated statistics are subject to change.
                            These changes could include but are not limited to stat changes, move changes, or new characters.
                        </p>
                    </div>
                    <div className="image-container">
                        <img src={homelogo} alt="About The Game Image" />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>How to Play?</h2>
                </div>
                <div className="card-body">
                    <div className="description">
                        <p>You play by not being gay... Thoughts?
                        </p>
                    </div>
                    <div className="image-container">
                        <img alt="How to Play Image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

Homepage.propTypes = {
    p1User: PropTypes.string,
    p2User: PropTypes.string,
    setScreen: PropTypes.func
};
