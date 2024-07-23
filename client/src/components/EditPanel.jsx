import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'
import AdminNav from './AdminNav';
import Edit from './Edit';

export default function EditPanel() {
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
        {role ? <Edit /> : <Login />}
    </>
  )
}
