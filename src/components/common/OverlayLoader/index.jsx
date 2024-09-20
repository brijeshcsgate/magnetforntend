// src/Modal.js
import React from "react";
import ReactDOM from "react-dom";
import "./style.css"; // Optional, for styling
import loadergif from "../../../assets/images/UpsrtcLoadingAnimation.gif";
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="">
        <img src={loadergif} alt="...loading" />
      </div>
    </div>
  );
};

export default Loader;
