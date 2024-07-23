import React, { useState, useEffect } from 'react';
import './panel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function DataPanel() {
  const location = useLocation();
  const { item } = location.state || {};
  const baseUrl = process.env.REACT_APP_API_URL_POST;
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    problem: '',
    identification: [''],
    step1: '',
    step2: '',
    step3: ''
  });

  useEffect(() => {
    if (item) {
      const { category, problem, identification, step1, step2, step3 } = item;
      setFormData({
        category,
        problem,
        identification,
        step1,
        step2,
        step3
      });
    }
  }, [item]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const newIdentification = [...formData.identification];
      newIdentification[index] = value;
      setFormData({ ...formData, identification: newIdentification });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addIdentificationField = () => {
    setFormData({ ...formData, identification: [...formData.identification, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, problem, identification, step1, step2, step3 } = formData;
    axios.put(`${baseUrl}/fault/${item._id}`, { category, problem, identification, step1, step2, step3 })
      .then((result) => {
        navigate('/admin');
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="data-panel">
      <form className="data-form" onSubmit={handleSubmit}>
        <div className="data-form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
          </select>
        </div>
        <div className="data-form-group">
          <label htmlFor="problem">Problem:</label>
          <input
            type="text"
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            required
          />
        </div>
        <div className="data-form-group">
          <label>Identification:</label>
          {formData.identification.map((id, index) => (
            <input
              key={index}
              type="text"
              name={`identification-${index}`}
              value={id}
              onChange={(e) => handleChange(e, index)}
              required
            />
          ))}
          <button type="button" className="data-add-btn" onClick={addIdentificationField}>Add More</button>
        </div>
        <div className="data-form-group">
          <label htmlFor="step1">Step 1:</label>
          <input
            type="text"
            id="step1"
            name="step1"
            value={formData.step1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="data-form-group">
          <label htmlFor="step2">Step 2:</label>
          <input
            type="text"
            id="step2"
            name="step2"
            value={formData.step2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="data-form-group">
          <label htmlFor="step3">Step 3:</label>
          <input
            type="text"
            id="step3"
            name="step3"
            value={formData.step3}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="data-submit-btn">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default DataPanel;
