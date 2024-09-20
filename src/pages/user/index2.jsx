import { Button } from '@/components/ui/button';
import {
  EllipsisIcon,
  PencilIcon,
  Ticket,
  TicketIcon,
  TicketSlashIcon,
} from 'lucide-react';
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
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import { deleteIcon, editIcon } from '@/assets/Icons';

export default function UserListView() {
  const navigate = useNavigate();

  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_USER}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const handleDelete = (row) => {
    setModal({ isVisible: true, row, type: 'delete' });
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
      label: 'Add User',
      children: (
        <Button onClick={() => navigate(ROUTES.ADD_USER)}>+Add User</Button>
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
        // <Link
        //   to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
        //   state={{ id: params.row._id }}
        // >
        //   {params.row.name.english}
        // </Link>
        <>{params.row.name.english}</>
      ),
    },

    // {
    //   field: 'name.english',
    //   headerName: 'Name',
    //   headerClassName: 'super-app-theme--header',
    //   width: 200,
    //   renderCell: (params) => (
    //     <Link
    //       to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
    //       state={{ id: params.row._id }}
    //     >
    //       {params.row._id}
    //       {JSON.stringify(params)}
    //     </Link>
    //   ),
    // },
    {
      field: 'loginMobile',
      headerName: 'Mobile No.',
      headerClassName: 'super-app-theme--header',
      width: 150,
      valueGetter: (params) => params.row.loginMobile,
      renderCell: (params) => (
        // <Link
        //   to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
        //   state={{ id: params.row._id }}
        // >
        //   {params.row.loginMobile}
        // </Link>
        <>{params.row.loginMobile}</>
      ),
    },
    {
      field: 'loginEmail',
      headerName: 'Email',
      headerClassName: 'super-app-theme--header',
      width: 250,
      valueGetter: (params) => params.row.loginEmail,
      renderCell: (params) => <>{params.row.loginEmail}</>,
    },
    {
      field: 'roleType',
      headerName: 'Roles',
      headerClassName: 'super-app-theme--header',
      width: 200,
    },
    {
      field: 'regionId',
      headerName: 'Region',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.regionId?.length != 0 ? params.row?.regionId?.name : '-',
      renderCell: (params) => (
        <>
          {params.row?.regionId?.length != 0
            ? params.row?.regionId[0]?.name.english
            : '-'}
        </>
      ),
    },
    {
      field: 'depotId',
      headerName: 'Depot',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) =>
        params.row?.depotId?.length != 0 ? params.row?.depotId?.name : '-',
      renderCell: (params) => (
        <>
          {params.row?.depotId?.length != 0
            ? params.row?.depotId[0]?.name.english
            : '-'}
        </>
      ),
    },

    // {
    //   field: 'service',
    //   headerName: 'Service',
    //   headerClassName: 'super-app-theme--header',
    //   width: 200,
    //   renderCell: (params) => {
    //     const serviceNames =
    //       params?.row?.serviceTypes.map((service) => service.name.english) ||
    //       [];

    //     if (serviceNames.length === 1) {
    //       return (
    //         <Link
    //           to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
    //           state={{ id: params.row._id }}
    //         >
    //           {serviceNames[0]}
    //         </Link>
    //       );
    //     }
    //     return (
    //       <Tooltip title={serviceNames.join(', ')}>
    //         <Link
    //           to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
    //           state={{ id: params.row._id }}
    //         >
    //           {serviceNames[0]}
    //           <span className="font-normal text-xs">{` |  +${serviceNames.length - 1} more`}</span>
    //         </Link>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   field: 'isInbound',
    //   headerName: 'RTO',
    //   headerClassName: 'super-app-theme--header',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Link
    //       to={`${ROUTES.ROUTE}/preview/${params.row._id}`}
    //       state={{ id: params.row._id }}
    //     >
    //       {params.row?.isInbound ? 'Yes' : 'No'}
    //     </Link>
    //   ),
    // },
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
                // onClick={() => toast.error('You can not delete this route')}

                onClick={() => navigateToEdit(params.row)}
              >
                <PencilIcon className="size-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                // onClick={() => toast.error('You can not delete this route')}

                onClick={() => handleDelete(params?.row)}
              >
                <TrashIcon className="size-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleInvite(params?.row)}
                // onClick={() => toast.error('You can not delete this route')}
              >
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
    console.log('response----------', response);

    console.log('response----data----------', response.data.users);
    return {
      data: response.data.users.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount || 0,
    };
  };

  return (
    <PaginatedTableView
      queryKey="routes"
      queryFn={fetchRoutes}
      columns={columns}
      pageName="Users"
      headButtons={HEAD_BUTTONS}
      tabs={[
        { label: 'All', value: 'all' },
        // { label: 'Outbound', value: 'outbound' },
        // { label: 'Inbound', value: 'inbound' },
      ]}
    />
  );
}
