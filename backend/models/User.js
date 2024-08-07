import mongoose from "mongoose";

const pokemonDatabase = new mongoose.Schema({
    owner:String,
    pokemons:[{
        name:String,
        ability:String,
    }],
    positionX:Number,
    positionY:Number,
    speed:Number,
    direction:String
})

export default mongoose.model("PokemonUsers",pokemonDatabase)