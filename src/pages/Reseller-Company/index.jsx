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
import { postApi } from '@/services/method';
import { ROUTES } from '@/constants/route.constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import DataCharectersTooltip from '@/components/ui/DataCharectersTooltip';
import { useContext, useEffect, useState } from 'react';
import { patchApi } from '@/services/method';
import { Tooltip } from '@mui/material';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function ResellCompany() {
  const [userApiData, setUserApiData] = useState('executed');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isClearAll, setIsClearAll] = useState(false);
  const [extraFilterIds, setExtraFilterIds] = useState({
    depotsIds: [],
  });
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('User Management');
  }, []);
  const refreshData = () => {
    setRefreshFlag((prev) => !prev);
  };

  const navigate = useNavigate();
  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_USER}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const navigateToView = (rowData) => {
    navigate(`${ROUTES.PREIVIEW_USER}`, {
      state: { id: rowData?._id },
    });
  };

  const handleActiveInactive = (row) => {
    const dd = !row.isActive;
    const payload = {
      isActive: dd,
      _id: row?._id,
    };
    setUserApiData('notexecuted');
    patchApi(APIS.UPDATE_USER_BY_ID, row?._id, payload).then((e) => {
      toast.success('Data updated successfully');
      setUserApiData('executed');
    });
  };
  const handleInvite = (row) => {
    const payload = {
      name: row?.name,
      loginEmail: row?.loginEmail,
      _id: row?._id,
    };
    postApi(APIS.INVITE, payload).then((res) => {
      toast.success('Invited');
    });
  };

  const HEAD_BUTTONS = [
    {
      label: 'Invite',
      children: (
        <Button onClick={() => navigate(ROUTES.RESELLCOMP_ADD)}>+ Add Reseller</Button>
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
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row.name.english,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
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
      field: 'loginMobile',
      headerName: 'Mobile No.',
      headerClassName: 'super-app-theme--header',
      width: 150,
      valueGetter: (params) => params.row.loginMobile,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
          {params.row.loginMobile}
        </Link>
      ),
    },
    {
      field: 'loginEmail',
      headerName: 'Email',
      headerClassName: 'super-app-theme--header',
      width: 250,
      valueGetter: (params) => params.row.loginEmail,
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
          {params.row?.loginEmail.length >= 25 ? (
            <DataCharectersTooltip
              text={params.row?.loginEmail}
              maxLength="25"
            />
          ) : (
            params.row?.loginEmail
          )}
        </Link>
      ),
    },
    {
      field: 'roleId',
      headerName: 'Roles',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => {
        const roleName = params.row.roleId?.role?.name?.english;
        if (
          roleName &&
          !['Driver', 'Super Admin', 'Conductor'].includes(roleName)
        ) {
          return roleName;
        }
        return '';
      },
      renderCell: (params) => (
        <Link to={`${ROUTES.PREIVIEW_USER}`} state={{ id: params.row._id }}>
          {params.row.roleId?.role?.name?.english.length >= 25 ? (
            <DataCharectersTooltip
              text={params.row.roleId?.role?.name?.english}
              maxLength="25"
            />
          ) : (
            params.row.roleId?.role?.name?.english
          )}
        </Link>
      ),
    },
    {
      field: 'regionId',
      headerName: 'Region',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.regionId?.length != 0 ? params.row?.regionId?.name : '-',

      renderCell: (params) => {
        const serviceNames =
          params.row?.regionId.map((service) => service.name.english) || [];

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

      renderCell: (params) => {
        const serviceNames =
          params.row?.regionId.map((service) => service.name.english) || [];

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
      field: 'depotId',
      headerName: 'Depot',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.depotId?.length != 0 ? params.row?.depotId?.name : '-',

      renderCell: (params) => {
        const serviceNames =
          params.row?.depotId.map((service) => service.name.english) || [];

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

      renderCell: (params) => {
        const serviceNames =
          params.row?.depotId.map((service) => service.name.english) || [];

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
      field: 'lastLogin',
      headerName: 'Last Login',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row?.lastLogin?.date || '-',

      renderCell: (params) => {
        const lastLoginDate = params.row?.lastLogin?.date || '-';
        const isActive = '-';
        const ip = params.row?.lastLogin?.ip || '-';
        return (
          <div>
            {lastLoginDate}
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
    const response = await apiService.get(`${APIS.USER_ALL_LIST}`, {
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
      data: response.data.users.map((row) => ({ ...row, id: row._id })),
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
              // let url = `${APIS.GET_ALL_VEHICLES}`;

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
      pageName="Users"
      headButtons={HEAD_BUTTONS}
      LIST_OF_FILTERS={LIST_OF_FILTERS}
      tabs={[{ label: 'All', value: 'all' }]}
    />
  );
}
