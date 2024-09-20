const modifyFuelAndChargingResponse = ({
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
    vehicleno: item?.vehicle?.identification.registrationNumber || '--',
    vechicleImage:
      "https://images.picxy.com/cache/2019/6/30/a7c51574f11eba5ae2b6008977e7d4cb.jpg",
    route: item?.route || "--",
    OriginDistrict: item?.route || "-",
    driver : item?.alltimetable?.drivers?.[0]?.driver?.name?.english || "--",
    conductor : item?.alltimetable?.conductors?.[0]?.conductor?.name?.english || "--",
    currentodometer: item?.odometerReading?.current ||"--",
    odometer: item?.odometerReading?.last ||"--",
    fuleType: item ?.fuel?.rate,
    fuleQuantity: item ?.fuel?.quantity,
    distance: item?.distance || "--",
    inbound : item?.inbound || "--",
    image: "/assets/imagePlaceHolder.svg",
    threedot: "/assets/threeDotDataGrid.svg",
    owner:
      item?.additionalDetail?.ownershipId?.name?.english ||
      item?.additionalDetail?.operatorId?.name?.english ||
      "-",
  }));
  setRows(rowdata);
};

export { modifyFuelAndChargingResponse };
