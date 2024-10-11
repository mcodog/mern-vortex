import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './pages/admin/styles/Admin.css'
import SideBar from './pages/admin/SideBar'

const AdminLayout = () => {
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/admin') setCurrentPage('Dashboard');
    else if (currentPath === '/admin/courses') setCurrentPage('Courses');
    else if (currentPath === '/admin/categories') setCurrentPage('Categories');
    else if (currentPath === '/admin/users') setCurrentPage('Users');
    else if (currentPath === '/admin/instructors') setCurrentPage('Instructors');
  }, [location]);

  return (
    <div className="admin-layout">
        <SideBar />
        <div className="main-app">
            <div className="top-display">
                <span>{currentPage}</span>
            </div>
            <div className="main-display">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default AdminLayout