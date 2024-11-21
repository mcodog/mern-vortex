import React, { useState, useEffect } from 'react'

import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";

import { Link, useLocation } from 'react-router-dom'

import Divider from '@mui/material/Divider';


const SideBar = () => {
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/admin') setCurrentPage('Dashboard');
    else if (currentPath === '/admin/courses') setCurrentPage('Courses');
    else if (currentPath === '/admin/categories') setCurrentPage('Categories');
    else if (currentPath === '/admin/users') setCurrentPage('Users');
    else if (currentPath === '/admin/instructors') setCurrentPage('Instructors');
    else if (currentPath.startsWith('/admin/learnerStatus/')) setCurrentPage('learnerStatus');
  }, [location]);

  return (
    <div className="admin-sidebar">
      <div className="profile-view">
        <div className="profile-details">
          <span className="name-display">John Doe</span>
          <span className="passive">Profile</span>
        </div>

        <div className="profile-img">
          <div className="rounded-img-container">
            <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="User" />
          </div>
        </div>
      </div>

      <div className="nav-panel">

      <Link to="/admin" className={`nav-slot ${currentPage === "Dashboard" ? 'active' : ""}`}>
        <MdDashboard /> &nbsp; Dashboard
      </Link>
      <Link to="/admin/courses" className={`nav-slot ${currentPage === "Courses" ? 'active' : ""}`}>
        <GiWhiteBook /> &nbsp; Courses
      </Link>
      <Link to="/admin/learnerStatus/673e666ef7a0cc21abcea00b" className={`nav-slot ${currentPage === "learnerStatus" ? 'active' : ""}`}>
        <GiWhiteBook /> &nbsp; Learners' Status
      </Link>
      <Divider />
      <h5 className='padding-left light-pale'>Common CRUD</h5>
      <Link to="/admin/users" className={`nav-slot ${currentPage === "Users" ? 'active' : ""}`}>
        <FaUsers /> &nbsp; Users
      </Link>
      <Link to="/admin/instructors" className={`nav-slot ${currentPage === "Instructors" ? 'active' : ""}`}>
        <FaChalkboardTeacher /> &nbsp; Instructors
      </Link>
      <Link to="/admin/categories" className={`nav-slot ${currentPage === "Categories" ? 'active' : ""}`}>
        <SiBookstack /> &nbsp; Course Categories
      </Link>
           
      </div>
    </div>
  )
}

export default SideBar