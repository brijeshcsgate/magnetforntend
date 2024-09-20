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
import { useEffect, useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Inspection.css';
import { createCSVContent, downloadCSV } from '@/utils/csv';
import UpdateStatusModal from './UpdateStatusModal';
import axios from 'axios';
import ConfrimationModal from '@/components/common/ConfrimationModal';
import AddInspectionPopup from './AddInspectionPopup/AddInspectionPopup';
import { modifyInspectionResponse } from '@/utils/inspection.utils/inspectionList.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const token = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : sessionStorage.getItem('userToken');

import { formatDateToDDMMYYYY, formatDate } from '@/utils/dateHelper';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon } from 'lucide-react';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import { Trash } from 'lucide-react';
import { TrashIcon } from 'lucide-react';
import apiService from '@/lib/apiService';
import { EyeIcon } from 'lucide-react';
import { PencilIcon } from 'lucide-react';

const Vehicles = () => {
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
  const [userApiData, setUserApiData] = useState('executed');

  const [modal, setModal] = useState({
    isVisible: false,
    row: null,
    type: '',
  });
  const [refresh, setRefresh] = useState(false);
  const LIST_OF_FILTERS = [
    {
      title: 'Inspection Sumitted',
      submitAction: (data) => {
        let endpoint = `v2/startInspection`;
        getApi(endpoint)
          .then((response) => {
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
      title: 'Inspection Form',
      submitAction: (data) => {
        let endpoint = `v2/startInspection`;
        getApi(endpoint)
          .then((response) => {
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
        let endpoint = `v2/startInspection`;
        getApi(endpoint)
          .then((response) => {
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

      submitAction: (data) => {
        let endpoint = `v2/startInspection`;
        getApi(endpoint)
          .then((response) => {
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
      title: 'Vehicle Group',
      submitAction: (data) => {
        let endpoint = `v2/startInspection`;
        getApi(endpoint)
          .then((response) => {
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
      title: 'More',
      submitAction: (data) => {
        let endpoint = `v2/inspection`;
        getApi(endpoint)
          .then((response) => {
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
      title: isClearAll === true ? 'Clear All' : '',
      className: 'clear-all-button',
      type: 'button',
      submitAction:
        isClearAll === true
          ? (data) => {
              let url = `${APIS.START_INSPECTION}`;
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
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Inspection History');
  }, []);

  const [open, setOpen] = useState(false);
  const onAddInspection = () => {
    console.log('clicked on Inspection History');
    setOpen(true);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const onRowDataDeleteHandler = async (rowData) => {
    setUserApiData('notexecuted');
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/startInspection/${rowData.id}`,
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

  const navigateToPreview = (rowData) => {
    console.log('id: ' + rowData.id);
    navigate(`${ROUTES.INSPECTIONS}/preview/${rowData?.id}?add=false`, {
      state: { rowData, comparator: 'gridNillComparator' },
    });
  };
  const navigateToEdit = (rowData) => {
    navigate(`/inspections/start_inspection/${rowData?.id}?add=false`, {
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
        <Button onClick={onAddInspection}>+ Start Inspection</Button>

        // <Button onClick={() => onAddInspection()}>+ Start Inspection</Button>
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
      label: '+ Start Inspection',
      onClick: onAddInspection,
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
    // {
    //   title: 'Add Multiple Vehicles',
    //   icon: plusIcon({ width: 13, height: 13 }),
    //   onClick: '',
    // },
    // {
    //   title: 'Import Vehicles',
    //   type: 'vehicle',
    //   icon: importIcon({ width: 13, height: 13 }),
    //   onClick: () => {
    //     const fileInput = document.getElementById('bulk-upload');
    //     fileInput.click();
    //   },
    // },
    // {
    //   title: 'Import Meter Entries',
    //   icon: importIcon({ width: 13, height: 13 }),
    //   onClick: '',
    // },
    // {
    //   title: 'Add GPS / Telematics integration',
    //   icon: targetIcon({ width: 15, height: 14 }),
    //   onClick: '',
    // },
    // {
    //   title: 'Export CSV',
    //   icon: exportIcon({ width: 12, height: 11 }),
    //   onClick: () => handleExportCSV(),
    // },
  ];
  const headers = [
    {
      field: 'vehicle',
      headerName: 'Vehicle',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link to={`/inspections/preview/${params.row.id}?add=false`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div>{params.row.vehicle}</div>
          </div>
        </Link>
      ),
    },
    {
      field: 'group',
      headerName: 'Group',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/inspections/preview/${params.row.id}?add=false`}
          state={{ id: params.row.id }}
        >
          {params.row.depot}
        </Link>
      ),
    },
    {
      field: 'date',
      headerName: 'Inspection Date',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/inspections/preview/${params.row.id}?add=false`}
          state={{ id: params.row.id }}
        >
          {formatDate(params.row.createdAt) ?? '-'}
        </Link>
      ),
    },
    {
      field: 'seating',
      headerName: 'Submitted By',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link to={`/inspections/preview/${params.row.id}?add=false`}>
          {params.row.seating || '-'}
        </Link>
      ),
    },
    {
      field: 'inspection',
      headerName: 'Inspection Form',
      headerClassName: 'super-app-theme--header',
      width: 200,
    },
    {
      field: 'threedot',
      headerName: 'Failed Items',
      headerClassName: 'super-app-theme--header hide-img-bordersvg',
      width: 300,
      editable: false,
      renderCell: (params) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="group">
              <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigateToPreview(params.row)}>
              <EyeIcon className="size-4 mr-2" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateToEdit(params.row)}>
              <PencilIcon className="size-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => onRowDataDeleteHandler(params.row)}
              >
                <TrashIcon className="size-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
    const response = await apiService.get(`${APIS.START_INSPECTION}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
        // isInbound: tab === 'inbound' ? true : null,
      },
    });
    console.log('history data: ', response);
    return {
      data: response.data.list.map((row) => ({
        id: row._id, // Ensure the row has `_id` as `id`
        vehicle: row.vehicle.identification.registrationNumber || '-', // Assuming `vehicleNumber` is the field in your API
        depot: row.group || '-', // Assuming `group` comes from API as `depot`
        createdAt: row.inspectionDate || row.createdAt || '-', // Map date accordingly
        seating: row?.userId?.name.english || '-', // Assuming seating capacity comes from the API
        inspection: row.inspection.title || '-', // Inspection form data from API
        // Add any additional necessary fields
      })),
      totalCount: response.data.totalCount,
    };
  };
  // const handleDelete = (row) => {
  //   console.log("delete: ",row.id);

  //   setModal({ isVisible: true, row.id, type: 'delete' });
  // };
  const handleDelete = (row) => {
    console.log('delete: ', row.id);

    // Ensure the modal state includes `row.id` correctly
    setModal({ isVisible: true, id: row.id, type: 'delete' });
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
        pageName="Inspection History"
        LIST_OF_FILTERS={LIST_OF_FILTERS}
        headButtons={HEAD_BUTTONS}
        // tabs={[
        //   { label: 'All', value: 'All' },
        //   { label: 'Time Table', value: 'TimeTable' },
        //   { label: 'Non TimeTable', value: 'Non TimeTable' },
        // ]}
      />
      <ConfrimationModal
        refresh={refresh}
        setRefresh={setRefresh}
        setModal={setModal}
        modal={modal}
        // endpoint={`${import.meta.env.VITE_APP_BASE_URL}/startInspection/${id}`}
        endpoint={`${import.meta.env.VITE_APP_BASE_URL}/startInspection/${rows.id}`}
      />
      <AddInspectionPopup open={open} setOpen={setOpen} />
    </>
  );
};
export default Vehicles;
