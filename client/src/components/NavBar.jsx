import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTools } from "react-icons/fa";
import axios from 'axios';

export default function NavBar() {
  const baseUrl = process.env.REACT_APP_API_URL
  const [response, setResponse] = useState('');
  const location = useLocation();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    

    if (token) {
      const fetchData = async () => {
        try {
          const userData = await axios.post( baseUrl+"/profile", { token })
          setResponse(userData.data.data.email);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className='subconatiner'>
      <div className='name'>
        <Link to="/" className='textcustom'>
          <h2><FaTools className='fix-icon' />U-Fix</h2>
        </Link>
      </div>
      <div className='panel'>
        {location.pathname === '/home' ? (
          <>
          <span className='response'>{response} </span>
          <button onClick={handleLogout} className='link'>
            <span className='logout'>Logout</span>
          </button>
          </>
        ) : (
          <>
            <Link to="/login" className='link'><p>Login</p></Link>
            <Link to='/register' className='link'><p>Register</p></Link>
          </>
        )}
      </div>
      
    </div>
  );
}
