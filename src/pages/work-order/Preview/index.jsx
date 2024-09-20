// eslint-disable-next-line no-unused-vars\
import { Ellipsis, EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { X, ChevronDown } from 'lucide-react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { ROUTES } from '@/constants/route.constant';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import RenderActionButtons from '@/components/DataGrid/TableWithHead/RenderActionButtons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { conductorIcon, driverIcon, editIcon1 } from '../../../assets/Icons';

import Preview from './previewIssues';

import './issuesPreview.css';
import { ResizedTabs } from '@/components/common/Tabs/Tabs';
import { cn } from '@/lib/utils';
import StatusCombobox from './StatusCombobox';
import LogHistoryTable from './LogHistory';
import useAppStore from '@/store';
//import { } from "react-select/dist/declarations/src/components/indicators";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteApi, patchApi } from '@/services/method';
import { toast } from 'sonner';
import { APIS } from '@/constants/api.constant';
const moreActionData = [
  {
    title: 'Add Multiple Issues',

    onClick: '',
  },
  {
    title: 'Import Issues',
    type: 'vehicle',

    onClick: () => {
      const fileInput = document.getElementById('bulk-upload');
      fileInput.click();
    },
  },
  {
    title: 'Export CSV',

    onClick: () => handleExportCSV(),
  },
];

const PreviewIssues = () => {
  const [isActiveTabs, setIsActiveTab] = useState('Preview');
  const { user } = useAppStore();
  const [headerData, setHeasderData] = useState({
    _id: '',
    asset: '',
    watcher: '',
    reportedBy: '',
    assignedTo: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState('active');
  const [responseData, setResponseData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const onRowDataDeleteHandler = async (id) => {
    try {
      deleteApi(`${import.meta.env.VITE_APP_BASE_URL}/issue/${id}`, '').then(
        (response) => {
          // if (response?.data?.message === 'OK') {
          toast.success('Data Deleted Successfully');
          navigate(-1);
        }
      );
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error(error?.message);
    }
  };

  const dropdownRef = useRef(null);
  const updateTaskStatus = async (issue, newStatus) => {
    try {
      let payload = {
        issueUpdatedBy: user._id,
        issueStatus: newStatus,
        source: 'updateIssueStatus',
      };
      payload._id = issue;
      await patchApi(APIS.ISSUES, issue, payload);
      toast.success('Issue closed successfully');

      // Re-fetch the updated data to reflect the changes
      await onUserDetailsGetById();
    } catch (error) {
      console.error('Error updating issue status:', error);
      toast.error(error?.message);
    }
  };
  const hasActiveTabHandler = (active) => {
    setIsActiveTab(active);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener when component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle dropdown item click
  const handleItemClick = (item) => {
    setIsDropdownOpen(false);
  };
  const boldItem = 'Issues';
  ////// const tabs = [{ tabName: "Preview" }];
  const headerDetails = {
    // title: `${headerData?._id} ${!headerData?._id === "" ? "|" : ""}${headerData?.asset
    //   }${!headerData?.asset === "" ? "|" : ""} /
    // ${headerData?.watcher} ${!headerData?.watcher === "" ? "|" : ""}/
    // ${headerData?.reportedBy} ${!headerData?.reportedBy === "" ? "|" : ""} `,
    title: headerData?.asset,
  };
  const onUserDetailsGetById = async () => {
    // eslint-disable-next-line no-undef
    const getByIdUrl = `${import.meta.env.VITE_APP_BASE_URL}/issue/${id}`;
    let response;
    try {
      response = await axios.get(getByIdUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response?.status === 200) {
        setResponseData(response);
        setHeasderData((prev) => ({
          ...prev,
          asset:
            (response?.data?.data?.asset?.name?.english
              ? response?.data?.data?.asset?.name?.english
              : response?.data?.data?.asset?.identification
                  ?.registrationNumber) ?? '---',
          watcher:
            response?.data?.data?.watcher.length > 0
              ? response?.data?.data?.watcher?.name?.english
              : '---',
          reportedBy: response?.data?.data?.reportedBy?.name?.english
            ? response?.data?.data?.reportedBy?.name?.english
            : '---',
          assignedTo: response?.data?.data?.assignedTo?.name?.english
            ? response?.data?.data?.assignedTo?.name?.english
            : '---',
          // vehicleType: rowData?.vehicleType ? rowData?.vehicleType : "",
        }));
        setStatus(
          response?.data?.data?.vehicle?.status
            ? response?.data?.data?.vehicle?.status
            : 'active'
        );
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    onUserDetailsGetById();
  }, []);

  function formatTitleText(text) {
    const firstPart = text.slice(0, 4); // First 4 characters
    const middlePart = text.slice(4, text.length - 4); // Middle part
    const lastPart = text.slice(text.length - 4); // Last 4 characters

    return `${firstPart} ${middlePart} ${lastPart}`;
  }

  return (
    <div className="preview-v-main-container">
      <div className="preview-v-form-container">
        <div className="preview-v-form-top-section ">
          <div className=" flex justify-between">
            <div className="">
              <BreadCrumbs
                backNavi={() => navigate('/issues')}
                breadCrumbs={[]}
                boldItem={boldItem}
              />
              <div className="preview-top-v-details">
                <div>
                  <div className="heading-600-24 text-gray-primary v-center pt-7x">
                    {formatTitleText(headerDetails.title)}
                  </div>
                  <div className="heading-400-12 text-gray-quaternary">
                    {headerDetails.para1}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap"></div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <Button
                onClick={() =>
                  navigate(`${ROUTES.ISSUES}/edit/${id}`, {
                    state: {
                      editData: location.state?.rowData,
                      status: 'edit',
                    },
                  })
                }
              >
                <span> Edit</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon" className="group">
                    <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={openModal}>
                    <Eye className="size-3 mr-2" />
                    <span>View Status History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      updateTaskStatus(
                        responseData?.data?.data?._id,
                        responseData?.data?.data?.issueStatus === 'Closed'
                          ? 'Open'
                          : 'Closed'
                      )
                    }
                  >
                    <PencilIcon className="size-4 mr-2" />
                    <span>
                      {responseData?.data?.data?.issueStatus === 'Closed'
                        ? 'Open Issue'
                        : 'Close Issue'}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      onRowDataDeleteHandler(responseData?.data?.data?._id)
                    }
                  >
                    <TrashIcon className="size-4 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Conditionally render the modal */}
              {modalIsOpen && (
                <LogHistoryTable
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  response={responseData?.data?.data?.issueStatusLogs}
                />
              )}
            </div>
          </div>
          <div className="top-bottom-section"></div>
        </div>
        {isActiveTabs === 'Preview' && (
          <Preview response={responseData} id={id} />
        )}
      </div>
    </div>
  );
};

export default PreviewIssues;
