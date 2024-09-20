import {
  archiveIcon,
  attachIcon,
  dotIcon,
  editIcon,
  geareIcon,
  lightBlubIcon,
  printIcon,
  userAddIcon,
  userRemoveIcon,
} from "@/assets/Icons";
import DataTable from "@/components/DataGrid/DataGrid";
import { BaseUrl } from "@/services/baseService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";

const Vehicles = () => {
  const [isActiveTabs, setIsActiveTab] = useState("All");
  const [isAction, setIsAction] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const onAddVechicle = () => {
    navigate("/add-vehicles");
  };
  const hasActiveTabHandler = (active) => {
    setIsActiveTab(active);
  };
  const tabs = [
    { tabName: "All" },
    { tabName: "Active" },
    { tabName: "Disabled" },
    { tabName: "In Workshop" },
    { tabName: "Out of Service" },
  ];


  const navigateToPreview = (rowData) => {
    navigate("/vehicle-preview", {
      state: { rowData, comparator: "gridNillComparator" },
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      headerClassName: "super-app-theme--header",
      width: 90,
    },

    {
      field: "vechicleName",
      headerName: "Vehicle",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "super-app-theme--header",
      width: 110,
      editable: true,
    },
    {
      field: "seating",
      headerName: "Seating",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "makeModel",
      headerName: "Make/Model",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "fuel",
      headerName: "Fuel",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "euro",
      headerName: "Euro",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "ServiceType",
      headerName: "Service Type",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "chassis",
      headerName: "Chassis",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "engine",
      headerName: "Engine",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "driver",
      headerName: "Odometer Reading(KM)",
      headerClassName: "super-app-theme--header",
      width: 220,
      editable: true,
    },
    {
      field: "aging",
      headerName: "Aging/DOM",
      headerClassName: "super-app-theme--header hide-img-bordersvg",
      width: 150,
      editable: true,
    },
    {
      field: "image",
      headerName: "",
      headerClassName: "super-app-theme--header hide-img-bordersvg",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <div>
          <img
            src={params.value}
            alt={`Image ${params.row.id}`}
            style={{ width: "14px", height: "14px" }}
          />
        </div>
      ),
    },
    {
      field: "threedot",
      headerName: "",
      headerClassName: "super-app-theme--header hide-img-bordersvg",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <div className="d-h-center">
          <img
            src={params.value}
            alt={`Image ${params.row.id}`}
            style={{ width: "39px", height: "30px", cursor: "pointer" }}
            onClick={() => navigateToPreview(params.row)}
          />
        </div>
      ),
    },
  ];
  const onGetVechicleApi = async () => {
    const geturl = `${BaseUrl}vehicles/get`;

    try {
      const response = await fetch(geturl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
   

      if (responseData) {
        const rowdata = responseData.map((item, index) => ({
          id: item?._id,
          vechicleRName: item?.vehicleName,
          vechicleName: item?.vehicleNumber,
          vechicleImage: "",
          type: item?.vehicleChassisTypeId?.chassisType,
          seating: item?.seatCapacity,
          makeModel: `${item.vehicleMakeId?.makeName}/${item.vehicleModelId?.modelName}`,
          onlyMake: item.vehicleMakeId?.makeName,
          trim: item?.vehicleTrimId?.vehicleTrimName,
          onlyModal: item.vehicleModelId?.modelName,
          fuel: item?.vehicleFuelTypeId?.vehicleFuelTypeName,
          color: item?.vehicleColorId, //not wokring
          euro: item?.vehicleModelEuroId?.modelEuroTypeName,
          status: item.is_active,
          vehicleRegistrationState: item?.vehicleRegistrationStateId, //not wokring
          vehicleRegistrationDate: item?.vehicleRegistrationDate,
          vehicleServiceAllotmentDate: item?.vehicleServiceAllotmentDate,
          vehicleInsuranceValidityDate: item?.vehicleInsuranceValidityDate,
          vehicleRoadTaxValidityDate: item?.vehicleRoadTaxValidityDate,
          vehiclePollutionCheckValidityDate:
            item?.vehiclePollutionCheckValidityDate,
          vehicleServiceState: item?.vehicleServiceStateId, //not wokring
          chassis: item?.vehicleChassisNumber,
          engine: item?.vehicleEngineNumber,
          driver: item?.meterReading,
          aging: item?.vehicleManufactureYear,
          fabricator: item?.fabricator,
          region: item?.vehicleServiceRegionId, //not wokring
          depot: item?.vehicleServiceDepotId?.depotName,
          vehicleCategory: item?.vehicleCategoryId?.categoryName,
          vehicleGroup: item?.vehicleGroupId?.vehicleGroupName,
          ServiceType: item?.vehicleServiceTypeId?.vehicleServiceTypeName,
          odometerReading: item?.meterReading,
          // specification
          dimensionsWidth: item?.dimensions?.width,
          dimensionsHeight: item?.dimensions?.height,
          dimensionsLength: item?.dimensions?.length,
          dimensionsInteriorVolume: item?.dimensions?.inetriorVolume,
          dimensionsPassengerVolume: item?.dimensions?.passengerVolume,
          dimensionsCargoVolume: item?.dimensions?.cargoVolume,
          dimensionsGroundClearance: item?.dimensions?.groundClearence,
          dimensionsBedLength: item?.dimensions?.bedLength,
          weightCurbWeight: item?.weight?.curbWeight,
          weightGrossVehicleWeight: item?.weight?.curbWeight,
          performanceTowingCapacity: item?.performance?.towingCapacity,
          performanceMaxPayload: item?.performance?.maxPayload,
          fuelMileageCity: item?.fuel?.mileageCity,
          fuelMileageHighway: item?.fuel?.mileageHighway,
          fuelCapacityTank1: item?.fuel?.capacityTank1,
          fuelCapacityTank2: item?.fuel?.capacityTank2,
          fuelCngCapacity: item?.fuel?.cngCapacity,
          fuelBatteryCapacity: item?.fuel?.batteryCapacity,
          oilCapacity: item?.oilCapacity,
          engineSummary: item?.engine?.engineSummary,
          engineBrand: item?.engine?.engineBrand,
          engineCompression: item?.engine?.compression,
          engineCylinders: item?.engine?.cylinders,
          engineDisplacement: item?.engine?.displacement,
          engineFuelInduction: item?.engine?.fuelInduction,
          engineMaxHp: item?.engine?.maxHp,
          engineMaxTorque: item?.engine?.maxTorque,
          engineValves: item?.engine?.valves,
          trnasmisssionType: item?.transmission?.trnasmisssionType,
          trnasmisssionGear: item?.transmission?.trnasmisssionGear,
          trnasmisssionDescription:
            item?.transmission?.trnasmisssionDescription,
          driveType: item?.wheelsAndTyres?.driveType,
          brakingSystem: item?.wheelsAndTyres?.brakingSystem,
          wheelBase: item?.wheelsAndTyres?.wheelBase,
          FrontTrackWidth: "",
          FrontWheelDiameter: "",
          FrontTyreType: "",
          FrontTyrePSI: "",
          RearTrackWidth: "",
          RearWheelDiameter: "",
          RearTyreType: "",
          RearTyrePSI: "",

          image: "/assets/imagePlaceHolder.svg",
          threedot: "/assets/threeDotDataGrid.svg",
          inServiceDate: item?.inService?.inServiceDate,
          inServiceOdometer: item?.inService?.inServiceOdometer,
          estimatedSeviceLifeMonths:
            item?.lifeEstimation?.estimatedSeviceLifeMonths,
          estimatedSeviceLifeOdometer:
            item?.lifeEstimation?.estimatedSeviceLifeOdometer,
          estimatedResaleValue: item?.lifeEstimation?.estimatedResaleValue,
          outOfServiceDate: item?.outOfService?.outOfServiceDate,
          outOfServiceOdometer: item?.outOfService?.outOfServiceOdometer,
          markOut: item?.outOfService?.markOut,
          purchaseVendor: item?.purchaseDetails?.purchaseVendor,
          purchaseDate: item?.purchaseDetails?.purchaseDate,
          purchasePrice: item?.purchaseDetails?.purchasePrice,
          purchaseOdometer: item?.purchaseDetails?.purchaseOdometer,
          purchaseNotes: item?.purchaseDetails?.notes,
          isFinanced: item?.isFinanced,
          vendor: item?.financingDetails?.vendor,
          dateOfLease: item?.financingDetails?.dateOfLease,
          capitalizedCost: item?.financingDetails?.capitalizedCost,
          downPayment: item?.financingDetails?.downPayment,
          firstPaymentDate: item?.financingDetails?.firstPaymentDate,
          monthlyPayment: item?.financingDetails?.monthlyPayment,
          instalments: item?.financingDetails?.instalments,
          leaseEndDate: item?.financingDetails?.leaseEndDate,
          residualValue: item?.financingDetails?.residualValue,
          contractMileageLimit: item?.financingDetails?.contractMileageLimit,
          excessMileageCharge: item?.financingDetails?.excessMileageCharge,
          leaseNumber: item?.financingDetails?.leaseNumber,
          leaseNotes: item?.financingDetails?.notes,
          LeaseGenerateExpenses: item?.financingDetails?.GenerateExpenses,
          lender: item?.financingDetails?.lender,
          dateOfLoan: item?.financingDetails?.dateOfLoan,
          amountOfLoan: item?.financingDetails?.amountOfLoan,
          rateOfInterest: item?.financingDetails?.rateOfInterest,
          numberOfPayments: item?.financingDetails?.numberOfPayments,
          loanEndDate: item?.financingDetails?.loanEndDate,
          accountNumber: item?.financingDetails?.accountNumber,
          LoanNotes: item?.financingDetails?.LoanNotes,
          generateExpenses: item?.financingDetails?.generateExpenses,
        }));
        setResponseData([rowdata]);
       
        setRows(rowdata);
      }
      setResponseData(responseData?.data);
    }
  };
  useEffect(() => {
    onGetVechicleApi();
  }, []);
  return (
    <div className="vehicle-wrap">
      <div className="head">
        <div className="font-semibold text-2xl text-[#002850]">Vehicles</div>
        <div className="head-btns">
          <button className="button">Export</button>
          <button className="button" onClick={onAddVechicle}>
            + Add Vehicle
          </button>
        </div>
      </div>
      <div className="list-tab">
        <div className="tabs ">
          {tabs.map((item, index) => (
            <div
              className={` tab ${
                isActiveTabs === item.tabName ? "tab-active" : ""
              }`}
              key={index}
              onClick={() => hasActiveTabHandler(item.tabName)}
            >
              <div
                className={` ${
                  isActiveTabs === item.tabName
                    ? "heading-600-14 c-blue2 "
                    : "heading-400-14 c-gray"
                } v-center`}
              >
                {item.tabName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-main d-h-between">
        <div
          className="action-container d-h-center"
          onClick={() => setIsAction(!isAction)}
        >
          <div className="action-div d-h-center">
            {selectedRows.length > 1 && (
              <span className="action-notification d-h-center"></span>
            )}
            <span className="heading-400-12">Action</span>
            <span className="d-h-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="4"
                viewBox="0 0 7 4"
                fill="none"
              >
                <path
                  d="M3.77398 2.8153L1.42198 0.462296C1.33757 0.383389 1.22578 0.34041 1.11025 0.342448C0.994716 0.344487 0.884508 0.391382 0.802934 0.473217C0.721359 0.555052 0.674813 0.665408 0.673142 0.780944C0.671471 0.89648 0.714806 1.00814 0.79398 1.0923L3.46198 3.7583C3.54288 3.83887 3.65172 3.88517 3.76588 3.8876C3.88003 3.89002 3.99073 3.84837 4.07498 3.7713L6.75798 1.0943C6.80155 1.05357 6.83649 1.0045 6.86072 0.950001C6.88495 0.895504 6.89797 0.836693 6.89903 0.777062C6.90008 0.717431 6.88913 0.658196 6.86684 0.602879C6.84455 0.547561 6.81136 0.497289 6.76926 0.45505C6.72715 0.412811 6.67699 0.379466 6.62174 0.356998C6.56649 0.334529 6.5073 0.323396 6.44766 0.324258C6.38803 0.32512 6.32917 0.337962 6.2746 0.362019C6.22003 0.386075 6.17085 0.420856 6.12998 0.464296L3.77398 2.8153Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          {selectedRows.length > 1 && (
            <span className="heading-400-14 c-blue">Clear selection</span>
          )}

          {isAction && (
            <div className="action-option">
              <div className="option-section d-h-between border-bottom-gray">
                <div className="heading-400-12">Update Vehicles</div>
                <div>{editIcon({ width: 12, height: 12 })}</div>
              </div>
              <div className="option-section d-h-between">
                <div className="heading-400-12">Print Vehicle Labels</div>
                <div>{printIcon({ width: 14, height: 14 })}</div>
              </div>
              <div className="option-section d-h-between border-bottom-gray">
                <div className="heading-400-12">Attach Shared Documents</div>
                <div>{attachIcon({ width: 12, height: 14 })}</div>
              </div>
              <div className="option-section d-h-between">
                <div className="heading-400-12">Attach Watcher</div>
                <div>{userAddIcon({ width: 13, height: 11 })}</div>
              </div>
              <div className="option-section d-h-between border-bottom-gray">
                <div className="heading-400-12">Remove Watcher</div>
                <div>{userRemoveIcon({ width: 13, height: 10 })}</div>
              </div>

              <div className="option-section d-h-between ">
                <div className="heading-400-12">Archive</div>
                <div>{archiveIcon({ width: 14, height: 12 })}</div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="d-h-center" style={{ gap: "4px" }}>
            <div className="action-div d-h-center">
              {geareIcon({ width: 15, height: 18 })}
            </div>
            <div className="action-div d-h-center">
              {lightBlubIcon({ width: 15, height: 18 })}
            </div>
          </div>
        </div>
      </div>

      <DataTable
        setSelectedRows={setSelectedRows}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};
export default Vehicles;
