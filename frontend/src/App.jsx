
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Welcome from './pages/Welcome'
import Course from './pages/Course'
import CourseItem from './pages/CourseItem'

import AdminLayout from './AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import CourseCrud from './pages/admin/CourseCrud'
import CategoryCrud from './pages/admin/CategoryCrud'
import UsersCrud from './pages/admin/UsersCrud'
import InstructorCrud from './pages/admin/InstructorCrud'
import Login from './pages/Login'

import axios from 'axios'
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Profile from './pages/Profile'

import LeanerStatus from './pages/admin/LeanerStatus'

function App() {
  axios.defaults.withCredentials = true;


  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/course/:id" element={<CourseItem />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/courses" element={<CourseCrud />} />
          <Route path="/admin/categories" element={<CategoryCrud />} />
          <Route path="/admin/users" element={<UsersCrud />} />
          <Route path="/admin/instructors" element={<InstructorCrud />} />
          <Route path="/admin/learnerStatus/:id" element={<LeanerStatus />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
