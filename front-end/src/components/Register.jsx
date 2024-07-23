import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Register = () => {
  const [userName, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const baseUrl = process.env.REACT_APP_API_URL
  console.log(baseUrl)


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post( baseUrl+"/register", { userName, email, password})
    .then((result) => {
      navigate('/login')
    })
    .catch((err) => {
      setError(err.response.data)
    })
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-image" ></div>
        <div className="register-form">
          <h2 className="form-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="register-button">Register</button>
            <p>Do You Have a Account <Link to="/login" className='custom-link'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
