import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const DataGridView = ({ columns, rows, pageSizeOptions = [5, 10], loading = false, checkboxSelection = false }) => {
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        // sx={{ border: 0 }}
        sx={{
            border: 1,
            '& .custom-header': {
              backgroundColor: 'red', // Custom background color for headers
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#002850', // Custom font color
            },}}
      />
    </Paper>
  );
};

export default DataGridView;
