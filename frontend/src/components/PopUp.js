import React from 'react';
import './PopUp.css'; 

function PopUp(props) {
  return (
    <div className="popup-container ">
      <div className="popup-content">
        <span className="close" onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </div>
  );
}

export default PopUp;