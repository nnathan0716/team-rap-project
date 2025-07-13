import React from 'react';
import '../css/Alert.css'; // Import the CSS file for styling

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
};

export default Alert;
