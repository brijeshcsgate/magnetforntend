/* eslint-disable react/prop-types */
import { TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./DataGrid.css";

const DataTable = ({
  loading,
  rows,
  columns,
  page,
  pageSize,
  totalCount,
  handlePageChange,
  handlePageSizeChange,
  setSelectedRows,
  checkboxSelection = true,
}) => {
  const handleSelectRow = (selectedRowsIdx) => {
    const selectedRows = selectedRowsIdx.map((idx) => rows[idx]);
    setSelectedRows(selectedRows);
  };

  return (
    <div className="data-grid-container">
      <Box
        sx={{
          position: "relative",
          height: "65vh",
          width: "100%",
          "& .super-app-theme--header": {
            color: "#000",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      >
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          getRowId={(r) => r._id}
          pagination={false}
          checkboxSelection={checkboxSelection}
          hideFooterPagination
          onSelectionModelChange={(selectedIdxs) =>
            handleSelectRow(selectedIdxs)
          }
        />
        <div className="ml-10 flex items-end justify-end absolute bottom-2 right-2  w-100">
          <TablePagination
            sx={{
              backgroundColor: "white",
              height: "40px",
            }}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page}
            onRowsPerPageChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[5, 10, 15, 25, 50]}
          />
        </div>
      </Box>
    </div>
  );
};

export default DataTable;
