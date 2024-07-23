import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav'
import Panel from './Panel'
import { useNavigate } from 'react-router-dom';
import Login from './Login'

export default function AddFault() {
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
        {role ? <Panel /> : <Login />}
    </>
  )
}
