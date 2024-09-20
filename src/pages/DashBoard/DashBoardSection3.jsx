import React from 'react';

const DashBoardSection3 = ({
  chartData,
  label,
  className,
  topBarName,
  bottomBarName,
  ticks,
  topBarColor,
  bottomBarColor,
}) => {
  return (
    <div className="dash-sec3">
      <div className="dash-sec3-top">
        <div className="heading-600-16">{label}</div>
        <div></div>
      </div>
    </div>
  );
};

export default DashBoardSection3;
