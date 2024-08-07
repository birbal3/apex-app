import express from "express"
const router = express.Router()
import PokemonUser from "../models/User.js"

router.put("/addpokemonuser",async (req,res)=>{
    try{
        const {owner,name,ability,positionX,positionY,speed,direction} = req.body;
        await PokemonUser.create({
            owner,
            pokemons:[{name,ability}],
            positionX,
            positionY,
            speed,
            direction
        });

        res.status(200).json({success:true,message:"User Added"})

    }catch(error){
        console.log(error)
        res.status(500).json({success:true,message:error.message})
    }
})  

router.get("/getallusers",async (req,res)=>{
    try{
        const users = await PokemonUser.find();

        res.status(200).json({success:true,users})

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
})

router.put("/addpokemontouser",async (req,res)=>{
    try {
        const {id,name,ability} = req.body;

        const user = await PokemonUser.findById(id);

        const newPokemon = {name,ability};

        user.pokemons.push(newPokemon)

        await user.save()

        res.status(200).json({success:true,message:"Pokemon Added"})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

router.delete("/removeuser",async (req,res)=>{
    try {
        const {id} = req.body;

        await PokemonUser.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"User Deleted"})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

router.delete("/removealluser",async (req,res)=>{
    try {

        await PokemonUser.deleteMany()
        res.status(200).json({success:true,message:"All Users Deleted"})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})


export default router
