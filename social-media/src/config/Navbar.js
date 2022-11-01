import React, { useState } from 'react'
import "./navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
const Navbar = () => {
    const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
    <Link to="/" onClick={() => setTab("/")}>
      {tab === "/" ? <HomeIcon /> : <HomeOutlinedIcon />}
    </Link>


    <Link to="/search" onClick={() => setTab("/search")}>
      {tab === "/search" ? (
        <PersonSearchIcon />
      ) : (
        <PersonSearchOutlinedIcon />
      )}
    </Link>
    


    <Link to="/account" onClick={() => setTab("/account")}>
      {tab === "/account" ? (
        <AccountCircleIcon /> 
        
      ) : (
        <AccountCircleOutlinedIcon />
      )}
    </Link>
  </div>
)
}

export default Navbar