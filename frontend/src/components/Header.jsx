import React, { useState, useEffect } from 'react'
import './styles/Header.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth/AuthContext';
import Fab from '@mui/material/Fab';
import { FaUser } from "react-icons/fa";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import toast from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false)
  const open = Boolean(anchorEl);

  const handleScroll = () => {
    if (window.scrollY >= 800) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:8000/auth/logout`)
      toast.loading('Logging out...')
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <nav className={`nav-main ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
      <div className="nav-col nav-left">
        <Link className="site-title" to="/">VORTEX</Link>
        <div className="nav-list">
          {/* <!-- <a href="/" className="nav-link" data-nav="home">Home</a> --> */}
          <Link to="/courses" className="nav-link" data-nav="courses">Courses</Link>
          {/* <!-- <Link href="/promos" className="nav-link" data-nav="promos">Promos</Link> --> */}
          <Link href="/workwithus" className="nav-link" data-nav="work">Work with Us</Link>
          <Link href="/about" className="nav-link" data-nav="about">About Us</Link>
          <Link href="" className="nav-link" data-nav="about">Support</Link>
        </div>
      </div>
      <div className="nav-col nav-right">
        <Link href="">Contact Sales</Link>
        {
          isAuthenticated ? (
            <Fab
              size="small"
              aria-label="profile"
              sx={{
                backgroundColor: 'darkGray',
                width: 30,
                height: 30,
                minHeight: 'auto',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <FaUser style={{ fontSize: '10px' }} />
            </Fab>
          ) : (
            <Link className="signin" to="/login">Sign In</Link>
          )
        }
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className='remove-a-style'
        >
          <Link to="/profile">
            <MenuItem>
              Profile
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  )
}

export default Header