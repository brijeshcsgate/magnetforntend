import { getApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
import moment from "moment";

const formatEndDate = (date) => {
  const momentDate = moment(date);
  if (
    momentDate.isValid() &&
    momentDate.year() > 1000 &&
    momentDate.year() < 3000
  ) {
    return momentDate.format("DD MMM YYYY");
  } else {
    return null;
  }
};

const onGetCrewApi = ({
  setTableOptions,
  tableOptions,
  handleTable,
  page,
  pageSize,
  setRows,
  search,
  setTotalCount,
  isImport,
}) => {
  !isImport && handleTable("loading", true);
  const payload = {
    page: page,
    pageSize: pageSize,
    search: search,
  };
  let url = `${APIS.DRIVER_CONDUCTOR}?pageSize=${pageSize}&page=${
    page + 1
  }&search=${search}`;
  getApi(url, null, payload)
    .then((response) => {

      const rowData = response?.data?.list?.map((item, index) => ({
        index: index + 1 + payload.page * payload.pageSize,
        _id: item?._id,
        employeeId: item?.employeeId,
        role: item?.roleType,
        employeeId: item?.employeeId,
        role: item?.roleType,
        code: item?.code,
        allData: item,
        runLastWeek: item?.run?.lastWeek ? item?.run?.lastWeek : "-",
        runTotal: item?.run?.total ? item?.run?.total : "-",
        // avgMileage: item?.averageMileage ? item?.averageMileage: "-",
        dutyCancellations: item?.dutyCancelled ? item?.dutyCancelled : "-",
        age: item?.age ? item.age : "-",
        // service: item?.service,
        depot: item?.depot?.name?.english,
        name: item?.name?.english,
        accidents: item?.accident ? item?.accident : "-",
        dateofJoining: item?.dateofJoining
          ? formatEndDate(item?.dateofJoining)
          : "-",
        contractEndDate: item?.servicePeriod?.endDate
          ? formatEndDate(item?.servicePeriod?.endDate)
          : "-",
        licenseValidity: formatEndDate(item?.licenseDate?.expiry),
        threedot: "/assets/threeDotDataGrid.svg",
      }));
      setTotalCount(
        response?.data?.totalCount || response?.pagination?.totalCount || 0
      );

      setTableOptions({
        ...tableOptions,
        totalCount: response?.pagination?.totalCount || 0,
        rows: rowData,
        loading: false,
      });
      setRows(rowData);
    })
    .catch(() => {
      handleTable("loading", false);
    });
};

export { formatEndDate, onGetCrewApi };
