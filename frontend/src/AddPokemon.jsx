import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from './PokemonUserActions'
import { useParams } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast'
import { ClearError, ClearMessage } from './PokemonUserReducer';

const AddPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [selectedAbilityName, setSelectedAbilityName] = useState("");

  const { message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id, name } = useParams();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
        const data = await response.json();
        setPokemonList(data.results);
        setSelectedPokemonUrl(data.results[0].url);
        setSelectedPokemonName(data.results[0].name);
      } catch (error) {
        toast.error("Failed to fetch Pokémon list");
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchAbilities = async () => {
      if (selectedPokemonUrl) {
        try {
          const response = await fetch(selectedPokemonUrl);
          const data = await response.json();
          setPokemonAbilities(data.abilities.map((ab) => ab.ability.name));
          setSelectedAbilityName(data.abilities[0].ability.name);
        } catch (error) {
          toast.error("Failed to fetch Pokémon abilities");
        }
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

  const handlePokemonChange = (e) => {
    const selectedPokemon = pokemonList.find(poke => poke.name === e.target.value);
    setSelectedPokemonUrl(selectedPokemon.url);
    setSelectedPokemonName(e.target.value);
  };

  const handleAbilityChange = (e) => {
    setSelectedAbilityName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(addPokemon(id, selectedPokemonName, selectedAbilityName));
  };

  return (
    <div className='addPokemonContainer'>
      <h1>Add Pokemon to User</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className='formGroup'>
          <label>User:</label>
          <input type="text" value={name} disabled />
        </div>
        <div className='formGroup'>
          <label>Pokemon Name:</label>
          <select onChange={handlePokemonChange} value={selectedPokemonName}>
            {pokemonList.map((poke, index) => (
              <option key={index} value={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>
        </div>
        <div className='formGroup'>
          <label>Pokemon Ability:</label>
          <select onChange={handleAbilityChange} value={selectedAbilityName}>
            {pokemonAbilities.map((ability, index) => (
              <option key={index} value={ability}>
                {ability}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default AddPokemon;
