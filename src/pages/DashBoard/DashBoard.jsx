import {
  busIcon1,
  busStopIcon,
  conductorIcon,
  depot,
  driverIcon,
  formanIcon,
  settingIcon,
  treeIcon,
  workShop,
} from '@/assets/Icons';
import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import DashBoardSection1 from './DashBoardSection1';
import DashBoardSection2 from './DashBoardSection2';
import DashBoardSection3 from './DashBoardSection3';
import DashBoardSection4 from './DashBoardSection4';
import DashBoardSection5 from './DashBoardSection5';
import DashBoardSection6 from './DashBoardSection6';
import {
  chartData1,
  DriverAge,
  ReportedFaultCategory,
  chartData2,
  emissionData,
  fleetAccidentReport,
  reportedFaultLevel,
  storeInventoryValue,
} from './constent';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const DashBoard = () => {
  const [masterData, setMasterData] = useState({
    depot: 0,
    fleet: 0,
    busStop: 0,
    workShop: 0,
    drive: 0,
    conductor: 0,
    foreman: 0,
  });
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Dashboard');
  }, []);

  const data = [
    {
      className: 'depot-class',
      icon: depot({ width: 33, height: 32 }),
      details: masterData?.depot,
      label: 'Depot',
      defaultValue: 118,
    },
    {
      className: 'fleet-class',
      icon: busIcon1({ width: 32, height: 32 }),
      details: masterData?.fleet,
      label: 'Fleet',
      defaultValue: 12630,
    },
    {
      className: 'stops-class',
      icon: busStopIcon({ width: 33, height: 32 }),
      details: masterData?.busStop,
      label: 'Bus Terminus / Stops',
    },
    {
      className: 'Workshop-class',
      icon: workShop({ width: 30, height: 30 }),
      details: masterData?.workShop,
      label: 'Workshop',
      defaultValue: 138,
    },
    {
      className: 'driver-class',
      icon: driverIcon({ width: 33, height: 32 }),
      details: masterData?.drive,
      label: 'Driver',
      defaultValue: 24600,
    },
    {
      className: 'conductor-class',
      icon: conductorIcon({ width: 33, height: 32 }),
      details: masterData?.conductor,
      label: 'Conductor',
      defaultValue: 28100,
    },
    {
      className: 'foremen-class',
      icon: formanIcon({ width: 33, height: 32 }),
      details: masterData?.foreman,
      label: 'Foremen',
    },
  ];

  // const onGetAllFleetApi = async () => {
  //   const geturl = `${BaseUrl}vehicles/get`;
  //   const token = localStorage.getItem("userToken");

  //   try {
  //     const response = await fetch(geturl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //
  //     if (responseData) {
  //       const rowdata = responseData.map((item, index) => ({
  //         id: item?._id,
  //         vechicleRName: item?.vehicleName,
  //         vechicleName: item?.vehicleNumber,
  //         vechicleImage: "",
  //         type: item?.vehicleChassisTypeId?.chassisType,
  //         seating: item?.seatCapacity,
  //         makeModel: `${item.vehicleMakeId?.makeName}/${item.vehicleModelId?.modelName}`,
  //         onlyMake: item.vehicleMakeId?.makeName,
  //         trim: item?.vehicleTrimId?.vehicleTrimName,
  //         onlyModal: item.vehicleModelId?.modelName,
  //         fuel: item?.vehicleFuelTypeId?.vehicleFuelTypeName,
  //         color: item?.vehicleColorId, //not wokring
  //         euro: item?.vehicleModelEuroId?.modelEuroTypeName,
  //         status: item.is_active,
  //         vehicleRegistrationState: item?.vehicleRegistrationStateId, //not wokring
  //         vehicleRegistrationDate: item?.vehicleRegistrationDate,
  //         vehicleServiceAllotmentDate: item?.vehicleServiceAllotmentDate,
  //         vehicleInsuranceValidityDate: item?.vehicleInsuranceValidityDate,
  //         vehicleRoadTaxValidityDate: item?.vehicleRoadTaxValidityDate,
  //         vehiclePollutionCheckValidityDate:
  //           item?.vehiclePollutionCheckValidityDate,
  //         vehicleServiceState: item?.vehicleServiceStateId, //not wokring
  //         chassis: item?.vehicleChassisNumber,
  //         engine: item?.vehicleEngineNumber,
  //         driver: item?.meterReading,
  //         aging: item?.vehicleManufactureYear,
  //         fabricator: item?.fabricator,
  //         region: item?.vehicleServiceRegionId, //not wokring
  //         depot: item?.vehicleServiceDepotId?.depotName,
  //         vehicleCategory: item?.vehicleCategoryId?.categoryName,
  //         vehicleGroup: item?.vehicleGroupId?.vehicleGroupName,
  //         ServiceType: item?.vehicleServiceTypeId?.vehicleServiceTypeName,
  //         odometerReading: item?.meterReading,
  //         // specification
  //         dimensionsWidth: item?.dimensions?.width,
  //         dimensionsHeight: item?.dimensions?.height,
  //         dimensionsLength: item?.dimensions?.length,
  //         dimensionsInteriorVolume: item?.dimensions?.inetriorVolume,
  //         dimensionsPassengerVolume: item?.dimensions?.passengerVolume,
  //         dimensionsCargoVolume: item?.dimensions?.cargoVolume,
  //         dimensionsGroundClearance: item?.dimensions?.groundClearence,
  //         dimensionsBedLength: item?.dimensions?.bedLength,
  //         weightCurbWeight: item?.weight?.curbWeight,
  //         weightGrossVehicleWeight: item?.weight?.curbWeight,
  //         performanceTowingCapacity: item?.performance?.towingCapacity,
  //         performanceMaxPayload: item?.performance?.maxPayload,
  //         fuelMileageCity: item?.fuel?.mileageCity,
  //         fuelMileageHighway: item?.fuel?.mileageHighway,
  //         fuelCapacityTank1: item?.fuel?.capacityTank1,
  //         fuelCapacityTank2: item?.fuel?.capacityTank2,
  //         fuelCngCapacity: item?.fuel?.cngCapacity,
  //         fuelBatteryCapacity: item?.fuel?.batteryCapacity,
  //         oilCapacity: item?.oilCapacity,
  //         engineSummary: item?.engine?.engineSummary,
  //         engineBrand: item?.engine?.engineBrand,
  //         engineCompression: item?.engine?.compression,
  //         engineCylinders: item?.engine?.cylinders,
  //         engineDisplacement: item?.engine?.displacement,
  //         engineFuelInduction: item?.engine?.fuelInduction,
  //         engineMaxHp: item?.engine?.maxHp,
  //         engineMaxTorque: item?.engine?.maxTorque,
  //         engineValves: item?.engine?.valves,
  //         trnasmisssionType: item?.transmission?.trnasmisssionType,
  //         trnasmisssionGear: item?.transmission?.trnasmisssionGear,
  //         trnasmisssionDescription:
  //           item?.transmission?.trnasmisssionDescription,
  //         driveType: item?.wheelsAndTyres?.driveType,
  //         brakingSystem: item?.wheelsAndTyres?.brakingSystem,
  //         wheelBase: item?.wheelsAndTyres?.wheelBase,
  //         FrontTrackWidth: "",
  //         FrontWheelDiameter: "",
  //         FrontTyreType: "",
  //         FrontTyrePSI: "",
  //         RearTrackWidth: "",
  //         RearWheelDiameter: "",
  //         RearTyreType: "",
  //         RearTyrePSI: "",

  //         image: "/assets/imagePlaceHolder.svg",
  //         threedot: "/assets/threeDotDataGrid.svg",
  //         inServiceDate: item?.inService?.inServiceDate,
  //         inServiceOdometer: item?.inService?.inServiceOdometer,
  //         estimatedSeviceLifeMonths:
  //           item?.lifeEstimation?.estimatedSeviceLifeMonths,
  //         estimatedSeviceLifeOdometer:
  //           item?.lifeEstimation?.estimatedSeviceLifeOdometer,
  //         estimatedResaleValue: item?.lifeEstimation?.estimatedResaleValue,
  //         outOfServiceDate: item?.outOfService?.outOfServiceDate,
  //         outOfServiceOdometer: item?.outOfService?.outOfServiceOdometer,
  //         markOut: item?.outOfService?.markOut,
  //         purchaseVendor: item?.purchaseDetails?.purchaseVendor,
  //         purchaseDate: item?.purchaseDetails?.purchaseDate,
  //         purchasePrice: item?.purchaseDetails?.purchasePrice,
  //         purchaseOdometer: item?.purchaseDetails?.purchaseOdometer,
  //         purchaseNotes: item?.purchaseDetails?.notes,
  //         isFinanced: item?.isFinanced,
  //         vendor: item?.financingDetails?.vendor,
  //         dateOfLease: item?.financingDetails?.dateOfLease,
  //         capitalizedCost: item?.financingDetails?.capitalizedCost,
  //         downPayment: item?.financingDetails?.downPayment,
  //         firstPaymentDate: item?.financingDetails?.firstPaymentDate,
  //         monthlyPayment: item?.financingDetails?.monthlyPayment,
  //         instalments: item?.financingDetails?.instalments,
  //         leaseEndDate: item?.financingDetails?.leaseEndDate,
  //         residualValue: item?.financingDetails?.residualValue,
  //         contractMileageLimit: item?.financingDetails?.contractMileageLimit,
  //         excessMileageCharge: item?.financingDetails?.excessMileageCharge,
  //         leaseNumber: item?.financingDetails?.leaseNumber,
  //         leaseNotes: item?.financingDetails?.notes,
  //         LeaseGenerateExpenses: item?.financingDetails?.GenerateExpenses,
  //         lender: item?.financingDetails?.lender,
  //         dateOfLoan: item?.financingDetails?.dateOfLoan,
  //         amountOfLoan: item?.financingDetails?.amountOfLoan,
  //         rateOfInterest: item?.financingDetails?.rateOfInterest,
  //         numberOfPayments: item?.financingDetails?.numberOfPayments,
  //         loanEndDate: item?.financingDetails?.loanEndDate,
  //         accountNumber: item?.financingDetails?.accountNumber,
  //         LoanNotes: item?.financingDetails?.LoanNotes,
  //         generateExpenses: item?.financingDetails?.generateExpenses,
  //       }));
  //       setResponseData([rowdata]);
  //
  //       setRows(rowdata);
  //     }
  //     setResponseData(responseData?.data);
  //   } catch (error) {
  //
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/masters/metaData`,
        {}
      );
      const data = response.data;

      setMasterData((prev) => ({
        ...prev,
        depot: data?.masters?.depot?.totalCount
          ? data?.masters?.depot?.totalCount
          : 0,
        busStop: data?.masters?.busStop?.totalCount
          ? data?.masters?.busStop?.totalCount
          : 0,
        workShop: data?.masters?.workshop?.totalCount
          ? data?.masters?.workshop?.totalCount
          : 0,
        drive: 0,
        conductor: data?.masters?.contractor?.totalCount
          ? data?.masters?.contractor?.totalCount
          : 0,
        foreman: 0,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // onGetAllFleetApi();
    fetchData();
  }, []);
  return (
    <div className="dashboard-container">
      <DashBoardSection1 data={data} />

      <DashBoardSection2 />

      <DashBoardSection3
        chartData={chartData1}
        className={'dash-sec3-bar-chart'}
        topBarName={'Variance'}
        bottomBarName={'Adherence'}
        ticks={[0, 20, 40, 60, 80]}
        topBarColor={'#FF565A'}
        bottomBarColor={'#0970D7'}
        label="Timetable Variance (as per Depot)"
      />

      <DashBoardSection3
        chartData={chartData2}
        topBarName={'Resolved'}
        bottomBarName={'Reported'}
        ticks={[0, 20, 40, 60, 80]}
        topBarColor={'#43BA2A'}
        bottomBarColor={'#FF1A20'}
        className={'dash-sec3-bar-chart'}
        label=" Vehicle Complaints (as per Depot)"
      />

      <div className="dash-sec5">
        <DashBoardSection4
          label={'Reported Fault Level'}
          data={reportedFaultLevel}
        />
        <DashBoardSection5
          label={'Reported Fault Category'}
          data={ReportedFaultCategory}
        />
      </div>

      <div className="dash-sec5">
        <DashBoardSection4
          label={'Store Inventory Value'}
          data={storeInventoryValue}
        />
        <DashBoardSection5
          label={'Fleet Accident Report'}
          data={fleetAccidentReport}
        />
      </div>

      <div className="dash-sec5">
        <DashBoardSection4
          label={'Store Inventory Value'}
          data={emissionData}
        />

        <DashBoardSection6 label={'Emission Trend'} />
      </div>

      <div className="dash-sec5">
        <div className="dash-card flex-1">
          <div className="dash-sec3-top">
            <div className="heading-600-16">Climate Neutralization</div>
          </div>
          <div className="dash-sec3-bottom flex-col gap-0">
            <div className="v-center gap-5 ">
              {treeIcon({ width: 22, height: 30 })}
              <div className="heading-600-42 c-grren2">42</div>
            </div>
            <div className="dash-sec5-tree">
              On an average it's estimated that a tree can absorb ~22 kg of
              carbon dioxide per year. Consider planting around{' '}
              <span className="c-grren2">
                {' '}
                45 trees to offset your carbon emissions.
              </span>
            </div>
          </div>
        </div>
        <DashBoardSection5 label={'Driver Age'} data={DriverAge} />
      </div>
    </div>
  );
};

export default DashBoard;
