import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()


const app  = express()
app.use(express.json())
app .use(cors())
app.use(bodyParser.json());


import mongoose from "mongoose"
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb successfully")
}catch(e){
    console.log(e)
}


import pokemonUser from "./routes/User.js"

app.use("/api/v1",pokemonUser)

const port = process.env.PORT


app.listen(port,()=>{
    console.log(`Social Media App Running on http://localhost:${port}`)
})

