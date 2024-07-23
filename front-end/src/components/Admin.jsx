import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from './Panel';
import Login from './Login'
import AdminDash from './AdminDash';
import AdminNav from './AdminNav';

export default function Admin() {
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
  
  
    return (
    <>
        <AdminNav />
        {role ?<AdminDash /> : <Login />}
    </>
    
  )
}
