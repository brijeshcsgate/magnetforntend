import ShowImageGridView from "@/components/common/ImageDetails/ImageDetails";
import TextDetailsOne from "@/components/common/TextDetails/TextDetails";
import { useEffect, useState } from "react";
import "./OverView.css";
function getDate(dateString) {
  const parts = dateString.split("T");
  return parts[0];
}
const OverView = ({ response }) => {
  const title1 = "Details";
  const title2 = "Service Detail";
  const title3 = "Additional Detail";

  const [details3, setDetails3] = useState([
    { title: "Fabricator", name: "---" },
    {
      title: "Ownership",
      name: "---",
    },
    { title: "Operator", name: "---" },
  ]);
  const [details1, setDetails1] = useState([
    { title: "Name", name: "---" },
    {
      title: "Registration Number",
      name: "---",
      lastText: "Check by VAHAN",
    },
    { title: "Chassis/Body Type", name: "---" },
    { title: "Fuel type", name: "---" },
    { title: "Manufacturing Year", name: "---" },
    { title: "Make", name: "---" },
    { title: "Model", name: "---" },
    { title: "Trim", name: "---" },
    { title: "Model Euro", name: "---" },
    { title: "Vehicle Colour", name: "---" },
    { title: "Chassis number / VIN", name: "---" },
    { title: "Engine number", name: "---" },
  ]);

  const [details2, setDetails2] = useState([
    { title: "Registration State", name: "" },
    {
      title: "Registration Date",
      name: "---",
      lastText: "Check by VAHAN",
    },
    {
      title: "Service Allotment Date",
      name: "---",
    },
    {
      title: "Insurance Validity Date",
      name: "---",
    },
    {
      title: "Road Tax Validity Date",
      name: "---",
    },
    {
      title: "Pollution Validity",
      name: "---",
    },
    { title: "State", name: "Uttar Pradesh" },
    { title: "Region", name: "---" },
    { title: "Depot", name: "---" },
    { title: "Vehicle Category", name: "---" },
    { title: "Vehicle Group", name: "---" },
    { title: "Vehicle Service Type", name: "---" },
    { title: "Sitting Configuration", name: "---" },
    { title: "Seat (Semi Sleeper)", name: "---" },
    { title: "Seat (Sleeper)", name: "---" },
    { title: "Odometer Reading (KM)", name: "---" },
  ]);

  useEffect(() => {
    const updatedDetails1 = [
      {
        title: "Name",
        name: response?.data?.data?.vehicle?.identification?.registrationNumber
          ? response?.data?.data?.vehicle?.identification?.registrationNumber
          : "---",
      },
      {
        title: "Registration Number",
        name: response?.data?.data?.vehicle?.identification?.registrationNumber
          ? response?.data?.data?.vehicle?.identification?.registrationNumber
          : "---",
        lastText: "Check by VAHAN",
      },
      {
        title: "Chassis/Body Type",
        name: response?.data?.data?.vehicle?.identification?.chassisBodyTypeId
          ?.name?.english
          ? response?.data?.data?.vehicle?.identification?.chassisBodyTypeId
            ?.name?.english
          : "---",
      },
      {
        title: "Fuel type",
        name: response?.data?.data?.vehicle?.identification?.fuelTypeId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.fuelTypeId?.name
            ?.english
          : "---",
      },
      {
        title: "Manufacturing Year",
        name: response?.data?.data?.vehicle?.identification?.manufacturingYear
          ? response?.data?.data?.vehicle?.identification?.manufacturingYear
          : "---",
      },
      {
        title: "Make",
        name: response?.data?.data?.vehicle?.identification?.makeId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.makeId?.name?.english
          : "---",
      },
      {
        title: "Model",
        name: response?.data?.data?.vehicle?.identification?.modelId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.modelId?.name
            ?.english
          : "---",
      },
      {
        title: "Trim",
        name: response?.data?.data?.vehicle?.identification?.trimId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.trimId?.name?.english
          : "---",
      },
      {
        title: "Model Euro",
        name: response?.data?.data?.vehicle?.identification?.modelEuroId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.modelEuroId?.name
            ?.english
          : "---",
      },
      {
        title: "Vehicle Colour",
        name: response?.data?.data?.vehicle?.identification?.colourId?.name
          ?.english
          ? response?.data?.data?.vehicle?.identification?.colourId?.name
            ?.english
          : "---",
      },
      {
        title: "Chassis number / VIN",
        name: response?.data?.data?.vehicle?.identification?.chassisNumber
          ? response?.data?.data?.vehicle?.identification?.chassisNumber
          : "---",
      },
      {
        title: "Engine number",
        name: response?.data?.data?.vehicle?.identification?.engineNumber
          ? response?.data?.data?.vehicle?.identification?.engineNumber
          : "---",
      },
    ];
    const updatedDetails2 = [
      {
        title: "Registration State",
        name: response?.data?.data?.vehicle?.serviceDetail?.registrationStateId
          ?.name?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.registrationStateId
            ?.name?.english
          : "---",
      },
      {
        title: "Registration Date",
        name: response?.data?.data?.vehicle?.serviceDetail?.registrationDate
          ? getDate(
            response?.data?.data?.vehicle?.serviceDetail?.registrationDate
          )
          : "---",
        lastText: "Check by VAHAN",
      },
      {
        title: "Service Allotment Date",
        name: response?.data?.data?.vehicle?.serviceDetail?.allotmentDate
          ? getDate(response?.data?.data?.vehicle?.serviceDetail?.allotmentDate)
          : "---",
      },
      {
        title: "Insurance Validity Date",
        name: response?.data?.data?.vehicle?.serviceDetail?.insuranceValidity
          ? getDate(
            response?.data?.data?.vehicle?.serviceDetail?.insuranceValidity
          )
          : "---",
      },
      {
        title: "Road Tax Validity Date",
        name: response?.data?.data?.vehicle?.serviceDetail?.roadTaxValidity
          ? getDate(
            response?.data?.data?.vehicle?.serviceDetail?.roadTaxValidity
          )
          : "---",
      },
      {
        title: "Pollution Validity",
        name: response?.data?.data?.vehicle?.serviceDetail?.pollutionValidity
          ? getDate(
            response?.data?.data?.vehicle?.serviceDetail?.pollutionValidity
          )
          : "---",
      },
      {
        title: "State",
        name: response?.data?.data?.vehicle?.serviceDetail?.stateId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.stateId?.name?.english
          : "---",
      },
      {
        title: "Region",
        name: response?.data?.data?.vehicle?.serviceDetail?.regionId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.regionId?.name
            ?.english
          : "---",
      },
      {
        title: "Depot",
        name: response?.data?.data?.vehicle?.serviceDetail?.depotId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.depotId?.name?.english
          : "---",
      },
      {
        title: "Vehicle Category",
        name: response?.data?.data?.vehicle?.serviceDetail?.categoryId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.categoryId?.name
            ?.english
          : "---",
      },
      {
        title: "Vehicle Group",
        name: response?.data?.data?.vehicle?.serviceDetail?.groupId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.groupId?.name?.english
          : "---",
      },
      {
        title: "Vehicle Service Type",
        name: response?.data?.data?.vehicle?.serviceDetail?.serviceTypeId?.name
          ?.english
          ? response?.data?.data?.vehicle?.serviceDetail?.serviceTypeId?.name
            ?.english
          : "---",
      },
      {
        title: "Sitting Configuration",
        name: response?.data?.data?.vehicle?.seatingConfiguration?.name?.english
          ? response?.data?.data?.vehicle?.serviceTypeId?.name?.english
          : "---",
      },
      {
        title: "Seats (Sitting)",
        name: response?.data?.data?.vehicle?.seatingConfiguration?.totalSeats
          ? response?.data?.data?.vehicle?.seatingConfiguration?.totalSeats
          : "---",
      },
      {
        title: "Seat (Semi Sleeper)",
        name: response?.data?.data?.vehicle?.seatingConfiguration?.semiSleeper
          ? response?.data?.data?.vehicle?.seatingConfiguration?.semiSleeper
          : "---",
      },
      {
        title: "Seat (Sleeper)",
        name: response?.data?.data?.vehicle?.seatingConfiguration?.sleeper
          ? response?.data?.data?.vehicle?.seatingConfiguration?.sleeper
          : "---",
      },
      {
        title: "Odometer Reading (KM)",
        name: response?.data?.data?.vehicle?.serviceDetail?.reading
          ? response?.data?.data?.vehicle?.serviceDetail?.reading
          : null,
      },
    ];
    const updateDetails3 = [
      {
        title: "Fabricator",
        name: response?.data?.data?.vehicle?.additionalDetail?.fabricatorId
          ?.name?.english
          ? response?.data?.data?.vehicle?.additionalDetail?.fabricatorId?.name
            ?.english
          : "---",
      },
      {
        title: "Ownership",
        name: response?.data?.data?.vehicle?.additionalDetail?.ownershipId?.name
          ?.english
          ? response?.data?.data?.vehicle?.additionalDetail?.ownershipId?.name
            ?.english
          : "---",
      },
      {
        title: "Operator",
        name: response?.data?.data?.vehicle?.additionalDetail?.operatorId?.name
          ?.english
          ? response?.data?.data?.vehicle?.additionalDetail?.operatorId?.name
            ?.english
          : "---",
      },
    ];
    setDetails3(() => updateDetails3);
    setDetails1(() => updatedDetails1);
    setDetails2(() => updatedDetails2);
  }, [response]);
  return (
    <div className="overview-main-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="overview-inner-container-left">
          <div className='section-shadow'> <TextDetailsOne details={details1} title={title1} /></div>
          <div className='section-shadow'><TextDetailsOne details={details2} title={title2} /></div>
          <div className='section-shadow'><TextDetailsOne details={details3} title={title3} /></div>
          <ShowImageGridView
            images={response?.data?.data?.vehicle?.identification?.images}
          />
        </div>
        <div className="overview-inner-container-right">
          <div className='section-shadow'>
            <div className="w-100">
              <img className="w-100" src="/assets/images/openissue.svg" alt="" />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img
                className="w-100"
                src="/assets/images/serviceReminder.svg"
                alt=""
              />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img
                className="w-100"
                src="/assets/images/RenewalReminders.svg"
                alt=""
              />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img className="w-100" src="/assets/images/Incomplete.svg" alt="" />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img
                className="w-100"
                src="/assets/images/CriticalFaults.svg"
                alt=""
              />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img className="w-100" src="/assets/images/costowner.svg" alt="" />
            </div>
          </div><div className='section-shadow'>
            <div className="w-100">
              <img
                className="w-100"
                src="/assets/images/Utilization.svg"
                alt=""
              />
            </div></div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
