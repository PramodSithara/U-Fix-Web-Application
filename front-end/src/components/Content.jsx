import React from 'react';
import { FaSistrix, FaMedkit, FaHammer } from 'react-icons/fa';

const ContentBox = () => {
  return (
    <div className="content-container">
      <div className="box">
        <div className="icon-wrapper">
          <FaSistrix />
        </div>
        <h3 className="title">Fault Identify</h3>
        <p className="description">Identify Your Vehical Fault.</p>
      </div>
      <div className="box">
        <div className="icon-wrapper">
          <FaMedkit />
        </div>
        <h3 className="title">Find Solutions</h3>
        <p className="description">Find Solutions using Fault Identification.</p>
      </div>
      <div className="box">
        <div className="icon-wrapper">
          <FaHammer />
        </div>
        <h3 className="title">Fix</h3>
        <p className="description">Fix Faults by Your Self.</p>
      </div>
    </div>
  );
};

export default ContentBox;
