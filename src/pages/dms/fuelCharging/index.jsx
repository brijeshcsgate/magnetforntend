import { Button } from '@/components/ui/button';
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import axios from 'axios';

export default function StaffUsers() {
  const [userApiData, setUserApiData] = useState('executed');

  const [isClearAll, setIsClearAll] = useState(false);
  const [extraFilterIds, setExtraFilterIds] = useState({
    depotsIds: [],
  });
  const navigate = useNavigate();
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Fuel & Charging');
  }, []);
  const onRowDataDeleteHandler = async (id) => {
    setUserApiData('notexecuted');
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fuelCharging/${id}`,
        {
          headers: {},
        }
      );

      if (response?.data?.status === true) {
        toast.success('Data Deleted Successfully');

        setUserApiData('executed');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const navigateToAdd = () => {
    navigate(`${ROUTES.ADD_FUEL_CHARGING}`, {
      state: { isEditeActive: true },
    });
  };
  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_FUEL_CHARGING}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const navigateToView = (rowData) => {
    navigate(`${ROUTES.UPDATE_FUEL_CHARGING}/${rowData?._id}`, {
      state: { isEditeActive: false },
    });
  };

  const HEAD_BUTTONS = [
    {
      label: 'Add Fuel & Charging',
      children: (
        <Button onClick={() => navigateToAdd()}>+ Add Fuel & Charging</Button>
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
      field: 'vehicleno',
      headerName: 'Vehicle No',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <img
              src="/assets/images/busimage.jpg"
              alt={`Image `}
              style={{ width: '33px', height: '33px' }}
            />
            <div>{params.row.vehicleno}</div>
          </div>
        </Link>
      ),
    },

    {
      field: 'route',
      headerName: 'Route',
      width: 120,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.route}
        </Link>
      ),
    },
    {
      field: 'OriginDistrict',
      headerName: 'Name',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.OriginDistrict}
        </Link>
      ),
    },
    {
      field: 'driver',
      headerName: 'Driver',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.driver}
        </Link>
      ),
    },

    {
      field: 'conductor',
      headerName: 'Conductor',
      width: 130,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.conductor}
        </Link>
      ),
    },
    {
      field: 'currentodometer',
      headerName: 'Current Odometer Reading',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.currentodometer}
        </Link>
      ),
    },
    {
      field: 'odometer',
      headerName: 'Last Odometer Reading',
      width: 170,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.odometer}
        </Link>
      ),
    },
    {
      field: 'fuleType',
      headerName: 'Fule Rate',
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.fuleType}
        </Link>
      ),
    },
    {
      field: 'fuleQuantity',
      headerName: 'Fuel Quantity (L)',
      width: 120,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.fuleQuantity}
        </Link>
      ),
    },

    {
      field: 'distance',
      headerName: 'Distance',
      width: 120,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.distance}
        </Link>
      ),
    },

    {
      field: 'inbound',
      headerName: ' Inbound',
      width: 120,
      renderCell: (params) => (
        <Link
          to={`${ROUTES.UPDATE_FUEL_CHARGING}/${params.row._id}`}
          state={{ id: params.row._id, isEditeActive: false }}
        >
          {' '}
          {params.row.inbound}
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
              <DropdownMenuItem
                onClick={() => {
                  navigateToView(params.row);
                }}
              >
                <EyeIcon className="size-4 mr-2" />
                <span>View</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigateToEdit(params.row)}>
                <PencilIcon className="size-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRowDataDeleteHandler(params.row._id)}
              >
                <TrashIcon className="size-4 mr-2" />
                <span>Delete</span>
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
    const response = await apiService.get(`${APIS.FUELANDCHAGING}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
        isTimetable: tab === 'TimeTable' ? true : null,
      },
    });
    return {
      data: response?.data?.list?.map((item, index) => ({
        id: index + 1 + page * pageSize,
        _id: item?._id,
        allData: item,
        vehicleno: item?.vehicle?.identification.registrationNumber || '-',
        vechicleImage:
          'https://images.picxy.com/cache/2019/6/30/a7c51574f11eba5ae2b6008977e7d4cb.jpg',
        route: item?.route || '-',
        OriginDistrict: item?.route || '-',
        driver: item?.alltimetable?.drivers?.[0]?.driver?.name?.english || '-',
        conductor:
          item?.alltimetable?.conductors?.[0]?.conductor?.name?.english || '-',
        currentodometer: item?.odometerReading?.current || '-',
        odometer: item?.odometerReading?.last || '-',
        fuleType: item?.fuel?.rate,
        fuleQuantity: item?.fuel?.quantity,
        distance: item?.distance || '-',
        inbound: item?.inbound || '-',
        image: '/assets/imagePlaceHolder.svg',
        threedot: '/assets/threeDotDataGrid.svg',
        owner:
          item?.additionalDetail?.ownershipId?.name?.english ||
          item?.additionalDetail?.operatorId?.name?.english ||
          '-',
      })),
      totalCount: response.data.totalCount,
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
      pageName="Fuel & Charging"
      LIST_OF_FILTERS={LIST_OF_FILTERS}
      headButtons={HEAD_BUTTONS}
      tabs={[
        { label: 'All', value: 'All' },
        { label: 'Time Table', value: 'TimeTable' },
        { label: 'Non TimeTable', value: 'Non TimeTable' },
      ]}
    />
  );
}
