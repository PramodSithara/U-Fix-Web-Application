import React from 'react';
import { FaAnglesDown } from "react-icons/fa6";

const ServiceDetails = () => {
  return (
    <div className="service-container">
      <div className="service-box">
        <h3 className="service-title"><FaAnglesDown className='down-icon'/>Easily Fix Your Vehical Faults.</h3>
        <p className="service-description">
          We Provide You to How To Fix Your Vehical Step By Step. <br />
          1) Search Fault using Your Identify Falut Specification. <br />
          2) Find How to Fix Fault.
        </p>
      </div>
    </div>
  );
};

export default ServiceDetails;
