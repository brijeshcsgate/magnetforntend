const modifyInspectionResponse = ({
  setRows,
  setTotalCount,
  response,
  page,
  pageSize,
}) => {
  setTotalCount(
    response?.data?.totalCount || response?.pagination?.totalCount || 0
  );

  const rowdata = response?.data?.list.map((item, index) => ({
    id: index + 1 + page * pageSize,
    _id: item?._id,
    allData: item,
    code: item?.code,
    threedot: "/assets/threeDotDataGrid.svg",
  }));
  setRows(rowdata);
};

export { modifyInspectionResponse };
