import React from 'react';
import '../css/Alert.css'; // Import the CSS file for styling

const Alert = ({ message, onClose, type }) => {
  return (
    <div className="alert" style={{ backgroundColor: type === "bad" ? "#f44336" : "#0d9929" }}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
};

export default Alert;
