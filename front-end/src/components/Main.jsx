import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownFetch = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [solutionData, setSolutionData] = useState(null);
  const baseurl = process.env.REACT_APP_API_URL_POST;

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Popup Window
  const toggleModal = (solution) => {
    if (solution) {
      setSolutionData(solution);
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (selectedOption) {
      axios.get(`${baseurl}/fault/${selectedOption}`, {
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
    <div className="dropdown-fetch-container">
      <h1>Fault Detection System</h1>
      <div className="input-group">
        <label htmlFor="dropdown">Select Vehicle Type:</label>
        <select id="dropdown" className="dropdown" onChange={handleSelectChange}>
          <option value="">Select Vehical</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="search-box">Search Fault :</label>
        <input
          id="search-box"
          type="text"
          className="search-box"
          placeholder="Engine Boil..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h2><center><u>Solutions</u></center></h2>
            {solutionData && (
              <div>
                <p><strong>Problem :</strong> {solutionData.problem}</p>
                <p><strong>Occured Fault :</strong> {solutionData.identification[0]} - {solutionData.identification[1]}</p><br/>
                <center><p><strong>Applicable Solution:</strong> </p></center>
                <p>1) {solutionData.step1}</p>
                <p>2) {solutionData.step2}</p>
                <p>3) {solutionData.step3}</p>
              </div>
            )}
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Data Display */}
      {data.length > 0 ? (
        <div className="data-container">
          <h3>Fault List:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index} className="data-item">
                <p><strong>Faults:</strong> {item.identification[0]} , {item.identification[1]}</p>
                <p><strong>Problem:</strong> {item.problem}</p>
                <button onClick={() => toggleModal(item)} className="data-button">Solution</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="data-container">
          <h3>No data found</h3>
        </div>
      )}
    </div>
  );
};

export default DropdownFetch;
