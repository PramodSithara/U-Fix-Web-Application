import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './panel.css'

export default function AdminNav() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const newRole = localStorage.getItem('role');
        if (newRole) {
          setRole(newRole);
        } else {
            navigate('/login');
          }
      }, [navigate]);

      const handleLogout = () => {
        localStorage.removeItem('role');
        window.location.href = '/login';
      };


  return (
    <nav className="data-navbar">
        <div className="data-head">
            <Link className="newlink" to='/admin'><h2>Admin Panel</h2></Link>
        </div>
        <div className="data-out">
            <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
  )
}
