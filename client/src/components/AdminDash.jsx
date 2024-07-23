import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDash.css';
import AddFault from './AddFault';

const DropdownFetch = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const editRoute = (item) => {
    navigate('/edit', { state: { item } });
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:5000/api/v1/fault/${id}`);
      alert('Record deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('There was an error deleting the record!', error);
      alert('Error deleting the record!');
    }
  };


  useEffect(() => {
    if (selectedOption) {
      axios.get(`http://localhost:5000/api/v1/fault/${selectedOption}`, {
        params: { search: searchTerm }
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [selectedOption, searchTerm]);

  return (
    <div className="dropdown-fetch-wrapper">
      <div className="dropdown-group">
        <label htmlFor="vehicle-dropdown">Select Vehicle Type:</label>
        <select id="vehicle-dropdown" className="vehicle-dropdown" onChange={handleSelectChange}>
          <option value="">Select Vehicle</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
        </select>
      </div>
      <div className="search-group">
        <label htmlFor="fault-search">Search Fault:</label>
        <input
          id="fault-search"
          type="text"
          className="fault-search"
          placeholder="Engine Boil..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
          <Link to='/add'><button className='admin-dash-btn admin-dash-btn-primary'>Add Data</button></Link>
      </div>


      {/* Data Display */}
      {data.length > 0 ? (
        <div className="data-list">
          <h3 className="data-title">Fault List:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index} className="data-item">
                <p><strong>Vehical:</strong> {item.category}</p>
                <p><strong>Faults:</strong> {item.identification[0]}, {item.identification[1]}</p>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p><strong>Step 1:</strong> {item.step1}</p>
                <p><strong>Step 2:</strong> {item.step2}</p>
                <p><strong>Step 3:</strong> {item.step3}</p>
                <button className="admin-dash-btn admin-dash-btn-primary" onClick={() => editRoute(item)}>Edit</button>
                <button className="admin-dash-btn admin-dash-btn-secondary" onClick={() => handleDelete(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-data">
          <h3>No data found</h3>
        </div>
      )}
    </div>
  );
};

export default DropdownFetch;
