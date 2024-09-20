/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  deleteIcon,
  editIcon,
  exportIcon,
  openEyeBlack,
  critcalIssue,
  highIssue,
  lowIssue,
  notFoundIssue,
  mediumIssue,
  spearker,
  spearkerWorking,
} from '@/assets/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useTextToSpeech from '@/pages/issues/TextToSpeechHook';
import { Tooltip } from '@mui/material';
import { GridCloseIcon } from '@/components/icons';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import DataTableComponent from '@/components/DataGrid/TableWithHead';
import Tabs from '@/components/common/Tabs/Tabs';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { deleteApi, getApi, postApi } from '@/services/method';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { formatDateToDDMMYYYY, formatDate } from '@/utils/dateHelper';
import { Badge } from '@/components/ui/badge';
import useStore from '@/store/userStore';
import { Button } from '@/components/ui/button';
import {
  DeleteIcon,
  EllipsisIcon,
  PencilIcon,
  TicketSlashIcon,
  TrashIcon,
  UserRoundCheck,
  UserRoundX,
} from 'lucide-react';
import {
  hasAddIssuePermission,
  hasEditIssuePermission,
  hasDeleteIssuePermission,
} from '@/utils/permissions';
import {
  modifyIssueResponse,
  stringToColor,
  truncateText,
} from '@/utils/Workshop.Issues.utils/issues.helper';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import { createCSVContent, downloadCSV } from '@/utils/csv';
// import UpdateStatusModal from "./UpdateStatusModal";
import axios from 'axios';
import ConfrimationModal from '@/components/common/ConfrimationModal';
import KanbanBoard from './KanBan';
import { has } from 'lodash';
import apiService from '@/lib/apiService';
// import AddInspectionPopup from "./AddInspectionPopup/AddInspectionPopup";

