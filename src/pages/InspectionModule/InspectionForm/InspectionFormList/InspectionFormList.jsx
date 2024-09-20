import {
  attachIcon,
  deleteIcon,
  editIcon,
  exportIcon,
  imageIndicator,
  importIcon,
  messageIconRepresentor,
  openEyeBlack,
  plusIcon,
  targetIcon,
} from '@/assets/Icons';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import DataTableComponent from '@/components/DataGrid/TableWithHead';
import Tabs from '@/components/common/Tabs/Tabs';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, postApi } from '@/services/method';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../Inspection.css';
import { createCSVContent, downloadCSV } from '@/utils/csv';
//   import UpdateStatusModal from "./UpdateStatusModal";
import axios from 'axios';
import ConfrimationModal from '@/components/common/ConfrimationModal';
//   import AddInspectionPopup from "./AddInspectionPopup/AddInspectionPopup";
import { modifyInspectionResponse } from '@/utils/inspection.utils/inspection.helper';
import UpdateStatusModal from '../../UpdateStatusModal';
import AddInspectionPopup from '../../AddInspectionPopup/AddInspectionPopup';
import DataCharectersTooltip from '@/components/ui/DataCharectersTooltip';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
// import { Button } from '@mui/material';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
// import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
// import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { EllipsisIcon } from 'lucide-react';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import apiService from '@/lib/apiService';
import { PencilIcon } from 'lucide-react';
import { TrashIcon } from 'lucide-react';

