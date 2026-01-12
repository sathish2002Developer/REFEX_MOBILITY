import React, { useEffect } from 'react'
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom'
import './Admin.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    if (!isLoggedIn) {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminLoginTime')
    navigate('/admin')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="admin-logout-button">
            <i className="fa fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin/dashboard" className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}>
              <i className="fa fa-home"></i> Dashboard
            </Link>
            <Link to="/admin/dashboard/investor-relations" className={`admin-nav-item ${isActive('/admin/dashboard/investor-relations') ? 'active' : ''}`}>
              <i className="fa fa-file-alt"></i> Investor Relations
            </Link>
          </nav>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

