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
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tooltip } from '@mui/material';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import {
  hasAddVehicleTimeTablePermission,
  hasViewVehicleTimeTablePermission,
  hasUpdateVehicleTimeTablePermission,
  hasDeleteVehicleTimeTablePermission,
} from '@/utils/permissions';
import useStore from '@/store/userStore';

export default function RouteListView() {
  const { permissions } = useStore();
  const navigate = useNavigate();
  const HEAD_BUTTONS = [
    {
      label: 'Add Time Table',
      children: hasAddVehicleTimeTablePermission(permissions) ? (
        <Button onClick={() => navigate(ROUTES.TIME_TABLE_ADD)}>
          +Add Time Table
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
          <DropdownMenuContent>
            <DropdownMenuItem>Export CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const columns = [
    {
      field: 'timeTableCode',
      headerName: 'TimeTable Code',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.timeTableCode}
        </Link>
      ),
    },
    {
      field: 'route',
      headerName: 'Route Code & Name',
      headerClassName: 'super-app-theme--header',
      width: 500,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div>
            {'(' + params.row.route.routeCode + ') ' + params.row.route.name}
          </div>
        </Link>
      ),
    },
    {
      field: 'origin',
      headerName: 'District (Origin)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div>
            {params.row.route?.outbound?.origin?.districtId?.name?.english ||
              '-'}
          </div>
        </Link>
      ),
    },
    {
      field: 'destination',
      headerName: 'District (Destination)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div>
            {params.row.route?.outbound?.destination?.districtId?.name
              ?.english || '-'}
          </div>
        </Link>
      ),
    },
    {
      field: 'services',
      headerName: 'Services',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => {
        const serviceNames =
          params?.row?.route?.serviceTypes?.map(
            (service) => service.name.english
          ) || [];
        if (serviceNames.length === 1) {
          return (
            <Link
              to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
              state={{ id: params.row._id }}
            >
              {serviceNames[0]}
            </Link>
          );
        }
        return (
          <Tooltip title={serviceNames.join(', ')}>
            <Link
              to={`${ROUTES.TIME_TABLE}/preview/${params.row._id}`}
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
              <DropdownMenuItem
                onClick={() =>
                  navigate(`${ROUTES.TIME_TABLE}/preview/${params.row._id}`)
                }
              >
                <EyeIcon className="size-4 mr-2" />
                <span>View</span>
              </DropdownMenuItem>

              {hasDeleteVehicleTimeTablePermission(permissions) ? (
                <DropdownMenuItem
                  onClick={() =>
                    toast.error('You can not delete this time table')
                  }
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

  const fetchTimeTable = async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
    tab,
  }) => {
    const response = await apiService.get(`${APIS.GET_ALL_TIME_TABLE}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
      },
    });
    return {
      data: response.data.timeTables.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount,
    };
  };

  return (
    <PaginatedTableView
      queryKey="timetable"
      queryFn={fetchTimeTable}
      columns={columns}
      pageName="Time Table"
      headButtons={HEAD_BUTTONS}
      tabs={[{ label: 'All', value: 'all' }]}
      sortBy="timeTableCode"
    />
  );
}
