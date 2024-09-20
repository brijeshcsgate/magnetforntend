import React from "react";

const DashBoardSection5 = ({ label, data }) => {
  return (
    <div className="dash-card flex-1">
      <div className="dash-sec3-top">
        <div className="heading-600-16">{label}</div>
      </div>
      {data.map((item, index) => (
        <div className="dash-details" key={index}>
          <div className="dash-detail-left">
            <div className="dash-detail-icon">
              {item?.src ? (
                <img src={item?.src} alt={item?.label} />
              ) : (
                <div className="dash-detail-icon">{item?.icon}</div>
              )}
            </div>
            <div
              className={`dash-detail-text v-center  heading-400-20 ${
                item?.labelColor ? item?.labelColor : "c-gray-7"
              }`}
            >
              {item?.label}
            </div>
          </div>
          <div
            className={`dash-details-right heading-600-12 ${item?.detailColor}`}
          >
            {item?.detail}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoardSection5;
