import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import apiService from '@/lib/apiService';
import { useContext, useEffect } from 'react';

export default function CitizenRequestroutePage() {
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Citizen Request Route Page');
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => params.row?.name,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.email,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.mobile,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => params.row?.mobile,
    },
    {
      field: 'country',
      headerName: 'Country',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => params.row?.country,
    },
    {
      field: 'state',
      headerName: 'State',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => params.row?.state,
    },
    {
      field: 'city',
      headerName: 'City',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => params.row?.city,
    },
    {
      field: 'address',
      headerName: 'Address',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => params.row?.address,
    },
    {
      field: 'complaint',
      headerName: 'Complaint',
      headerClassName: 'super-app-theme--header',
      width: 300,
      renderCell: (params) => params.row?.complaint,
    },
  ];

  const fetchRoutes = async ({ page, pageSize, search, sortBy, order }) => {
    const response = await apiService.get(`v1/citizen-user/request-route`, {
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
      queryKey="citizen-requestroute"
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Citizen Request Route"
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
