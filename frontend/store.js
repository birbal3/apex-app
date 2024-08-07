import { configureStore } from "@reduxjs/toolkit";
import pokemonUserReducer from "./src/PokemonUserReducer"

const store = configureStore({
    reducer:{
        "user":pokemonUserReducer
    }
})

export default store