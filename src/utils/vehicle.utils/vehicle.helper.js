const modifyVehicleResponse = ({
  setRows,
  setTotalCount,
  response,
  page,
  pageSize,
}) => {

  setTotalCount(
    response?.data?.totalCount || response?.pagination?.totalCount || 0
  );

  const rowdata = response?.data?.list?.map((item, index) => ({
    id: index + 1 + page * pageSize,
    _id: item?._id,
    allData: item,
    vechicleRName: item?.identification?.registrationNumber,
    vechicleName: item?.identification?.registrationNumber,
    vechicleImage:
      "https://images.picxy.com/cache/2019/6/30/a7c51574f11eba5ae2b6008977e7d4cb.jpg",
    type: item?.identification?.chassisBodyTypeId?.name?.english,
    seating: item?.seatingConfiguration?.totalSeats || "-",
    makeModel: `${
      item?.identification?.makeId?.name?.english
        ? `${item?.identification?.makeId?.name?.english}${"/"}${
            item?.identification?.modelId?.name?.english
              ? item?.identification?.modelId?.name?.english
              : ""
          }`
        : ""
    }${item?.vehicleModelId?.modelName ? item?.vehicleModelId?.modelName : ""}`,
    // onlyMake: item.vehicleMakeId?.makeName,
    // trim: item?.vehicleTrimId?.vehicleTrimName,
    // onlyModal: item.vehicleModelId?.modelName,
    fuel: item?.identification?.fuelTypeId?.name?.english || "-",
    vts: item?.serviceDetail?.vts,
    // color: item?.vehicleColorId, //not wokring
    // euro: item?.identification?.modelEuroId?.name?.english,
    status: item.status,
    // vehicleRegistrationState: item?.vehicleRegistrationStateId, //not wokring
    // vehicleRegistrationDate: item?.vehicleRegistrationDate,
    // vehicleServiceAllotmentDate: item?.vehicleServiceAllotmentDate,
    // vehicleInsuranceValidityDate: item?.vehicleInsuranceValidityDate,
    // vehicleRoadTaxValidityDate: item?.vehicleRoadTaxValidityDate,
    // vehiclePollutionCheckValidityDate: item?.vehiclePollutionCheckValidityDate,
    // vehicleServiceState: item?.vehicleServiceStateId, //not wokring
    chassis: item?.identification?.chassisNumber || "-",
    engine: item?.identification?.engineNumber || "-",
    // driver: item?.meterReading,
    aging: item?.identification?.manufacturingYear || "-",
    // fabricator: item?.fabricator,
    // region: item?.vehicleServiceRegionId, //not wokring
    depot: item?.serviceDetail?.depotId?.name?.english || "-",
    // vehicleCategory: item?.vehicleCategoryId?.categoryName,
    // vehicleGroup: item?.vehicleGroupId?.vehicleGroupName,
    ServiceType: item?.serviceDetail?.serviceTypeId?.name?.english || "-",
    odometerReading: item?.lifeCycle?.inService?.odometer || 0,

    // specification
    // dimensionsWidth: item?.dimensions?.width,
    // dimensionsHeight: item?.dimensions?.height,
    // dimensionsLength: item?.dimensions?.length,
    // dimensionsInteriorVolume: item?.dimensions?.inetriorVolume,
    // dimensionsPassengerVolume: item?.dimensions?.passengerVolume,
    // dimensionsCargoVolume: item?.dimensions?.cargoVolume,
    // dimensionsGroundClearance: item?.dimensions?.groundClearence,
    // dimensionsBedLength: item?.dimensions?.bedLength,
    // weightCurbWeight: item?.weight?.curbWeight,
    // weightGrossVehicleWeight: item?.weight?.curbWeight,
    // performanceTowingCapacity: item?.performance?.towingCapacity,
    // performanceMaxPayload: item?.performance?.maxPayload,
    // fuelMileageCity: item?.fuel?.mileageCity,
    // fuelMileageHighway: item?.fuel?.mileageHighway,
    // fuelCapacityTank1: item?.fuel?.capacityTank1,
    // fuelCapacityTank2: item?.fuel?.capacityTank2,
    // fuelCngCapacity: item?.fuel?.cngCapacity,
    // fuelBatteryCapacity: item?.fuel?.batteryCapacity,
    // oilCapacity: item?.oilCapacity,
    // engineSummary: item?.engine?.engineSummary,
    // engineBrand: item?.engine?.engineBrand,
    // engineCompression: item?.engine?.compression,
    // engineCylinders: item?.engine?.cylinders,
    // engineDisplacement: item?.engine?.displacement,
    // engineFuelInduction: item?.engine?.fuelInduction,
    // engineMaxHp: item?.engine?.maxHp,
    // engineMaxTorque: item?.engine?.maxTorque,
    // engineValves: item?.engine?.valves,
    // trnasmisssionType: item?.transmission?.trnasmisssionType,
    // fuel: item?.capacities?.oil,
    // trnasmisssionGear: item?.transmission?.trnasmisssionGear,
    // trnasmisssionDescription: item?.transmission?.trnasmisssionDescription,
    // driveType: item?.wheelsAndTyres?.driveType,
    // brakingSystem: item?.wheelsAndTyres?.brakingSystem,
    // wheelBase: item?.wheelsAndTyres?.wheelBase,
    // FrontTrackWidth: "",
    // FrontWheelDiameter: "",
    // FrontTyreType: "",
    // FrontTyrePSI: "",
    // RearTrackWidth: "",
    // RearWheelDiameter: "",
    // RearTyreType: "",
    // RearTyrePSI: "",

    image: "/assets/imagePlaceHolder.svg",
    threedot: "/assets/threeDotDataGrid.svg",
    // inServiceDate: item?.inService?.inServiceDate,
    // inServiceOdometer: item?.inService?.inServiceOdometer,
    // estimatedSeviceLifeMonths: item?.lifeEstimation?.estimatedSeviceLifeMonths,
    // estimatedSeviceLifeOdometer:
    //   item?.lifeEstimation?.estimatedSeviceLifeOdometer,
    // estimatedResaleValue: item?.lifeEstimation?.estimatedResaleValue,
    // outOfServiceDate: item?.outOfService?.outOfServiceDate,
    // outOfServiceOdometer: item?.outOfService?.outOfServiceOdometer,
    // markOut: item?.outOfService?.markOut,
    // purchaseVendor: item?.purchaseDetails?.purchaseVendor,
    // purchaseDate: item?.purchaseDetails?.purchaseDate,
    // purchasePrice: item?.purchaseDetails?.purchasePrice,
    // purchaseOdometer: item?.purchaseDetails?.purchaseOdometer,
    // purchaseNotes: item?.purchaseDetails?.notes,
    // isFinanced: item?.isFinanced,
    // vendor: item?.financingDetails?.vendor,
    // dateOfLease: item?.financingDetails?.dateOfLease,
    // capitalizedCost: item?.financingDetails?.capitalizedCost,
    // downPayment: item?.financingDetails?.downPayment,
    // firstPaymentDate: item?.financingDetails?.firstPaymentDate,
    // monthlyPayment: item?.financingDetails?.monthlyPayment,
    // instalments: item?.financingDetails?.instalments,
    // leaseEndDate: item?.financingDetails?.leaseEndDate,
    // residualValue: item?.financingDetails?.residualValue,
    // contractMileageLimit: item?.financingDetails?.contractMileageLimit,
    // excessMileageCharge: item?.financingDetails?.excessMileageCharge,
    // leaseNumber: item?.financingDetails?.leaseNumber,
    // leaseNotes: item?.financingDetails?.notes,
    // LeaseGenerateExpenses: item?.financingDetails?.GenerateExpenses,
    // lender: item?.financingDetails?.lender,
    // dateOfLoan: item?.financingDetails?.dateOfLoan,
    // amountOfLoan: item?.financingDetails?.amountOfLoan,
    // rateOfInterest: item?.financingDetails?.rateOfInterest,
    // numberOfPayments: item?.financingDetails?.numberOfPayments,
    // loanEndDate: item?.financingDetails?.loanEndDate,
    // accountNumber: item?.financingDetails?.accountNumber,
    // LoanNotes: item?.financingDetails?.LoanNotes,
    // generateExpenses: item?.financingDetails?.generateExpenses,
    owner:
      item?.additionalDetail?.ownershipId?.name?.english ||
      item?.additionalDetail?.operatorId?.name?.english ||
      "-",
  }));
  setRows(rowdata);
};

export { modifyVehicleResponse };
