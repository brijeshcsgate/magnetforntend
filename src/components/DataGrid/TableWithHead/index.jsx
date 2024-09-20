import TableWithHead from "./TableWithHead";
import DataTableAction from "../DataTableAction/DataTableAction";

const DataTableComponent = ({
  page,
  pageSize,
  totalCount,
  handlePageChange,
  handlePageSizeChange,
  headers,
  rows,
  tabComonent,
  actionButtons,
  actionData,
  moreActionData,
  onGetVehicleApi,
  loading,
  title,
  setSearch,
  selectedRows,
  setSelectedRows,
  LIST_OF_FILTERS,
  checkboxSelection,
  breadcrumb,
  isGrid,
  isGridOpened,
  girdData
}) => {
  const handleRowSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };
  return (
    <div className="data-table-complete-component">
      <TableWithHead
        title={title}
        headers={headers}
        rows={rows}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        selectedRows={selectedRows}
        onRowSelectionChange={handleRowSelectionChange}
        actionButtons={actionButtons}
        tabsComponent={tabComonent}
        girdData={girdData}
        dataTableActions={
          <DataTableAction
            actionData={actionData}
            selectedRows={selectedRows}
            setSearch={setSearch}
            LIST_OF_FILTERS={LIST_OF_FILTERS}
          />
        }
        moreActionData={moreActionData}
        onGetVehicleApi={onGetVehicleApi}
        checkboxSelection={checkboxSelection}
        breadcrumb={breadcrumb}
        isGrid={isGrid}
        isGridOpened={isGridOpened}
      />
    </div>
  );
};

export default DataTableComponent;
