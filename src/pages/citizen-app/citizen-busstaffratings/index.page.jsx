import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import apiService from '@/lib/apiService';
import { useContext, useEffect } from 'react';

export default function CitizenBusStaffRatingsPage() {
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('CitizenBusStaffRatingsPage');
  }, []);

  const columns = [
    {
      field: 'busNumber',
      headerName: 'Bus Number',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.busNumber,
    },
    {
      field: 'staffName',
      headerName: 'Staff Name',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.staffName,
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
      headerClassName: 'super-app-theme--header',
      width: 250,
      renderCell: (params) => params.row?.feedback,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.mobile,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.rating,
    },
  ];

  const fetchRoutes = async ({ page, pageSize, search, sortBy, order }) => {
    const response = await apiService.get(`/v1/citizen-user/bus-staff-rating`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
      },
    });
    return {
      data: response.data.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount || 0,
    };
  };
  return (
    <PaginatedTableView
      queryKey="citizen-busstaffratings"
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Citizen Bus Staff Ratings"
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
