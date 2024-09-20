import { getApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";

// const onGetUserApi = ({
//   setTableOptions,
//   tableOptions,
//   handleTable,
//   page,
//   pageSize,
//   setRows,
//   setTotalCount,
//   isImport,
// }) => {
//   !isImport && handleTable("loading", true);
//   const payload = {
//     page: page,
//     pageSize: pageSize,
//   };
//   let url = `${APIS.USER_LIST}?page=${page}&pageSize=${pageSize}`;
//   getApi(url, null, payload)
//     .then((response) => {
//   
//       const rowData = response?.data?.list?.map((item, index) => ({
//         index: index + 1 + payload.page * payload.pageSize,
//         _id: item?._id,
//         name: item?.name?.english,
//         code: item?.code,
//         runLastWeek: item?.run?.lastWeek || 0,
//         runTotal: item?.run?.total || 0,
//         region: item?.regionId?.name?.english,
//         designation: item?.roleId?.name?.english,
//         email: item?.email,
//         mobileNumber: item?.mobile,
//       }));

//     
//       setTableOptions({
//         ...tableOptions,
//         totalCount: response?.pagination?.totalCount || 0,
//         rows: rowData,
//         loading: false,
//       });
//       setRows(rowData);
//       setTotalCount(response?.pagination?.totalCount || 0);
//     })
//     .catch(() => {
//       handleTable("loading", false);
//     });
// };

const modifyUserResponse = ({
  setRows,
  setTotalCount,
  response,
  page,
  pageSize,
}) => {

  setTotalCount(
    response?.data?.totalCount || response?.pagination?.totalCount || 0
  );

  const rowData = response?.data?.list?.map((item, index) => ({
    id: index + 1 + page * pageSize,
    _id: item?._id,
    name: item?.name?.english,
    code: item?.code,
    depot: item?.depotNames,
    runLastWeek: item?.run?.lastWeek || 0,
    runTotal: item?.run?.total || 0,
    region: item?.regionNames,
    roleType: item?.roleType,
    email: item?.loginEmail,
    mobileNumber: item?.loginMobile,
    threedot: "/assets/threeDotDataGrid.svg",
  }));

  setRows(rowData);
};
export { modifyUserResponse };
