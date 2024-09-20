import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import apiService from '@/lib/apiService';
import { useContext, useEffect } from 'react';

export default function CitizenFeedbackPage() {
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Citizen Feedback Page');
  }, []);

  const columns = [
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
    const response = await apiService.get(`/v1/citizen-user/feedback`, {
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
      queryKey="citizen-feedback"
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Citizen Feedback"
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
