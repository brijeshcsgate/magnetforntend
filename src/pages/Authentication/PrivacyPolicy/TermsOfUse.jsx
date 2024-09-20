import React from "react";
import "./style.css";
import {terms } from "./constant";
const TermsOfUse = () => {
  return (
    <div className="p-5 ">
      
      <div>
        <h1 className="my-5 heading-600-42 text-center">Terms of Use</h1>

        <div className="police-container">
          {terms.map((item, index) => (
            <div className="condition-container" key={index}>
              <label className="condition-title heading-400-26">
                {item?.title}
              </label>
              <p className="condition-para">{item?.para}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
