import { Button } from '@/components/ui/button';
import {
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  TicketSlashIcon,
  UserRoundCheck,
  UserRoundX,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { TrashIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import { formatEndDate } from '@/utils/crew.utils/crew.helper';
import DataCharectersTooltip from '@/components/ui/DataCharectersTooltip';
import { useContext, useEffect, useState } from 'react';
import { patchApi } from '@/services/method';
import { Tooltip } from '@mui/material';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function Crew() {
  const navigate = useNavigate();
  const [userApiData, setUserApiData] = useState('executed');
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [isClearAll, setIsClearAll] = useState(false);
  const [extraFilterIds, setExtraFilterIds] = useState({
    depotsIds: [],
  });
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Crew');
  }, []);
  const refreshData = () => {
    setRefreshFlag((prev) => !prev);
  };

  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_CREW}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };

  const handleActiveInactive = (row) => {
    const dd = !row.isActive;
    const payload = {
      isActive: dd,
      _id: row?._id,
    };
    setUserApiData('notexecuted');
    patchApi(APIS.DRIVER_CONDUCTOR, row?._id, payload).then((e) => {
      toast.success('Data updated successfully');
      setUserApiData('executed');
    });
  };
  const navigateToView = (rowData) => {
    navigate(`${ROUTES.PREIVIEW_CREW}`, {
      state: { id: rowData?._id },
    });
  };
  const handleInvite = (row) => {
    const payload = {
      name: row?.name,
      loginEmail: row?.email,
      _id: row?._id,
    };
    postApi(APIS.INVITE, payload).then((res) => {
      toast.success('Invited');
    });
  };

  const HEAD_BUTTONS = [
    {
      label: 'Add Crew',
      children: (
        <Button onClick={() => navigate(ROUTES.ADD_CREW)}>+ Add Crew</Button>
      ),
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
      field: 'employeeId',
      headerName: 'EMP ID',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row?.employeeId,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.employeeId}
        </Link>
      ),
    },

    {
      field: 'role',
      headerName: 'Type',
      headerClassName: 'super-app-theme--header',
      width: 150,
      valueGetter: (params) => params?.row?.roleType,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params?.row?.roleType}
        </Link>
      ),
    },

    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 250,
      valueGetter: (params) => params.row?.name?.english,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.name?.english.length >= 25 ? (
            <DataCharectersTooltip
              text={params.row.name.english}
              maxLength="25"
            />
          ) : (
            params.row.name.english
          )}
        </Link>
      ),
    },
    {
      field: 'depot',
      headerName: 'Depot',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row?.depot?.name?.english,

      renderCell: (params) => {
        const serviceNames =
          [params?.row?.depot]?.map((service) => service?.name?.english) || [];

        if (serviceNames.length === 1) {
          return (
            <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
              {serviceNames[0]}
            </Link>
          );
        }
        return (
          <Tooltip title={serviceNames.join(', ')}>
            <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
              {serviceNames[0]}
              <span className="font-normal text-xs">{` |  +${serviceNames.length - 1} more`}</span>
            </Link>
          </Tooltip>
        );
      },
    },
    {
      field: 'age',
      headerName: 'Age (Year)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => (params.row?.age ? params.row?.age : '-'),
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.age ? params.row?.age : '-'}
        </Link>
      ),
    },
    {
      field: 'runLastWeek',
      headerName: 'Run (Last Week) (km)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.run?.lastWeek ? params.row?.run?.lastWeek : '-',
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.run?.lastWeek ? params.row?.run?.lastWeek : '-'}
        </Link>
      ),
    },
    {
      field: 'runTotal',
      headerName: 'Total Run (km)',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.run?.total ? params.row?.run?.total : '-',
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.run?.total ? params.row?.run?.total : '-'}
        </Link>
      ),
    },
    {
      field: 'dateofJoining',
      headerName: 'Date Of Joining',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params?.row?.dateofJoining ? formatEndDate(params?.dateofJoining) : '-',
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.dateofJoining
            ? formatEndDate(params.row?.dateofJoining)
            : '-'}
        </Link>
      ),
    },
    {
      field: 'accidents',
      headerName: 'Accidents',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.accident ? params.row?.accident : '-',
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.accident ? params.row?.accident : '-'}
        </Link>
      ),
    },
    {
      field: 'contractEndDate',
      headerName: 'Contract End Date',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.servicePeriod?.endDate
          ? formatEndDate(params.row?.servicePeriod?.endDate)
          : '-',
      headerClassName: 'super-app-theme--header',

      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.servicePeriod?.endDate
            ? formatEndDate(params.row?.servicePeriod?.endDate)
            : '-'}
        </Link>
      ),
    },
    {
      field: 'licenseValidity',
      headerName: 'License Validity',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => formatEndDate(params.row?.licenseDate?.expiry),
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.licenseDate?.expiry
            ? formatEndDate(params.row?.licenseDate?.expiry)
            : '-'}
        </Link>
      ),
    },

    {
      field: 'dutyCancellations',
      headerName: 'Duty Cancellations',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.dutyCancelled ? params.row?.dutyCancelled : '-',
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_CREW}`} state={{ id: params.row._id }}>
          {params.row?.dutyCancelled ? params.row?.dutyCancelled : '-'}
        </Link>
      ),
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      headerClassName: 'super-app-theme--header',
      width: 300, // Adjust the width as needed
      valueGetter: (params) => params.row?.lastLogin?.date || '-',

      renderCell: (params) => {
        const lastLoginDate = params.row?.lastLogin?.date || '-';
        const isActive = '-';
        const ip = params?.row?.lastLogin?.ip || '-';
        console.log('lastLoginDate', params);
        return (
          <div>
            <div>{lastLoginDate}</div>
            <div>
              <span style={{ color: isActive ? 'green' : 'red' }}>
                {isActive}
              </span>
              <span> | {ip}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: 'isActive',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row?.isActive || '-',

      renderCell: (params) => {
        const isActive = params.row.isActive;

        return (
          <div>
            <span style={{ color: isActive ? 'green' : 'red' }}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
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
              <DropdownMenuItem onClick={() => navigateToView(params.row)}>
                <EyeIcon className="size-4 mr-2" />
                <span>View</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigateToEdit(params.row)}>
                <PencilIcon className="size-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleActiveInactive(params?.row);
                  refreshData();
                }}
              >
                {params?.row.isActive === true ? (
                  <UserRoundX className="size-4 mr-2" />
                ) : (
                  <UserRoundCheck className="size-4 mr-2" />
                )}
                <span>
                  {params?.row.isActive === true ? 'Inactive' : 'Active'}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleInvite(params?.row)}>
                <TicketSlashIcon className="size-4 mr-2" />
                <span>Invite</span>
              </DropdownMenuItem>
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
    const response = await apiService.get(`${APIS.DRIVER_CONDUCTOR}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
        isInbound: tab === 'inbound' ? true : null,
      },
    });
    return {
      data: response.data.list.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount || 0,
    };
  };

  const LIST_OF_FILTERS = [
    {
      title: 'Depot',
      name: 'depot',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilterIds({ ...extraFilterIds, depotsIds: getIds });
          setIsClearAll(true);
        } else {
          setExtraFilterIds({ ...extraFilterIds, depotsIds: [] });
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: isClearAll === true ? 'Clear All' : '',
      className: 'clear-all-button',
      type: 'button',
      submitAction:
        isClearAll === true
          ? (data) => {
              setExtraFilterIds({
                ...extraFilterIds,
                depotsIds: [],
                ownersIds: [],
                serviceTypeIds: [],
                deviceTypeIds: [],
              });

              setIsActiveTab('All');
              setIsClearAll(false);
            }
          : '',
    },
  ];

  return (
    <PaginatedTableView
      queryKey={`routes ${userApiData}`}
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Crew"
      headButtons={HEAD_BUTTONS}
      LIST_OF_FILTERS={LIST_OF_FILTERS}
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
