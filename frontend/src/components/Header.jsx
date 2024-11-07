import React from 'react'
import './styles/Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="nav-main">
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
            <Link className="signin" to="/login">Sign In</Link>
        </div>
    </nav>
  )
}

export default Header