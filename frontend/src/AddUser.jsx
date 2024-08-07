import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./PokemonUserActions.js";
import { ClearError, ClearMessage } from "./PokemonUserReducer.js";
import toast,{Toaster} from 'react-hot-toast'

const AddUser = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  const [ownerName, setOwnerName] = useState("");
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [selectedAbilityName, setSelectedAbilityName] = useState("");
  const [positionX, setPositionX] = useState(1);
  const [positionY, setPositionY] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState("right");

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.user);

  const handlePokemonChange = (e) => {
    const selectedPokemon = pokemonList.find((poke) => poke.name === e.target.value);
    setSelectedPokemonUrl(selectedPokemon.url);
    setSelectedPokemonName(e.target.value);
  };

  const handleAbilityChange = (e) => {
    setSelectedAbilityName(e.target.value);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
      const data = await response.json();
      setPokemonList(data.results);
      setSelectedPokemonUrl(data.results[0].url);
      setSelectedPokemonName(data.results[0].name);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchAbilities = async () => {
      if (selectedPokemonUrl.length > 0) {
        const response = await fetch(selectedPokemonUrl);
        const data = await response.json();
        setPokemonAbilities(data.abilities.map((ab) => ab.ability.name));
        setSelectedAbilityName(data.abilities[0].ability.name);
      }
    };
    fetchAbilities();
  }, [selectedPokemonUrl]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearError());
    }
    if (message) {
      toast.success(message);
      dispatch(ClearMessage());
    }
  }, [dispatch, error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addUser(
        ownerName,
        selectedPokemonName,
        selectedAbilityName,
        positionX,
        positionY,
        speed,
        direction
      )
    );
  };

  return (
    <div className="addUserContainer">
      <h1>Add Pokemon Owner</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Pokemon Owner Name</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Pokemon Name</label>
          <select onChange={handlePokemonChange}>
            {pokemonList.map((poke, index) => (
              <option key={index} value={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label>Pokemon Ability</label>
          <select onChange={handleAbilityChange}>
            {pokemonAbilities.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label>Initial Position X</label>
          <input
            type="number"
            value={positionX}
            onChange={(e) => setPositionX(e.target.value)}
            min="1"
            max="20"
            required
          />
        </div>

        <div className="formGroup">
          <label>Initial Position Y</label>
          <input
            type="number"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
            min="1"
            max="20"
            required
          />
        </div>

        <div className="formGroup">
          <label>Speed</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="formGroup">
          <label>Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="right">Right</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
          </select>
        </div>

        <button type="submit">Add User</button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddUser;
