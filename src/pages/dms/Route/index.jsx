import { Button } from '@/components/ui/button';
import { EllipsisIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/route.constant';
import { EyeIcon } from 'lucide-react';
import { TrashIcon } from 'lucide-react';
import { LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tooltip } from '@mui/material';
import {
  hasAddVehicleRoutePermission,
  hasDeleteVehicleRoutePermission,
  hasViewVehicleRoutePermission,
} from '@/utils/permissions';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import useStore from '@/store/userStore';
import { useContext, useEffect } from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function RouteListView() {
  const { permissions } = useStore();
  const navigate = useNavigate();

  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Routes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const HEAD_BUTTONS = [
    {
      label: 'Add Route',
      children: hasAddVehicleRoutePermission(permissions) ? (
        <Button onClick={() => navigate(ROUTES.INSERT_ROUTE)}>
          +Add Route
        </Button>
      ) : null,
    },
    {
      label: 'More',
      children: (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="group">
              <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const columns = [
    {
      field: 'code',
      headerName: 'Code',
      headerClassName: 'super-app-theme--header',
      width: 110,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div>{params.row?.routeCode}</div>
        </Link>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 400,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row?.name}
        </Link>
      ),
    },
    {
      field: 'originEnglish',
      headerName: 'District (Origin)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params?.row?.outbound?.origin?.districtId?.name?.english || '-'}
        </Link>
      ),
    },
    {
      field: 'destinationEnglish',
      headerName: 'District (Destination)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params?.row?.outbound?.destination?.districtId?.name?.english || '-'}
        </Link>
      ),
    },
    {
      field: 'via',
      headerName: 'Via',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params?.row?.outbound?.via?.name?.english || '-'}
        </Link>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params?.row?.outbound?.services[0]?.category?.name?.english || '-'}
        </Link>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params?.row?.outbound?.services[0]?.type?.name?.english || '-'}
        </Link>
      ),
    },
    {
      field: 'service',
      headerName: 'Service',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => {
        const serviceNames =
          params?.row?.serviceTypes.map((service) => service.name.english) ||
          [];

        if (serviceNames.length === 1) {
          return (
            <Link
              to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
              state={{ id: params.row._id }}
            >
              {serviceNames[0]}
            </Link>
          );
        }
        return (
          <Tooltip title={serviceNames.join(', ')}>
            <Link
              to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
              state={{ id: params.row._id }}
            >
              {serviceNames[0]}
              <span className="font-normal text-xs">{` |  +${serviceNames.length - 1} more`}</span>
            </Link>
          </Tooltip>
        );
      },
    },
    {
      field: 'isInbound',
      headerName: 'RTO',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row?.isInbound ? 'Yes' : 'No'}
        </Link>
      ),
    },
    {
      field: 'threedot',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header hide-img-bordersvg',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon" className="group">
                <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {hasViewVehicleRoutePermission(permissions) ? (
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`${ROUTES.ROUTE}/preview/${params.row._id}`)
                  }
                >
                  <EyeIcon className="size-4 mr-2" />
                  <span>View</span>
                </DropdownMenuItem>
              ) : null}
              {!params.row?.timeTable && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate(
                      `${ROUTES.TIME_TABLE_ADD}/?routeName=${params.row?.name}`
                    )
                  }
                >
                  <LinkIcon className="size-4 mr-2" />
                  <span>Create Time Table</span>
                </DropdownMenuItem>
              )}
              {hasDeleteVehicleRoutePermission(permissions) ? (
                <DropdownMenuItem
                  onClick={() => toast.error('You can not delete this route')}
                >
                  <TrashIcon className="size-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fetchRoutes = async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
    tab,
  }) => {
    const response = await apiService.get(`${APIS.GET_ALL_ROUTES}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
      },
    });
    return {
      data: response.data.routes.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount,
    };
  };

  return (
    <PaginatedTableView
      queryKey="routes"
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Routes"
      headButtons={HEAD_BUTTONS}
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
