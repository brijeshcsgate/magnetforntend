import React from "react";
import "./Lifecycle.css";
import TextDetailsOne from "@/components/common/TextDetails/TextDetails";
const Lifecycle = ({ data }) => {

  const title1 = "Lifecycle";
  const title2 = "Service Cost";
  const title3 = "Fuel Cost";
  const details1 = [
    {
      title: "Estimated Vehicle Life",
      name: data?.estimatedSeviceLifeMonths || "---",
    },
    {
      title: "Estimated Annual Usage",
      name: "20,000 Km",
    },
    { title: "Estimated Fuel Efficiency", name: "10.50 kmpl" },
    { title: "Purchase Price", name: data?.purchasePrice || "---" },
    {
      title: "Estimated Disposal Cost",
      name: data?.estimatedResaleValue || "---",
    },
  ];
  const details2 = [
    { title: "Year 1 Cost", name: "00,00,00,000.00" },
    {
      title: "Year 2 Estimated Cost",
      name: "00,00,00,000.00",
    },
    { title: "Year 3 Estimated Cost", name: "00,00,00,000.00" },
    { title: "Year 4 Estimated Cost", name: "00,00,00,000.00" },
    { title: "Year 5 Estimated Cost", name: "00,00,00,000.00" },
    {
      title: "Year 6 Estimated Cost",
      name: "00,00,00,000.00",
    },
    { title: "Year 7 Estimated Cost", name: "00,00,00,000.00" },
    { title: "Year 8 Estimated Cost", name: "00,00,00,000.00" },
  ];
  return (
    <div className="lifecycle-main-container">
      <div className="lifecycle-inner-container">
        <div className="lifecycle-inner-container-top">
          <TextDetailsOne details={details1} title={title1} />
        </div>
      </div>
      <div className="lifecycle-inner-container" style={{ marginTop: "20px" }}>
        <div className="lifecycle-inner-container-left">
          <TextDetailsOne details={details2} title={title2} />
        </div>
        <div className="lifecycle-inner-container-right">
          <TextDetailsOne details={details2} title={title3} />
        </div>
      </div>
    </div>
  );
};
export default Lifecycle;
