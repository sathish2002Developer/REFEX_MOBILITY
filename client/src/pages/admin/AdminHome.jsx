import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h2>Welcome to Admin Dashboard</h2>
      <div className="admin-cards-grid">
        <Link to="/admin/dashboard/website-home" className="admin-card">
          <div className="admin-card-icon"><i className="fa fa-globe"></i></div>
          <h3>Website CMS</h3>
          <p>Edit Website Home, Drive For Us, Business Commute, Terms, Privacy Policy, and Refunds content (design unchanged)</p>
        </Link>
        <Link to="/admin/dashboard/investor-relations" className="admin-card">
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

