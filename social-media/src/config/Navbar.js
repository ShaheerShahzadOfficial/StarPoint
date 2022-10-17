import React, { useState } from 'react'
import "./navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';

const Navbar = () => {
    const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
    <Link to="/" onClick={() => setTab("/")}>
      {tab === "/" ? <HomeIcon style={{ color: "rgb(0, 0, 255)" }} /> : <HomeOutlinedIcon />}
    </Link>

    <Link to="/watch" onClick={() => setTab("/watch")}>
      {tab === "/watch" ? (
        <OndemandVideoTwoToneIcon style={{ color: "rgb(0, 0, 255)" }} />
      ) : (
        <OndemandVideoIcon/>
      )}
    </Link>

    {/* <Link to="/search" onClick={() => setTab("/search")}>
      {tab === "/search" ? (
        <SearchIcon style={{ color: "rgb(0, 0, 255)" }} />
      ) : (
        <SearchOutlinedIcon />
      )}
    </Link> */}

    <Link to="/account" onClick={() => setTab("/account")}>
      {tab === "/account" ? (
        <AccountCircleIcon style={{ color: "rgb(0, 0, 255)" }} />
      ) : (
        <AccountCircleOutlinedIcon />
      )}
    </Link>
  </div>
)
}

export default Navbar