const Issues = () => {
  const [isActiveTab, setIsActiveTab] = useState('All');
  const { permissions } = useStore();
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
  const [speakingTasks, setSpeakingTasks] = useState({}); // Manage speaking state for each task
  const [modal, setModal] = useState({
    isVisible: false,
    row: null,
    type: '',
  });
  const [isGrid, setIsGrid] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const LIST_OF_FILTERS = [
    {
      title: 'Issues',
      // name: "issue",
      submitAction: (data) => {
        let endpoint = `v2/issues/?id=${data?.value}`;
        getApi(endpoint)
          .then((response) => {
            // setRows(res?.data?.list)

            modifyIssueResponse({
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
      title: 'Category',
      name: 'issueCategory',
      submitAction: (data) => {
        let endpoint = `v2/issueCategory?id=${data?.value}`;
        getApi(endpoint)
          .then((response) => {
            // setRows(res?.data?.list)

            modifyIssueResponse({
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
      title: 'Sub Category',
      name: 'issueSubCategory',
      submitAction: (data) => {
        let endpoint = `v2/issueSubCategory?id=${data?.value}`;
        getApi(endpoint)
          .then((response) => {
            // setRows(res?.data?.list)

            modifyIssueResponse({
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
      title: 'Priority',
      name: 'priority',
      submitAction: (data) => {
        let endpoint = `v2/priority?id=${data?.value}`;
        getApi(endpoint)
          .then((response) => {
            // setRows(res?.data?.list)

            modifyIssueResponse({
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
    // {
    //   title: 'Reported By',
    //   // name: 'user',
    //   submitAction: (data) => {
    //     let endpoint = `/v1/adminusers/getAllUserNameAndId?id=${data?.value}`;
    //     getApi(endpoint)
    //       .then((response) => {
    //         // setRows(res?.data?.list)

    //         modifyIssueResponse({
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
      title: isClearAll === true ? 'Clear All' : '',
      className: 'clear-all-button',
      type: 'button',
      submitAction:
        isClearAll === true
          ? (data) => {
            let url = `${APIS.GET_ISSUES}`;
            getApi(url, null, data)
              .then((response) => {
                modifyIssueResponse({
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

  const breadcrumb = {
    backNavi: () => navigate(ROUTES.MASTERS),
    boldItem: 'Issues',
  };
  const onAddIssue = () => {
    navigate(ROUTES.INSERT_WORKORDERS);
    // setOpen(true);
  };
  const onStatus = () => {
    setIsGrid(!isGrid);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Open', value: 'Open' },
    { label: 'Overdue', value: 'Overdue' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' },
  ];

  const navigateToPreview = (rowData) => {
    navigate(`${ROUTES.ISSUES}/preview/${rowData?._id}`, {
      state: { rowData, comparator: 'gridNillComparator' },
    });
  };
  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.ISSUES}/edit/${rowData?._id}`, {
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

  const onRowDataDeleteHandler = async (id) => {
    try {
      deleteApi(`${import.meta.env.VITE_APP_BASE_URL}/issue/${id}`, '').then(
        (response) => {
          // if (response?.data?.message === 'OK') {
          toast.success('Issue deleted successfully');
          setTimeout(() => {
            window.location.reload();
          }, 200);
        }
      );
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error(error?.message);
    }
  };

  const handleExportCSV = () => {
    try {
      let backendURL = `${APIS.GET_ISSUES}`;
      getApi(backendURL, null, null)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'issues.csv');
          toast.success('Issues exported successfully');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectedExportCSV = () => {
    try {
      const selectedIds = selectedRows.map((row) => row._id);
      if (selectedIds.length === 0) {
        return toast.error('Please select at least one issue');
      }

      const data = {
        ids: selectedIds,
      };

      let backendURL = `${APIS.EXPORT_VEHICLES}`;
      postApi(backendURL, data)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'issues.csv');
          toast.success('Issues exported successfully');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const actionButtons = [
    {
      label: '+ Add Issue',
      onClick: onAddIssue,
      show: hasAddIssuePermission(permissions),
      className: 'button',
    },
    // {
    //   label: 'Grid',
    //   icon: GridCloseIcon({ width: 32, height: 32 }),
    //   onClick: onStatus,
    //   show: true,
    //   className: 'button',
    // },
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

  const renderStatus = (params) => {
    let statusColor;
    let statusText;
    let textColor;

    switch (params) {
      case 'Open':
        statusColor = 'issueOpen';
        statusText = 'OPEN';
        textColor = 'white';
        break;
      case 'Overdue':
        statusColor = 'closedOpen';
        statusText = 'OVERDUE';
        textColor = 'white';
        break;
      case 'Resolved':
        statusColor = 'resolvedOpen';
        statusText = 'RESOLVED';
        textColor = 'white';
        break;
      case 'Closed':
        statusColor = 'overdueOpen';
        statusText = 'CLOSE';
        textColor = 'white';
        break;
      default:
        statusColor = 'transparent';
        statusText = 'Unknown';
        textColor = 'white';
    }
    return <Badge variant={statusColor}>{statusText}</Badge>;
  };

  const renderPriority = (params) => {
    let statusText;

    switch (params) {
      case 'Critical':
        statusText = critcalIssue({});
        break;
      case 'High':
        statusText = highIssue({});
        break;
      case 'Medium':
        statusText = mediumIssue({});
        break;
      case 'Low':
        statusText = lowIssue({});
        break;
      case 'No Priority':
        statusText = notFoundIssue({});
        break;
      default:
        statusText = <></>;
    }
    return <>{statusText}</>;
    // <div>
    //     <span style={{ backgroundColor: statusColor, padding: '6.4px 16px', borderRadius: '8px', color: textColor }}>
    //     </span>
    // </div>
  };
  const { speak, isSpeaking } = useTextToSpeech();
  const [speakText, setSpeakText] = useState('');
  const [userApiData, setUserApiData] = useState('executed');
  const handleSpeak = async (id, text) => {
    setSpeakingTasks((prev) => ({ ...prev, [id]: true }));
    speak(text);
    setSpeakingTasks((prev) => ({ ...prev, [id]: false }));
  };

  const headers = [
    {
      field: 'code',
      headerName: 'Code',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div>#ISU00{params.row.code ?? '-'}</div>
          </div>
        </Link>
      ),
    },
    {
      field: 'asset',
      headerName: 'Asset',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div>{params.row.asset}</div>
          </div>
        </Link>
      ),
    },

    {
      field: 'assetType',
      headerName: 'Asset Type',
      headerClassName: 'super-app-theme--header',
      //   type: 'number',
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.assetType ?? '-'}
        </Link>
      ),
    },
    {
      field: 'issueCategoryId',
      headerName: 'Category',
      headerClassName: 'super-app-theme--header',
      //   type: 'number',
      width: 110,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.issueCategoryId ?? '-'}
        </Link>
      ),
    },
    {
      field: 'issueSubCategoryId',
      headerName: 'Sub Category',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row.issueSubCategoryId ?? '-'}
        </Link>
      ),
    },
    // Inside the headers array
    {
      field: 'description',
      headerName: 'Description',
      headerClassName: 'super-app-theme--header',
      className: 'flex items-center justify-between',
      width: 180,
      renderCell: (params) => {
        // const handleSpeak = (text) => {
        //   speak(text);  // Speak only the text from the clicked row
        // };
        return (
          <Tooltip title={params?.row?.description}>
            <div className="flex items-center justify-between">
              <div>
                {truncateText(params?.row?.description, 30)}
              </div>
              <div className="m-2 cursor-pointer">
                {params?.row?.description && (
                  <div
                    onClick={() =>
                      handleSpeak(params?.row?.id, params?.row?.description)
                    }
                    disabled={speakingTasks[params?.row?.id]}
                  >
                    {speakingTasks[params?.row?.id]
                      ? spearkerWorking({})
                      : spearker({})}
                  </div>
                )}
              </div>
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: 'issueStatus',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {renderStatus(params?.row?.issueStatus)}
        </Link>
      ),
    },
    {
      field: 'reportedDate',
      headerName: 'Reported Date',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {formatDate(params.row.reportedDate) ?? '-'}
        </Link>
      ),
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <Tooltip title={params.row.assignedTo}>
            <Avatar
              sx={{ bgcolor: stringToColor(params.row.assignedTo ?? '-') }}
              alt={params.row.assignedTo}
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          {/* {params.row.assignedTo ?? "-"} */}
        </Link>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {formatDate(params.row.dueDate) ?? '-'}
        </Link>
      ),
    },
    {
      field: 'watcher',
      headerName: 'Watcher',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => {
        const watchers = params.row?.watcher || [];
        const maxWatchers = 3; // Maximum number of avatars to show
        const overflowCount =
          watchers.length > maxWatchers ? watchers.length - maxWatchers : 0;
        return (
          <Link
            to={`/issues/preview/${params.row._id}`}
            state={{ id: params.row._id }}
          >
            <Tooltip title={watchers.map((w) => w?.name?.english).join(', ')}>
              <AvatarGroup max={maxWatchers} sx={{ overflow: 'visible' }}>
                {watchers.slice(0, maxWatchers).map((watcher, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      bgcolor: stringToColor(watcher?.name?.english ?? '-'),
                    }}
                    alt={watcher?.name?.english}
                    src="/static/images/avatar/1.jpg" // Update this based on your data if needed
                  />
                ))}
                {overflowCount > 0 && (
                  <Avatar
                    sx={{
                      bgcolor: '#e0e0e0',
                      color: '#000',
                      width: 24,
                      height: 24,
                      fontSize: '14px',
                    }}
                    alt={`+${overflowCount} more`}
                  >
                    +{overflowCount}
                  </Avatar>
                )}
              </AvatarGroup>
            </Tooltip>
          </Link>
        );
      },
    },
    {
      field: 'reportedBy',
      headerName: 'Reported By',
      headerClassName: 'super-app-theme--header',
      width: 150,
      // renderCell: (params) => (
      //   <Link
      //     to={`/issues/preview/${params.row._id}`}
      //     state={{ id: params.row._id }}
      //   >
      //     <Tooltip title={params.row.reportedBy}>
      //       <AvatarGroup max={1}>
      //         <Avatar
      //           sx={{ bgcolor: stringToColor(params.row.reportedBy ?? '-') }}
      //           alt={params.row.reportedBy}
      //           src="/static/images/avatar/1.jpg"
      //         />
      //       </AvatarGroup>
      //     </Tooltip>
      //   </Link>
      // ),
    },
    {
      field: 'priorityId',
      headerName: 'Priority',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          <div className="flex gap-4">
            {renderPriority(params.row.priorityId)}
            {params.row.priorityId ?? '-'}
          </div>
        </Link>
      ),
    },
    {
      field: 'source',
      headerName: 'Source',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/issues/preview/${params.row._id}`}
          state={{ id: params.row._id }}
        >
          {params.row?.source ?? '-'}
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

  const onGetIssueApi = (isImport) => {
    !isImport && setLoading(true);
    const payload = {
      page,
      pageSize,
      search,
    };
    if (isActiveTab === 'Clear All') {
      let url = `${APIS.GET_ISSUES}`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    }
    if (isActiveTab === 'All') {
      let url = `${APIS.GET_ISSUES}?pageSize=${pageSize}&page=${page}&search=${search}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else if (isActiveTab === 'Closed') {
      let url = `${APIS.GET_ISSUES}?pageSize=${pageSize}&page=${page}&search=${'Closed'}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else if (isActiveTab === 'Open') {
      let url = `${APIS.GET_ISSUES}?pageSize=${pageSize}&page=${page}&search=${'Open'}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else if (isActiveTab === 'Resolved') {
      let url = `${APIS.GET_ISSUES}?pageSize=${pageSize}&page=${page}&search=${'Resolved'}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else if (isActiveTab === 'Overdue') {
      let url = `${APIS.GET_ISSUES}?pageSize=${pageSize}&page=${page}&search=${'Overdue'}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else {
      let url = `${APIS.GET_ALL_VEHICLES}?pageSize=${pageSize}&page=${page}&status=${isActiveTab.toLocaleLowerCase()}&search=${search}&`;
      getApi(url, null, payload)
        .then((response) => {
          modifyIssueResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    }
  };
  const handleDelete = (row) => {
    setModal({ isVisible: true, row, type: 'delete' });
  };
  useMemo(() => {
    onGetIssueApi();
  }, [page, pageSize, refresh, isActiveTab, search]);

  useMemo(() => {
    if (isActiveTab !== 'All') {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [isActiveTab]);
  const getTasksForKanban = (rows) => {
    let initialTasks = {};

    if (isActiveTab === 'All') {
      initialTasks.Open = [];
      initialTasks.Overdue = [];
      initialTasks.Resolved = [];
      initialTasks.Closed = [];
    } else if (isActiveTab === 'Open') {
      initialTasks.Open = [];
    } else if (isActiveTab === 'Closed') {
      initialTasks.Closed = [];
    } else if (isActiveTab === 'Resolved') {
      initialTasks.Resolved = [];
    } else if (isActiveTab === 'Overdue') {
      initialTasks.Overdue = [];
    }

    rows.forEach((row) => {
      if (row.issueStatus && initialTasks[row.issueStatus]) {
        initialTasks[row.issueStatus].push(row);
      }
    });

    return initialTasks;
  };
  const HEAD_BUTTONS = [
    {
      label: 'Add Issue',
      children: <Button onClick={onAddIssue}>+ Add Issue</Button>,
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
  const fetchIssues = async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
    tab,
  }) => {
    setIsActiveTab(tab);
    const searchQuery =
      tab && tab !== 'All' ? `${search} ${tab}`.trim() : search;
    const response = await apiService.get(`${APIS.GET_ISSUES}`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search: searchQuery,
        sortBy,
        order,
      },
    });

    const rowdata = response?.data?.list?.map((item, index) => ({
      id: index + 1 + page * pageSize,
      _id: item?._id,
      allData: item,
      code: item?.code,
      asset: item?.asset?.name?.english
        ? item?.asset?.name?.english
        : item?.asset?.identification?.registrationNumber,
      assetType: item?.assetType,
      issueCategoryId: item?.issueCategoryId?.name?.english,
      issueSubCategoryId: item?.issueSubCategoryId?.name?.english,
      priorityId: item?.priorityId?.name?.english,
      reportedDate: item?.reportedDate,
      description: item?.description,
      assignedTo: item?.assignedTo?.name?.english,
      dueDate: item?.dueDate,
      watcher: item?.watcher,
      issueStatus: item?.issueStatus,
      reportedBy: item?.reportedBy?.name?.english,
      source: item?.source,
    }));

    return {
      data: rowdata,
      totalCount: response.data.totalCount || 0,
    };
  };

  return (
    <>
      <PaginatedTableView
        queryKey={`issues`}
        queryFn={fetchIssues}
        columns={headers}
        pageName="Issues"
        headButtons={HEAD_BUTTONS}
        LIST_OF_FILTERS={LIST_OF_FILTERS}
        tabs={tabs}
        isGrid={true}
        isGridOpened={isGrid}
        girdData={getTasksForKanban(rows)}
      />
      <ConfrimationModal
        refresh={refresh}
        setRefresh={setRefresh}
        setModal={setModal}
        modal={modal}
        endpoint={`${import.meta.env.VITE_APP_BASE_URL}/issue`}
      />
    </>
  );
};
export default Issues;
