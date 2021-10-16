import React from "react";

function Popup({ setEmpty, text }) {
  return (
    <div className="popup">
      <p className="popup-text">{text}</p>
      <button className="popup-button" onClick={setEmpty}>
        OK
      </button>
    </div>
  );
}

export default Popup;