const InspectionFormList = () => {
  const [userApiData, setUserApiData] = useState('executed');

  const [isActiveTab, setIsActiveTab] = useState('All');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [status, setStatus] = useState('');
  const [isClearAll, setIsClearAll] = useState(false);
  const [modal, setModal] = useState({
    isVisible: false,
    row: null,
    type: '',
  });
  const [refresh, setRefresh] = useState(false);
  const LIST_OF_FILTERS = [
    // {
    //   title: 'Inspection Sumitted',
    //   submitAction: (data) => {
    //     let endpoint = `v2/inspection}`;
    //     getApi(endpoint)
    //       .then((response) => {
    //         setRows(res?.data?.list);

    //         console.log("Issue Submitted: ",res?.data);

    //         modifyInspectionResponse({
    //           setRows,
    //           setTotalCount,
    //           response,
    //           page,
    //           pageSize,
    //         });
    //         setIsClearAll(true);
    //       })
    //       .catch();
    //   },
    // },
    {
      title: 'Inspection Form',
      submitAction: (data) => {
        let endpoint = `v2/inspection`;
        getApi(endpoint)
          .then((response) => {
            console.log('Inspection data: ', response);
            setRows(res?.data?.list);

            modifyInspectionResponse({
              setRows,
              setTotalCount,
              response,
              page,
              pageSize,
            });
            setIsClearAll(true);
          })
          .catch();
      },
    },
    {
      title: 'Vehicle',
      submitAction: (data) => {
        let endpoint = `v2/vehicle/all-vehicle-numbers`;
        console.log("endpoint: ",endpoint);
        // getApi(endpoint)
        //   .then((response) => {
        //     console.log('Vehicle data: ', response);
        //     setRows(res?.data?.list);

        //     modifyInspectionResponse({
        //       setRows,
        //       setTotalCount,
        //       response,
        //       page,
        //       pageSize,
        //     });
        //     setIsClearAll(true);
        //   })
        //   .catch();
      },
      // submitAction: (data) => {
      //   let endpoint = `v2/inspection`;
      //   getApi(endpoint)
      //     .then((response) => {
      //       setRows(res?.data?.list);

      //       modifyInspectionResponse({
      //         setRows,
      //         setTotalCount,
      //         response,
      //         page,
      //         pageSize,
      //       });
      //       setIsClearAll(true);
      //     })
      //     .catch();
      // },
    },
    {
      title: 'Vehicle Group',
      // submitAction: (data) => {
      //   let endpoint = `v2/inspection`;
      //   getApi(endpoint)
      //     .then((response) => {
      //       setRows(res?.data?.list);

      //       modifyInspectionResponse({
      //         setRows,
      //         setTotalCount,
      //         response,
      //         page,
      //         pageSize,
      //       });
      //       setIsClearAll(true);
      //     })
      //     .catch();
      // },
    },
    {
      title: 'More',
      // submitAction: (data) => {
      //   let endpoint = `v2/inspection`;
      //   getApi(endpoint)
      //     .then((response) => {
      //       setRows(res?.data?.list);

      //       modifyInspectionResponse({
      //         setRows,
      //         setTotalCount,
      //         response,
      //         page,
      //         pageSize,
      //       });
      //       setIsClearAll(true);
      //     })
      //     .catch();
      // },
    },
    {
      title: isClearAll === true ? 'Clear All' : '',
      className: 'clear-all-button',
      type: 'button',
      submitAction:
        isClearAll === true
          ? (data) => {
              let url = `${APIS.GET_ALL_Inspections}`;
              getApi(url, null, data)
                .then((response) => {
                  modifyInspectionResponse({
                    setRows,
                    setTotalCount,
                    response,
                    page,
                    pageSize,
                  });
                  setIsClearAll(false);
                  setIsActiveTab('All');
                })
                .finally(() => setLoading(false));
            }
          : '',
    },
  ];

  const [open, setOpen] = useState(false);
  // const onAddInspection = () => {
  //   setOpen(true);
  //   const apidata =  onGetInspectionApi(false); // Pass false to indicate it's not an import operation
  //   console.log("api data : " + apidata);
  // };
  const onAddInspection = () => {
    setOpen(true);

    // Call the API to get inspection data
    // onGetInspectionApi(false)
    //   .then((data) => {
    //     // console.log('Fetched inspection data:', data); // Check if data is being fetched
    //     setInspectionData(data); // Store data if needed
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching inspection data:', error); // Log error if any
    //   });
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const tabs = [
    { tabName: 'All' },
    { tabName: 'Submissions with Failed Items' },
  ];

  const navigateToPreview = (rowData) => {
    navigate(`${ROUTES.INSPECTIONS}/preview/${rowData?._id}`, {
      state: { rowData, comparator: 'gridNillComparator' },
    });
  };
  const navigateToEdit = (rowData) => {
    console.log('Edit : ', rowData);
    navigate(`${ROUTES.INSPECTIONS}/edit/${rowData}`, {
      state: { isEditeActive: true },
    });
  };
  const handleDelete = (row) => {
    // console.log('Deleting item with id:', row);
    setModal({ isVisible: true, row, type: 'delete' });
  };
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Inspection Forms');
  }, []);

  const navigateToinspections = (rowData) => {
    navigate(`${ROUTES.INSPECTIONS_WORKSHOP}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPage(0);
    setPageSize(newPageSize?.target.value);
  };

  const onAddInspectionform = () => {
    navigate(ROUTES.INSERT_INSPECTIONS);
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

  const handleSelectedExportCSV = () => {
    try {
      const selectedIds = selectedRows.map((row) => row._id);
      const data = {
        ids: selectedIds,
      };

      let backendURL = `${APIS.EXPORT_VEHICLES}`;
      postApi(backendURL, data)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'vehicle.csv');
          toast.success('Data Exported Successfully');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const HEAD_BUTTONS = [
    {
      label: ' Start Inspection',
      children: (
        <Button onClick={() => onAddInspection()}>+ Start Inspection</Button>
      ),
    },
    {
      label: 'Add Inspection Form',
      children: (
        <Button onClick={() => onAddInspectionform()}>
          + Add Inspection Form
        </Button>
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

  const actionButtons = [
    {
      label: ' Start Inspection',
      onClick: onAddInspection,
      show: true,
      className: 'button',
    },
    {
      label: '+ Add Inspection Form',
      // onClick: onAddInspection,
      onClick: onAddInspectionform,
      show: true,
      className: 'button',
    },
  ];
  const actionData = {
    leftAction: [
      {
        title: 'Export',
        icon: exportIcon({ width: 12, height: 11 }),
        onClick: handleSelectedExportCSV,
      },
      {
        title: 'Update Status',
        icon: exportIcon({ width: 12, height: 11 }),
        onClick: () => setShowStatusModal(true),
      },
    ],
  };
  const moreActionData = [
    {
      title: 'Export CSV',
      icon: exportIcon({ width: 12, height: 11 }),
      onClick: () => handleExportCSV(),
    },
  ];

  const headers = [
    {
      field: 'title',
      headerName: 'Title',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link to={`/inspections/workshop`} state={{ id: params.row.id }}>
          {params.row?.title.length >= 25 ? (
            <DataCharectersTooltip text={params.row.title} maxLength="25" />
          ) : (
            params.row.title
          )}
        </Link>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link to={`/inspections/workshop`} state={{ id: params.row.id }}>
          {params.row?.description.length >= 25 ? (
            <DataCharectersTooltip
              text={params.row.description}
              maxLength="25"
            />
          ) : (
            params.row.description
          )}
        </Link>
      ),
    },
    {
      field: 'components',
      headerName: 'Inspection Items',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/inspections/workshop`}
          state={{ id: params.row.id, activeTab: 'Inspection Items' }}
        >
          {params.row.components.length < 1 ? (
            <span className="text-green-600">Add</span>
          ) : (
            <span>{params.row.components.length}</span>
          )}
        </Link>
      ),
    },
    {
      field: 'workflows',
      headerName: 'Workflows',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/inspections/workshop`}
          state={{ id: params.row.id, activeTab: 'Workflow' }}
        >
          {params.row.workflows.length < 1 ? (
            <span className="text-green-600">Add</span>
          ) : (
            <span>{params.row.workflows.length}</span>
          )}
        </Link>
      ),
    },
    {
      field: 'vehicles',
      headerName: 'Vehicles',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/inspections/workshop`}
          state={{ id: params.row.id, activeTab: 'Vehicles & Schedules' }}
        >
          {params.row.vehicles.length < 1 ? (
            <span className="text-green-600">Add</span>
          ) : (
            <span>{params.row.vehicles.length}</span>
          )}
        </Link>
      ),
    },
    {
      field: 'schedules',
      headerName: 'Schedules',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link to={`/inspections/workshop`} state={{ id: params.row.id }}>
          {params.row.schedules.length < 1 ? (
            <span className="text-green-600">Add</span>
          ) : (
            <span>{params.row.schedules.length}</span>
          )}
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
              <DropdownMenuItem onClick={() => navigateToEdit(params.row.id)}>
                <PencilIcon className="size-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(params.row.id)}>
                <TrashIcon className="size-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onGetInspectionApi = async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
    tab,
  }) => {
    const response = await apiService.get(`${APIS.GET_ALL_Inspections}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
        // isTimetable: tab === 'TimeTable' ? true : null,
      },
    });

    console.log('======response=======', response);
    return {
      data: response?.data?.list?.map((item, index) => ({
        id: item._id,
        title: item?.title || '-', // inspection title
        description: item?.description || '-', // inspection description
        components: item?.components || [], // list of components
        workflows: item?.workflows || [], // workflows associated with inspection
        vehicles: item?.vehicles || [], // vehicles associated with inspection
        schedules: item?.schedules || [], // schedules associated with inspection
        createdBy: item?.createdBy?.name || '-', // who created the inspection
        createdAt: item?.createdAt || '-', // date the inspection was created
        status: item?.status || '-', // inspection status (e.g., pending, completed)
      })),
      totalCount: response.data.totalCount,
    };
  };

  useMemo(() => {
    if (isActiveTab !== 'All') {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [isActiveTab]);
  return (
    <>
      <UpdateStatusModal
        open={showStatusModal}
        setOpen={setShowStatusModal}
        ids={selectedRows.map((row) => row._id)}
        status={status}
        setStatus={setStatus}
      />
      <PaginatedTableView
        queryKey={`routes ${userApiData}`}
        queryFn={onGetInspectionApi}
        columns={headers}
        pageName="Inspection Forms"
        LIST_OF_FILTERS={LIST_OF_FILTERS}
        headButtons={HEAD_BUTTONS}
        tabs={[
          { label: 'All', value: 'All' },
        ]}
      />
      <AddInspectionPopup open={open} setOpen={setOpen} />
    </>
  );
};
export default InspectionFormList;
