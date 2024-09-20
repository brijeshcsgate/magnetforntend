import DataTable from '@/components/DataGrid/DataTable';
import { useState } from 'react';

const ChallanI = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(5);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (pageSize) => {
    setPage(0);
    setPageSize(pageSize?.target.value);
  };
  const rows = [
    {
      _id: 1,
      challanDate: '12 April, 2024',
      closerDate: '12 April, 2024',
      aging: 20,
      challanNumber: 'ABHU6789',
      challanPlace: 'Lucknow',
      violationDetails: 'Lucknow',
      image: '',
      dlrcNumber: 'UP32 34890058667',
      state: 'Uttar Pradesh',
      amount: '50,000.00',
      isActive: false,
    },
    {
      _id: 2,
      challanDate: '12 April, 2024',
      closerDate: '12 April, 2024',
      aging: 12,
      challanNumber: 'ABHU6789',
      challanPlace: 'Lucknow',
      violationDetails: 'Lucknow',
      image: '',
      dlrcNumber: 'UP32 34890058667',
      state: 'Uttar Pradesh',
      amount: '50,000.00',
      isActive: true,
    },
    {
      _id: 3,
      challanDate: '12, April, 2024',
      closerDate: '12, April, 2024',
      aging: 23,
      challanNumber: 'ABHU6789',
      challanPlace: 'Lucknow',
      violationDetails: 'Lucknow',
      image: '',
      dlrcNumber: 'UP32 34890058667',
      state: 'Uttar Pradesh',
      amount: '50,000.00',
      isActive: true,
    },
    {
      _id: 4,
      challanDate: '12 April, 2024',
      closerDate: '12 April, 2024',
      aging: 45,
      challanNumber: 'ABHU6789',
      challanPlace: 'Lucknow',
      violationDetails: 'Lucknow',
      image: '',
      dlrcNumber: 'UP32 34890058667',
      state: 'Uttar Pradesh',
      amount: '50,000.00',
      isActive: true,
    },
    {
      _id: 5,
      challanDate: '12 April, 2024',
      closerDate: '12 April, 2024',
      aging: 50,
      challanNumber: 'ABHU6789',
      challanPlace: 'Lucknow',
      violationDetails: 'Lucknow',
      image: '',
      dlrcNumber: 'UP32 34890058667',
      state: 'Uttar Pradesh',
      amount: '50,000.00',
      isActive: true,
    },
  ];

  const columns = [
    {
      field: 'challanDate',
      headerName: 'Challan Date',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'closerDate',
      headerName: 'Closer Date',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'aging',
      headerName: 'Aging',
      headerClassName: 'super-app-theme--header',
      width: 100,
    },
    {
      field: 'challanNumber',
      headerName: 'Challan Number',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'challanPlace',
      headerName: 'Challan  Place',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'violationDetails',
      headerName: 'Violation Details',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'image',
      headerName: 'Image',
      headerClassName: 'super-app-theme--header',
      width: 100,
    },
    {
      field: 'dlrcNumber',
      headerName: 'DL/RC Number',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'state',
      headerName: 'State',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div className='d-h-center cursor-pointer' onClick={() => setModal({ isVisible: true, row: params.row, type: 'status' })}>
          <div
            className={`${params.value
                ? 'rounded-full text-center text-white text-[13px] py-1 w-28 bg-[#ADD024] '
                : 'rounded-full text-center text-white text-[13px] py-1 w-28 bg-[#FF6A49]'
              }`}
          >
            {params.value ? 'Disposed' : 'Pending'}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className=''>
      <div className='flex gap-6 px-10 my-5 flex-wrap'>
        <div className='w-full md:w-1/5 shadow-lg bg-[#ADD024]  rounded-lg flex justify-between items-center h-[94px] p-5 hover:brightness-110'>
          <p className='text-[22px]  text-white font-500'>Disposed</p>
          <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full'>
            <span className='text-lg'>04</span>
          </div>
        </div>
        <div className='w-full md:w-1/5 shadow-lg bg-[#FF6A49]  rounded-lg flex justify-between items-center h-[94px] p-5 hover:brightness-110'>
          <p className='text-[22px]  text-white font-500'>Pending</p>
          <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full'>
            <span className='text-lg'>01</span>
          </div>
        </div>
      </div>
      <div className='px-5'>
        <DataTable
          loading={false}
          rows={rows}
          columns={columns}
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          setSelectedRows={setSelectedRows}
        />
      </div>


    </div>
  );
};
export default ChallanI;
