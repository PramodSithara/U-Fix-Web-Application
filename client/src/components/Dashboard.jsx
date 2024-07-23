import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import Main from './Main';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      setToken(urlToken);
    } else {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      } else {
        navigate('/login');
      }
    }
  }, [navigate, location.search]);

  return (
    <>
      <NavBar />
      {token ? <Main token={token} /> : <Login />}
    </>
  );
};

export default Dashboard;
