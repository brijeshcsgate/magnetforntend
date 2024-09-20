import React from "react";
import { topCorner } from "@/assets/Icons";
const DashBoardSection1 = ({ data }) => {
  return (
    <div className="dash-sec1">
      {data.map((item, index) => (
        <div
          className={`dash-sec1-container ${
            item?.className ? item?.className : ""
          }`}
          key={index}
        >
          <div className="dash-sec1-svg ">
            {" "}
            {topCorner({ width: 32, height: 28 })}
          </div>
          <div className="dash-sec1-details">
            <div className="dash-sec1-icon">{item?.icon}</div>
            <div className="dash-sec1-text">
              <div className="heading-600-24">{item?.defaultValue||item?.details}</div>
              <div className="heading-400-12 ">{item?.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoardSection1;
