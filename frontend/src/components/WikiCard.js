import PropTypes from 'prop-types';

function WikiCard({ character }) {

  function generateBars(value) {
    const bars = [];
    for (let i = 0; i < value / 10; i++) {
      let color;
      if (i < 7) {
        color = 'red';
      } else if (i < 14) {
        color = 'yellow';
      } else if (i < 21) {
        color = 'green';
      } else if (i < 28) {
        color = 'blue';
      } else {
        color = 'purple';
      }
      bars.push(<span key={i} style={{ color }}>|</span>);
    }
    return bars;
  }

  function getBoxColor(move) {
    let color;
    if (move.physical > move.special) {
      color = "#D3494E";
    } else if (move.physical < move.special) {
      color = "#658CBB";
    } else {
      color = "#7BB274";
    }
    return color;
  }

  return (
    <div
      id={character.name.toLowerCase().replace(/\s/g, '_')}
      style={{
        border: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '20px',
        fontFamily: 'Gill Sans, monospace',
        width: '75%',
        margin: '0 auto',
        backgroundColor: 'white'
      }}
    >
      <h3>{character.name}</h3>
      <div style={{ display: 'flex' }}>
      <img src={character.picture} style={{ marginRight: '20px' }} alt={character.name} />
        <div>
          <h5>Description:</h5>
          <p>{character.description}</p>
          <h5>Ability: {character.ability}</h5>
          <p>{character.abildesc}</p>
          <h5>Moves:</h5>
          {Object.values(character.moves).map((move, index) => (
            <div
              key={index}
              className="box"
              style={{
                backgroundColor: getBoxColor(move),
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px'
              }}
            >
              <h6>{move.name}</h6>
              <p>{move.description}</p>
            </div>
          ))}
        </div>
      </div>
      <h5 style={{ paddingTop: '2%' }}>Stats:</h5>
      <p>Speed:.......... {generateBars(character.stats.speed)} {character.stats.speed}</p>
      <p>Luck:........... {generateBars(character.stats.luck)} {character.stats.luck}</p>
      <p>Attack:......... {generateBars(character.stats.attack)} {character.stats.attack}</p>
      <p>Special Attack:. {generateBars(character.stats.special_attack)} {character.stats.special_attack}</p>
      <p>Defense:........ {generateBars(character.stats.defense)} {character.stats.defense}</p>
      <p>Special Defense: {generateBars(character.stats.special_defense)} {character.stats.special_defense}</p>
      <p>Health Points:.. {generateBars(character.stats.hp)} {character.stats.hp}</p>
    </div>
  );
}

WikiCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    ability: PropTypes.string,
    abildesc: PropTypes.string,
    moves: PropTypes.shape({
      move1: PropTypes.shape({
        name: PropTypes.string,
        physical: PropTypes.number,
        special: PropTypes.number,
        description: PropTypes.string
      }),
      move2: PropTypes.shape({
        name: PropTypes.string,
        physical: PropTypes.number,
        special: PropTypes.number,
        description: PropTypes.string
      }),
      move3: PropTypes.shape({
        name: PropTypes.string,
        physical: PropTypes.number,
        special: PropTypes.number,
        description: PropTypes.string
      })
    }),
    stats: PropTypes.shape({
      speed: PropTypes.number,
      luck: PropTypes.number,
      attack: PropTypes.number,
      special_attack: PropTypes.number,
      defense: PropTypes.number,
      special_defense: PropTypes.number,
      hp: PropTypes.number
    }),
    image: PropTypes.string
  }).isRequired
};

export default WikiCard;
