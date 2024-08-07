import React from 'react'
import { Link } from 'react-router-dom'
import homeicon from "./homeicon.png"

const Navbar = () => {
  return (
    <div className='navDiv'>
      <nav>
        <Link to="/"><img src={homeicon} className="icon" /></Link>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adduser">Add User</Link></li>
            <li><Link to="/listusers">List All Users</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
