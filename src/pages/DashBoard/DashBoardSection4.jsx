import React from "react";

const DashBoardSection4 = ({ label, data }) => {
  return (
    <div className="dash-card flex-1">
      <div className="dash-sec3-top">
        <div className="heading-600-16">{label}</div>
      </div>
      <div className="dash-sec3-bottom">
        {data.map((item, index) => (
          <div className="" key={index}>
            {item?.numberData && (
              <div
                className={`heading-600-42 text-center ${item?.numberDataColor}`}
              >
                {item?.numberData}
              </div>
            )}
            {item?.label && (
              <div className={`heading-400-20 text-center ${item?.labelColor}`}>
                {item?.label}
              </div>
            )}
            {item?.helpertext && (
              <div
                className={`heading-400-18 text-center ${item?.numberDataColor}`}
              >
                {item?.helpertext}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardSection4;
