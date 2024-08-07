import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from "./PokemonUserActions"

const Home = () => {
  const { users } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [currentOwner, setCurrentOwner] = useState({});
  const [isMoving, setIsMoving] = useState(false);
  const [positionStyle, setPositionStyle] = useState({ left: 0, top: 270 });
  const [visibility, setVisibility] = useState('block');

  useEffect(() => {
    const initialize = async () => {
      await dispatch(fetchAllUsers());
    };
    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const firstOwner = users[0];
      setCurrentOwner(firstOwner);
      setPositionStyle({ left: firstOwner.positionX * 25 - 10, top: 300 - firstOwner.positionY * 15 - 10 });
      setVisibility("block");
      setIsMoving(false);
    }
  }, [users]);

  const handleOwnerChange = (userId) => {
    const selectedOwner = users.find(user => user._id === userId);
    if (selectedOwner) {
      setCurrentOwner(selectedOwner);
      setPositionStyle({ left: selectedOwner.positionX * 25 - 10, top: 300 - selectedOwner.positionY * 15 - 20 });
      setVisibility("block");
      setIsMoving(false);
    }
  };

  const positionRef = useRef(positionStyle);

  useEffect(() => {
    positionRef.current = positionStyle;
  }, [positionStyle]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (isMoving) {
        const currentPosition = positionRef.current;

        if (currentPosition.left < 0 || currentPosition.left > 500 || currentPosition.top < 0 || currentPosition.top > 300) {
          setVisibility("none");
        } else {
          const newStyle = { ...currentPosition };
          switch (currentOwner.direction) {
            case "right":
              newStyle.left += currentOwner.speed * 10;
              break;
            case "left":
              newStyle.left -= currentOwner.speed * 10;
              break;
            case "top":
              newStyle.top -= currentOwner.speed * 10;
              break;
            case "bottom":
              newStyle.top += currentOwner.speed * 10;
              break;
            default:
              break;
          }
          setPositionStyle(newStyle);
        }
      }
    }, 1000);
    return () => clearInterval(moveInterval);
  }, [isMoving]);

  const toggleVisibility = () => {
    setVisibility(visibility === 'block' ? 'none' : 'block');
    setIsMoving(false);
  };

  return (
    <div className='homeContainer'>

      <div className='headerHome'>POKEMON OWNERS</div>
      <div className='mainUnique'>
        <div>
          <div className="dropdown">
            <button className="dropbtn">Select Owner</button>
            <div className="dropdown-content">
              {users && users.map(user => (
                <a key={user._id} onClick={() => handleOwnerChange(user._id)}>{user.owner}</a>
              ))}

            </div>
            <input type="text" className="userDetails" value={currentOwner.owner} disabled />
          </div>


          <div className="unique">
            <table>
              <thead>
                <tr>
                  <th>Pokemon Name</th>
                  <th>Pokrmon Ability</th>
                </tr>
              </thead>
              <tbody>
                {currentOwner.pokemons && currentOwner.pokemons.map((pokemon, index) => (
                  <tr key={index}>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.ability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex1">


          <div>
            <div className='controlButtons'>
              <button onClick={() => setIsMoving(true)}>Pokemon Go</button>
              <button onClick={toggleVisibility}>Pokemon flee</button>
              <button onClick={() => setIsMoving(false)}>Pokemon cease</button>
            </div>
            <div className='pokemonDisplay'>


              {currentOwner.pokemons && currentOwner.pokemons.map((pokemon, index) => (
                <div
                  key={index}
                  style={{ position: "relative", top: `${positionStyle.top}px`, left: `${positionStyle.left}px`, display: `${visibility}` }}
                  className='pokemonCharacter'>
                  {pokemon.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
