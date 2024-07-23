import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Register = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const baseUrl = process.env.REACT_APP_API_URL
  const google = process.env.REACT_APP_GOOGLE

  const handleGoogleLogin = () => {
    window.location.href = google+"/google";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post( baseUrl+"/login", { email, password})
    .then((result) => {
      if(result.data === 'admin'){
        localStorage.setItem('role', result.data)
        navigate('/admin')
      }else{
        localStorage.setItem('token', result.data)
        navigate('/home')
      }
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
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="register-button">Login</button>
            <p>You Don't Have a Account <Link to="/register" className='custom-link'>Register</Link></p>
          </form>
          <div className="google-signin">
            <button onClick={handleGoogleLogin} className="google-button">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;