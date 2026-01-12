import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h2>Welcome to Admin Dashboard</h2>
      <div className="admin-cards-grid">
        <Link to="/admin/investor-relations" className="admin-card">
          <div className="admin-card-icon">
            <i className="fa fa-file-alt"></i>
          </div>
          <h3>Investor Relations</h3>
          <p>Manage investor relations content, files, and sections</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminHome

