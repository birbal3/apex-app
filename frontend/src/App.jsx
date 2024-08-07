import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Home'
import AddUser from './AddUser'
import ListOfPokemonUser from './ListOfPokemonUser'
import AddPokemon from './AddPokemon'
import Navbar from './Navbar'
import image from "./image.jpg"

function App() {

  return (
    <div >
      <Router>
        <img src={image} className='bgimg'/>
        <Navbar/>
        <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/adduser' element={<AddUser/>}/>
          <Route exact path='/listusers' element={<ListOfPokemonUser/>}/>
          <Route exact path='/addpokemon/:id/:name' element={<AddPokemon/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
