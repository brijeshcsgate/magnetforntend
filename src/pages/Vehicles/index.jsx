
import { Button } from '@/components/ui/button';
import {
  EllipsisIcon,
  EyeIcon,
  FileUpIcon,
  ImportIcon,
  LocateFixedIcon,
  PencilIcon,
  PlusIcon,
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

import { useContext, useEffect, useRef, useState } from 'react';
import { getApi, patchApi } from '@/services/method';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { cn, toTitleCase } from '@/lib/utils';
import { statusData } from './PreviewVehicle/StatusCombobox';
import axios from 'axios';

export default function Vehicles() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Using ref to ensure access to the input

  const [userApiData, setUserApiData] = useState('executed');
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [isActiveTab, setIsActiveTab] = useState('All');
  const [isClearAll, setIsClearAll] = useState(false);
  const [extraFilterIds, setExtraFilterIds] = useState({
    depotsIds: [],
    ownersIds: [],
    serviceTypeIds: [],
    deviceTypeIds: [],
  });
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Vehicles');
  }, []);
  const refreshData = () => {
    setRefreshFlag((prev) => !prev);
  };

  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.VEHICLES}/edit/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const onRowDataDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/vehicle/${id}`,
        {
          headers: {},
        }
      );

      if (response?.data?.message === 'OK') {
        toast.success('Data Deleted Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error(error?.message);
    }
  };

  const handleExportCSV = () => {
    try {
      let backendURL = `${APIS.EXPORT_VEHICLES}`;
      getApi(backendURL, null, null)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'vehicles.csv');
          toast.success('Data Exported Successfully');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navigateToView = (rowData) => {
    navigate(`${ROUTES.VEHICLES}/preview/${rowData?._id}`, {
      state: { rowData, comparator: 'gridNillComparator' },
    });
  };

  const onAddVechicle = () => {
    navigate(ROUTES.INSERT_VEHICLE);
  };

  const HEAD_BUTTONS = [
    {
      label: 'Add Vehicles',
      children: (
        <Button onClick={() => onAddVechicle()}>+ Add Vehicles</Button>
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
            <DropdownMenuItem onClick={() => handleExportCSV()}>
              <FileUpIcon className="size-4 mr-2" />
              <span>Export CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateToView(params.row)}>
              <PlusIcon className="size-4 mr-2" />
              <span>Add Multiple Vehicles</span>
            </DropdownMenuItem>
            <input
              ref={fileInputRef}
              type="file"
              id="bulk-upload"
              style={{ display: 'none' }}
            />
            <DropdownMenuItem onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click(); // Trigger the file input click event
              } else {
                console.error('File input element not found');
              }
            }}
            >
              <ImportIcon className="size-4 mr-2" />
              <span>Import Vehicles</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigateToView(params.row)}>
              <ImportIcon className="size-4 mr-2" />
              <span>Import Meter Entries</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateToView(params.row)}>
              <LocateFixedIcon className="size-4 mr-2" />
              <span>Add GPS / Telematics integration</span>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  const columns = [
    {
      field: 'vechicleName',
      headerName: 'Vehicle',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <img
              src={params?.row?.vechicleImage}
              alt={`Image `}
              style={{ width: '33px', height: '33px' }}
            />
            <div>{params.row.vechicleName}</div>
          </div>

        </Link>
      ),
    },
    {
      field: 'depot',
      headerName: 'Depot',
      headerClassName: 'super-app-theme--header',
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.depot}
        </Link>
      ),
    },
    {
      field: 'owner',
      headerName: 'Owner',
      headerClassName: 'super-app-theme--header',
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.owner}
        </Link>
      ),
    },
    {
      field: 'ServiceType',
      headerName: 'Service Type',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.ServiceType}
        </Link>
      ),
    },
    {
      field: 'seating',
      headerName: 'Seating',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.seating}
        </Link>
      ),
    },
    {
      field: 'aging',
      headerName: 'Mfg Year',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.aging}
        </Link>
      ),
    },
    {
      field: 'chassis',
      headerName: 'Chassis No.',
      headerClassName: 'super-app-theme--header',
      width: 190,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.chassis}
        </Link>
      ),
    },
    {
      field: 'engine',
      headerName: 'Engine No.',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.engine}
        </Link>
      ),
    },
    {
      field: 'makeModel',
      headerName: 'Make/Model',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.makeModel}
        </Link>
      ),
    },
    {
      field: 'fuel',
      headerName: 'Fuel',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.fuel}
        </Link>
      ),
    },
    {
      field: 'odometerReading',
      headerName: 'Odometer Reading(KM)',
      headerClassName: 'super-app-theme--header',
      width: 220,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.odometerReading}
        </Link>
      ),
    },
    {
      field: 'vts',
      headerName: 'VTS',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/vehicles/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.vts ? 'Yes' : 'No'}
        </Link>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => {
        const status = params.row.status || 'active';
        return (
          <Link
            to={`/vehicles/preview/${params.row._id}`}
            state={{ id: params.row._id }}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'h-2 w-2 rounded-full whitespace-nowrap',
                  status.toLowerCase() === statusData[0].value &&
                  'bg-green-500',
                  status === statusData[1].value && 'bg-gray-500',
                  status === statusData[2].value && 'bg-orange-500',
                  status === statusData[3].value && 'bg-red-500'
                )}
              />{' '}
              {toTitleCase(status)}
            </div>
          </Link>
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
    const response = await apiService.get(`${APIS.GET_ALL_VEHICLES}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
        status: tab === "all" ? null : tab,
        id: [...extraFilterIds.depotsIds, ...extraFilterIds.deviceTypeIds, ...extraFilterIds.ownersIds, ...extraFilterIds.serviceTypeIds].join(',')

      },
    });
    setUserApiData('executed');
    return {
      data: response?.data?.list?.map((item, index) => ({
        id: index + 1 + page * pageSize,
        _id: item?._id,
        allData: item,
        vechicleRName: item?.identification?.registrationNumber,
        vechicleName: item?.identification?.registrationNumber,
        vechicleImage:
        item?.identification?.images[0]?.url,
        type: item?.identification?.chassisBodyTypeId?.name?.english,
        seating: item?.seatingConfiguration?.totalSeats || "-",
        makeModel: `${item?.identification?.makeId?.name?.english
          ? `${item?.identification?.makeId?.name?.english}${"/"}${item?.identification?.modelId?.name?.english
            ? item?.identification?.modelId?.name?.english
            : ""
          }`
          : ""
          }${item?.vehicleModelId?.modelName ? item?.vehicleModelId?.modelName : ""}`,
        fuel: item?.identification?.fuelTypeId?.name?.english || "-",
        vts: item?.serviceDetail?.vts,
        status: item.status,
        chassis: item?.identification?.chassisNumber || "-",
        engine: item?.identification?.engineNumber || "-",
        aging: item?.identification?.manufacturingYear || "-",
        depot: item?.serviceDetail?.depotId?.name?.english || "-",
        ServiceType: item?.serviceDetail?.serviceTypeId?.name?.english || "-",
        odometerReading: item?.lifeCycle?.inService?.odometer || 0,

        image: "/assets/imagePlaceHolder.svg",
        threedot: "/assets/threeDotDataGrid.svg",
        owner:
          item?.additionalDetail?.ownershipId?.name?.english ||
          item?.additionalDetail?.operatorId?.name?.english ||
          "-",
      })),
      totalCount: response.data.totalCount || 0,
    };
  };
  const LIST_OF_FILTERS = [
    {
      title: 'Depot',
      name: 'depot',
      submitAction: (data) => {
        console.log('data', data)
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilterIds({ ...extraFilterIds, depotsIds: getIds });
          setUserApiData('notexecuted');
          setIsClearAll(true);

          setIsActiveTab('depot');
        } else {
          setExtraFilterIds({ ...extraFilterIds, depotsIds: [] });
          setUserApiData('notexecuted');
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: 'Owners',
      name: 'busOwnership',
      submitAction: (data) => {
        if (data) {

          let getIds = data.map((item) => item.value);
          setExtraFilterIds({ ...extraFilterIds, ownersIds: getIds });
          setIsClearAll(true);

          setUserApiData('notexecuted');

          setIsActiveTab('owner');
        } else {
          setExtraFilterIds({ ...extraFilterIds, ownersIds: [] });

          setUserApiData('notexecuted');
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: 'Service Types',
      name: 'busServiceType',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilterIds({ ...extraFilterIds, serviceTypeIds: getIds });
          setIsClearAll(true);

          setUserApiData('notexecuted');

          setIsActiveTab('service');
        } else {
          setExtraFilterIds({ ...extraFilterIds, serviceTypeIds: [] });

          setUserApiData('notexecuted');
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: 'Device Type',
      name: 'deviceType',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilterIds({ ...extraFilterIds, deviceTypeIds: getIds });
          setIsClearAll(true);

          setUserApiData('notexecuted');
        } else {
          setExtraFilterIds({ ...extraFilterIds, deviceTypeIds: [] });

          setUserApiData('notexecuted');
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


            setIsActiveTab('all');
            setIsClearAll(false);
            setUserApiData('notexecuted');
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
      tabs={[{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled' },
      { label: 'In Workshop', value: 'in workshop' },
      { label: 'Out of Service', value: 'out of service' },
      ]}
    />
  );
}
