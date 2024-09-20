/* eslint-disable prettier/prettier */
import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  // Section,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import useSpeechRecognition from '@/pages/issues/SpeechHook';
import useTextToSpeech from '@/pages/issues/TextToSpeechHook';
import { Badge } from '@/components/ui/badge';
import DescriptionComponent from './DescriptionComponent';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import FileUploadModal from './IssueFileSelector';
import FormikTextArea from '@/components/inputs/formik/FormikTextArea';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/dateHelper';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { getApi, patchApi, postFileApi } from '@/services/method';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useAppStore from '@/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  CustomSelect,
  CustomSelectById,
} from '@/components/common/CustomSelect/index';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { DatePickerInput } from '@/components/common/DateTimeInputs/index';
import {
  uploadIcon,
  imageThumbnail,
  pdfThumbnail,
  spearker,
  spearkerWorking,
  microphone,
  spreadSheetThumbnail,
  deleteIcon,
  fileThumbnail,
} from '@/assets/Icons';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';
import AudioRecorder from './AudioRecorderHook';
// import FormikAsyncDistrictDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDistrictDropDown';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import apiService from '@/lib/apiService';
import { generateRandomString } from '@/lib/utils';
import { getFileInfo, stringToColor, truncateText } from '@/utils/Workshop.Issues.utils/issues.helper';
import { DataGrid } from '@mui/x-data-grid';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import ListView from '@/components/layouts/OnlyList';

const Issues = () => {
  const initialValues = {
    asset: '',
    assetType: '',
    issueCategoryId: '',
    issueSubCategoryId: '',
    priorityId: '',
    reportedDate: new Date(),
    description: '',
    assignedTo: '',
    dueDate: '',
    watcher: [],
    reportedBy: '',
  };

  const issuesSchema = Yup.object().shape({
    asset: Yup.mixed().required('Asset is required'),
    assetType: Yup.string()
      .required('Asset type is required')
      .test('is-string', 'Asset type must be a valid string', function (value) {
        return typeof value === 'string' && value.trim() !== '';
      }),
    issueCategoryId: Yup.string().required('Issue category is required'),
    issueSubCategoryId: Yup.string().required('Issue sub category is required'),
    priorityId: Yup.mixed(),
    description: Yup.string(),
    reportedDate: Yup.date().required('Reported date is required'),
    assignedTo: Yup.mixed().required('Assigned to is required'),
    dueDate: Yup.date().required('Due date is required'),
    watcher: Yup.mixed()
      .test('is-string-or-array', 'Watcher is required', function (value) {
        return (
          typeof value === 'string' ||
          (Array.isArray(value) && value?.length > 0)
        );
      })
      .required('Watcher is required'),
    reportedBy: Yup.mixed().required('Reported by is required'),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppStore();
  const [currentUserId, setCurrentUserId] = useState({
    value: user._id,
    label: user.name.english,
  });
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [newFiles, setNewFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSubmittedTable, setShowSubmittedTable] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectdAssetType, setSelectedAssetType] = useState('');
  const [options, setOptions] = useState([]);
  const [busNumbers, setBusNumbers] = useState([]);
  const [officeFacility, setOfficeFacility] = useState([]);
  const [priorityId, setPriorityId] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [files, setFiles] = useState([]);
  const [isDocumentsUploaded, setIsDocumentsUploaded] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [rows, setRows] = useState([]);

  const fetchFileInfo = async (fileUrl) => {
    try {
      const metadata = await getFileInfo(fileUrl); // Use the global function
      setFileInfo(metadata);
    } catch (error) {
      console.error('Error fetching file metadata:', error);
    }
  };

  const handleAudioRecorded = (audioBlob) => {
    setAudioBlob(audioBlob);
  };


  useEffect(() => {
    setCurrentUserId({
      value: user._id,
      label: user.name.english,
    });
    sessionStorage.removeItem('submittedData');
  }, [submittedData, user._id, user.name.english]);
  const { transcript, isListening, setIsListening, setTranscript } = useSpeechRecognition();
  const { speak, isSpeaking } = useTextToSpeech();

  const [description, setDescription] = useState(''); // Store the full description


  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      setTranscript(''); // Clear transcript when stopping recording
    }
  };

  const handleSpeak = () => {
    speak(description); // Use the full description for text-to-speech
  };
  useEffect(() => {
    const storedData =
      JSON.parse(sessionStorage.getItem('submittedData')) || [];
    setSubmittedData(storedData);
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const tabs = [
    { label: 'Open', value: 'Open' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value); // Track the active tab

  const fetchAssets = async (searchTerm, page) => {
    try {
      // Define limit for pagination (if applicable)
      const limit = 15;
      const [vehicleRes, officeFacilityRes] = await Promise.all([
        apiService.get('v2/vehicle/all-vehicle-numbers', {
          params: {
            search: searchTerm || null,
            page: page || 0,
            limit,
          },
        }),
        apiService.get('v2/masters/officeFacility', {
          params: {
            search: searchTerm || null,
            page: page || 0,
            limit,
          },
        }),
      ]);
      const vehicleData = (vehicleRes?.data?.vehicles || []).map((data) => ({
        label: data?.label,
        value: data?.value,
        type: 'Vehicles',
      }));
      const officeFacilityData = (officeFacilityRes?.data?.list || []).map(
        (data) => ({
          label: data?.name?.english,
          value: data?._id,
          type: 'Amenities',
        })
      );
      const combinedData = [...vehicleData, ...officeFacilityData];
      setBusNumbers(vehicleData);
      setOfficeFacility(officeFacilityData);
      setAssets(combinedData);
      setOptions(combinedData);
      return {
        results: combinedData,
        nextPage: true,
      };
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (index, fileType) => {
    if (fileType === 'existing') {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else {
      setNewFiles((prevNewFiles) =>
        prevNewFiles.filter((_, i) => i !== index)
      );
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((_, i) => i !== index)
      );
    }
    toast.success('File deleted successfully')
  };
  // const handleDelete = (index) => {
  //   const updatedData = (id ? files : submittedData).filter(
  //     (_, i) => i !== index
  //   );
  //   setSubmittedData(updatedData);
  //   sessionStorage.setItem('submittedData', JSON.stringify(updatedData));
  //   toast.success('File deleted successfully');
  // };
  const renderFileTable = () => (
    <Table className="relative mt-4 border border-teal-250">
      <TableHeader>
        <TableRow className="text-[#424750]">
          <TableHead className="min-w-[150px]">Document Name</TableHead>
          <TableHead className="min-w-[150px]">Document Type</TableHead>
          <TableHead className="min-w-[130px]">Doc Size</TableHead>
          <TableHead className="min-w-[130px]">Date Added</TableHead>
          <TableHead className="min-w-[130px]">Thumbnail</TableHead>
          <TableHead className="min-w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => (
          <TableRow
            key={`existing-${index}`}
            className="shadow-[4px_4px_20px_0px_#0000001A] hover:bg-[#F4FCFF]"
          >
            <TableCell className="text-[12px]">{file.name}</TableCell>
            <TableCell className="text-[12px]">{file.type}</TableCell>
            <TableCell className="text-[12px]">{(file.size / 1024).toFixed(2)} KB</TableCell>
            <TableCell className="text-[12px]">{formatDate(file.date)}</TableCell>
            <TableCell className="text-[12px]">
              <div className="ml-8">
                {file ? (
                  <a
                    href={file.preview}
                    download={file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name.includes('jpg') || file.name.includes('png') || file.name.includes('jpeg') ? (
                      imageThumbnail({
                        width: '15px',
                        height: '19px',
                      })
                    ) : file.name.includes('pdf') ? (
                      pdfThumbnail({
                        width: '15px',
                        height: '19px',
                      })
                    ) : file.name.includes('xls') ||
                      file.name.includes('spreadsheet') ||
                      file.name.includes('excel') ? (
                      spreadSheetThumbnail({
                        width: '26px',
                        height: '34px',
                      })
                    ) : file.name.includes('doc') || file.name.includes('docx') ? (
                      fileThumbnail({
                        width: '20px',
                        height: '25px',
                        type: 'document', // You can pass specific props if needed
                      })
                    ) : (
                      <div>No preview available</div>
                    )}
                  </a>
                ) : (
                  <div>No file available</div>
                )}
              </div>
            </TableCell>
            <TableCell className="text-[12px]">
              <button
                onClick={() => handleDelete(index, 'existing')}
                className="text-red-500 hover:text-red-700"
              >
                <div className="ml-5">
                  {deleteIcon({ width: '13px', height: '17px' })}
                </div>
              </button>
            </TableCell>
          </TableRow>
        ))}
        {newFiles.map((file, index) => (
          <TableRow
            key={`new-${index}`}
            className="shadow-[4px_4px_20px_0px_#0000001A] hover:bg-[#F4FCFF]"
          >
            <TableCell className="text-[12px]">{file.name}</TableCell>
            <TableCell className="text-[12px]">{file.type}</TableCell>
            <TableCell className="text-[12px]">
              {(file.size / 1024).toFixed(2)} KB
            </TableCell>
            <TableCell className="text-[12px]">{formatDate(file.lastModified)}</TableCell>
            <TableCell className="text-[12px]">

              <div className="ml-8">
                {file ? (
                  <a
                    href={file.preview}
                    download={file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name.includes('jpg') || file.name.includes('png') || file.name.includes('jpeg') ? (
                      imageThumbnail({
                        width: '15px',
                        height: '19px',
                      })
                    ) : file.name.includes('pdf') ? (
                      pdfThumbnail({
                        width: '15px',
                        height: '19px',
                      })
                    ) : file.name.includes('xls') ||
                      file.name.includes('spreadsheet') ||
                      file.name.includes('excel') ? (
                      spreadSheetThumbnail({
                        width: '26px',
                        height: '34px',
                      })
                    ) : file.name.includes('doc') || file.name.includes('docx') ? (
                      fileThumbnail({
                        width: '20px',
                        height: '25px',
                        type: 'document', // You can pass specific props if needed
                      })
                    ) : (
                      <div>No preview available</div>
                    )}
                  </a>
                ) : (
                  <div>No file available</div>
                )}
              </div>
            </TableCell>
            <TableCell className="text-[12px]">
              <button
                onClick={() => handleDelete(index, 'new')}
                className="text-red-500 hover:text-red-700"
              >
                <div className="ml-5">
                  {deleteIcon({ width: '13px', height: '17px' })}
                </div>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  useEffect(() => {
    fetchAssets();
    if (id) {
      setLoading(true);
      getApi(APIS.ISSUES, id)
        .then(async (res) => {
          const editData = res?.data;
          setData((prev) => ({
            ...prev,
            asset: [
              {
                label:
                  editData?.assetType === 'Vehicles'
                    ? editData?.asset?.identification?.registrationNumber
                    : editData?.asset?.name?.english,
                value: editData?.asset?._id,
              },
            ],
            assetType: editData?.assetType,
            issueCategoryId: editData?.issueCategoryId?._id,
            issueSubCategoryId: editData?.issueSubCategoryId?._id,
            priorityId: [
              {
                label: editData?.priorityId?.name?.english,
                value: editData?.priorityId?._id,
              },
            ],
            reportedDate: editData?.reportedDate,
            description: editData?.description,
            assignedTo: [
              {
                label: editData?.assignedTo?.name?.english,
                value: editData?.assignedTo?._id,
              },
            ],
            dueDate: editData?.dueDate,
            watcher:
              editData?.watcher.map((r) => ({
                label: r.name.english,
                value: r._id,
              })) || [],
            reportedBy: [
              {
                label: editData?.reportedBy?.name?.english,
                value: editData?.reportedBy?._id,
              },
            ],
          }));
          setAudioBlob(editData.proofFiles?.audios[0])
          // Combine file lists
          const allFiles = [
            ...(editData.proofFiles?.images || []),
            ...(editData.proofFiles?.documents || []),
            ...(editData.proofFiles?.videos || []),
          ];

          // Fetch metadata for all files concurrently
          const fileMetadataPromises = allFiles.map(async (file) => {
            const metadata = await getFileInfo(file);
            return {
              type: file.type,
              file,
              size: metadata.fileSize,
              name: metadata.fileName,
              date: metadata.uploadDate,
            };
          });
          const combinedFiles = await Promise.all(fileMetadataPromises);
          setTranscript(editData?.description);
          setFiles(combinedFiles);

          if (combinedFiles.length > 0) {
            setIsDocumentsUploaded(true);
            setShowSubmittedTable(true);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setData((prev) => ({
        ...prev,
        asset: '',
        reportedBy: currentUserId,
        // priorityId: '',
        dueDate: '',
      }));
    }
    setLoading(true);
  }, [id, currentUserId, setTranscript]);
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    let formData = new FormData();
    const seenFiles = new Set();
    formData.append('asset', values?.asset.value);
    formData.append('assetType', values?.assetType);
    formData.append('issueCategoryId', values?.issueCategoryId);
    formData.append('issueSubCategoryId', values?.issueSubCategoryId);
    formData.append('priorityId', values?.priorityId);
    formData.append('reportedDate', values?.reportedDate);
    formData.append('description', description);
    formData.append('assignedTo', values?.assignedTo.value);
    formData.append('dueDate', values?.dueDate);
    formData.append('reportedBy', values?.reportedBy.value);
    if (Array.isArray(values?.watcher)) {
      values.watcher.forEach((watcher, index) => {
        formData.append(`watcher[${index}]`, watcher.value);
      });
    } else {
      formData.append('watcher', values?.watcher);
    }
    if (!id) {
      if (audioBlob) {
        formData.append('files', audioBlob, 'recordedAudio.mp3');
      }
    }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        if (!seenFiles.has(file.name)) {
          seenFiles.add(file.name);
          formData.append('files', file);
        }
      });
    }
    if (id) {
      let payload = {
        asset: values?.asset[0]?.value,
        assetType: values?.assetType,
        issueCategoryId: values?.issueCategoryId,
        issueSubCategoryId: values?.issueSubCategoryId,
        priorityId: values?.priorityId,
        reportedDate: values?.reportedDate,
        description: values?.description,
        assignedTo: values?.assignedTo[0]?.value,
        dueDate: values?.dueDate,
        watcher:
          values?.watcher.map((r) => {
            return r.value;
          }) || [],
        reportedBy: values?.reportedBy[0]?.value,
        source: 'updateIssue',
      };

      payload._id = id;
      patchApi(APIS.ISSUES, id, payload).then(() => {
        toast.success('Issue updated successfully');
        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
          setTimeout(() => {
            window.location.reload();
          }, 200);
          // window.location.reload()
        } else {
          navigate(-1);
        }
      });
    } else {
      postFileApi(APIS.ISSUES, formData)
        .then((res) => {
          toast.success('Issue added successfully');
          if (values?.saveAndNew) {
            resetForm();
            setData(initialValues);
            setTimeout(() => {
              window.location.reload();
            }, 200);
          } else {
            navigate('/issues');
          }
        })
        .finally(() => {
          setSubmitting(false);
          setShowSubmittedTable;
        });
    }
  };
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
    // {
    //   field: 'description',
    //   headerName: 'Description',
    //   headerClassName: 'super-app-theme--header',
    //   className: 'flex items-center justify-between',
    //   width: 180,
    //   renderCell: (params) => {
    //     // const handleSpeak = (text) => {
    //     //   speak(text);  // Speak only the text from the clicked row
    //     // };
    //     return (
    //       <Tooltip title={params?.row?.description}>
    //         <div className="flex items-center justify-between">
    //           <div>
    //             {truncateText(params?.row?.description, 30)}
    //           </div>
    //           <div className="m-2 cursor-pointer">
    //             {params?.row?.description && (
    //               <div
    //                 onClick={() =>
    //                   handleSpeak(params?.row?.id, params?.row?.description)
    //                 }
    //                 disabled={speakingTasks[params?.row?.id]}
    //               >
    //                 {speakingTasks[params?.row?.id]
    //                   ? spearkerWorking({})
    //                   : spearker({})}
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
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
            {/* {renderPriority(params.row.priorityId)} */}
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
  ];
  const fetchIssues = async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
    tab,
  }) => {
    const searchQuery = tab && tab !== 'All' ? `${search} ${tab}`.trim() : search;
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
      id: index + 1 + page * pageSize, // Make sure the 'id' is unique
      _id: item?._id,
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

    console.log(rowdata); // Log the rowdata to check if it's correct

    return {
      data: rowdata,
      totalCount: response.data.totalCount || 0,
    };
  };



  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={issuesSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        setFieldValue,
        handleSubmit: formikSubmit,
        values,
        errors,
      }) => {
        console.log(values);

        const handleAssetChange = async (selectedAsset) => {
          setFieldValue('asset', selectedAsset);
          const assetTypeValue = selectedAsset?.type;
          setSelectedAssetType(assetTypeValue);
          if (assetTypeValue) {
            setFieldValue('assetType', assetTypeValue);
          }
        };
        const handlePriorityChange = async (value) => {
          try {

            if (!value) {
              const response = await apiService.get(`/v2/masters/priority`, {
                params: {
                  page: 0,
                  search: value || null,
                  sortBy: 'name',
                  order: 'asc',
                },
              });
              const priorityList = response?.data?.list.map((item) => ({
                value: item?._id,
                label: item?.name?.english,
              }));

              return {
                results: priorityList,
                nextPage: false, // Ensure `nextPage` is always returned
              };
            } else {
              const res = await getApi(`v2/masters/priority/${value}`);
              const priorities = res?.data?.priority[0]?.label;
              if (priorities) {
                const date = new Date();
                const dueDate = Number(res?.data?.priority[0]?.days);

                if (!isNaN(dueDate)) {
                  date.setDate(date.getDate() + dueDate);
                } else {
                  console.error('Invalid dueDate:', res?.data?.priority[0]?.days);
                }
                setPriorityId(priorities);
                setFieldValue('priorityId', res?.data?.priority[0]?.value);
                setFieldValue('dueDate', date);
              }
              const priority = res.data.priority[0];
              const dueDate = Number(priority?.days);
              const date = new Date();

              if (!isNaN(dueDate)) {
                date.setDate(date.getDate() + dueDate);
              } else {
                console.error('Invalid dueDate:', priority?.days);
              }

              setPriorityId(priority);
              setFieldValue('priorityId', priority?.value);
              setFieldValue('dueDate', date);

              return {
                results: res.data,
                nextPage: false, // Again, ensure this is returned
              };
            }
          } catch (error) {
            console.error('Error in handlePriorityChange:', error);
            return { results: [], nextPage: false }; // Return fallback value on error
          }
        };
        const handleFileUpload = (fileData) => {
          const newUploadedFiles = fileData.files.map((file) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: new Date(file.lastModified).toLocaleDateString(),
            preview: file.preview,
          }));

          setNewFiles((prevNewFiles) => [...prevNewFiles, ...newUploadedFiles]);
          setShowSubmittedTable(true);
          setSelectedFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            ...fileData.selectedFiles,
          ]);
        };
        const handleDelete = (index, fileType) => {
          if (fileType === 'existing') {
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
          } else {
            setNewFiles((prevNewFiles) =>
              prevNewFiles.filter((_, i) => i !== index)
            );
            setSelectedFiles((prevSelectedFiles) =>
              prevSelectedFiles.filter((_, i) => i !== index)
            );
          }
        };
        const fetchUsers = async (inputValue, page) => {
          const limit = 15;
          const response = await apiService.get(
            `/v1/adminusers/getAllUserNameAndId`,
            {
              params: {
                // limit,
                page: page || 0,
                search: inputValue || null,
                sortBy: 'name',
                order: 'asc',
              },
            }
          );
          return {
            results: response.data,
            nextPage: false,
          };
        };

        return (
          <Container>
            <div className="">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Header>
                    <div>
                      <BreadCrumbs
                        backNavi={() => navigate(-1)}
                        breadCrumbs={[]}
                        boldItem={'Work Orders'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Work Order </Heading>
                    </div>
                    <ButtonContainer>
                      <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      {!id && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            values.saveAndNew = true;
                            formikSubmit();
                          }}
                          disabled={isSubmitting && values?.saveAndNew === true}
                        >
                          Save & Add New
                        </Button>
                      )}
                      <Button
                        type={BUTTON_TYPES.SECONDARY}
                        onClick={() => {
                          values.saveAndNew = false;
                          formikSubmit();
                        }}
                        loading={isSubmitting && !values?.saveAndNew}
                      >
                        {id ? 'Update' : 'Save'}
                      </Button>
                    </ButtonContainer>
                  </Header>

                  <div
                    className="add-v-form"
                    style={{ padding: '20px', justifyContent: 'center' }}
                  >
                    <div className="add-v-form-right-section">
                      <div className="add-v-form-section">
                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                          <SidePanel title={`Details`} />
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'asset'}>Vehicle</Label>
                              <CustomSelect
                                defaultValue={values?.asset}
                                name="asset"
                                // placeholder="Select"
                                fetchData={fetchAssets}
                                onChange={(event) => {
                                  handleAssetChange(event);
                                  // setFieldValue('asset', event?.value)
                                }}
                                useFormik={true}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  // isDisabled: !values?.regionId ? true : false,
                                  isRequired: true,
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Label htmlFor={'assetType'}>Status</Label>
                              <Input
                                label="Asset Type"
                                placeholder="Select"
                                name="assetType"
                                isDisabled={true}
                                defaultValue={values?.assetType}
                                value={
                                  selectdAssetType
                                    ? selectdAssetType
                                    : values?.assetType
                                }
                              />
                            </div>
                            <div className=" w-100 flex-1">
                              <Label htmlFor="issueCategoryId">Repair Priority Class</Label>
                              <CustomSelectById
                                id="issueCategory"
                                useFormik={true}
                                name="issueCategoryId"
                                refetch={
                                  values.issueCategoryId && generateRandomString()
                                }
                                onChange={(e) => {
                                  setFieldValue('issueCategoryId', e.value);
                                  setFieldValue('issueSubCategoryId', '');
                                }}
                                defaultValue={values?.issueCategoryId}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Issue Date"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                            <div className=" w-100 flex-1">
                              <Label htmlFor={'issueSubCategoryId'}>
                                Issued By
                              </Label>
                              <CustomSelectById
                                id="issueSubCategory"
                                isMulti={false}
                                useFormik={true}
                                name="issueSubCategoryId"
                                refetch={
                                  values.issueSubCategoryId &&
                                  generateRandomString()
                                }
                                onChange={(e) => {
                                  // setFieldValue('issueCategoryId', e.value);
                                  setFieldValue('issueSubCategoryId', e.value);
                                  setFieldValue('priorityId', null);
                                  handlePriorityChange(e.value);
                                }}
                                // label="issueCategoryId"
                                // showLabel={true}
                                defaultValue={values?.issueSubCategoryId}
                                filters={{
                                  issueCategoryId: values?.issueCategoryId,
                                }}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  // isDisabled: !values?.regionId ? true : false,
                                  isRequired: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Scheduled Start Date"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Actual Start Date"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                          </div>
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'assetType'}>Start Odometer</Label>
                              <Input
                                label="Asset Type"
                                placeholder="Select"
                                name="assetType"
                                isDisabled={true}
                                defaultValue={values?.assetType}
                                value={
                                  selectdAssetType
                                    ? selectdAssetType
                                    : values?.assetType
                                }
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Expected Completion Date"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Actual Completion Date"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                          </div>
                          <div className="group-type-2-equal">
                            <div className="w-100 flex items-center">
                              <Checkbox
                                id="isScheduleEnabled"
                                name="isScheduleEnabled"
                                checked={false}
                                // onCheckedChange={(checked) => setIsScheduleEnabled(checked)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <Label htmlFor={'default-checkbox'} className='ms-2'>
                                Use start odometer for completion meter{' '}
                              </Label>
                            </div>
                          </div>
                          <div className="group-type-1-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'priorityId'}>Assigned To</Label>
                              <CustomSelectById
                                useFormik={true}
                                name="priorityId"
                                id="priority"
                                refetch={values.priorityId && generateRandomString()}  // Remove semicolon, ensure refetch works as expected
                                defaultValue={values?.priorityId}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                                onChange={(selectedOption) => {
                                  let value = selectedOption.value;  // Get the value directly from the selected option
                                  // handlePriorityChange(value);  // Pass the value to handlePriorityChange
                                  setFieldValue('priorityId', value);  // Set the form value with Formik's setFieldValue
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Label htmlFor={'priorityId'}>Labels</Label>
                              <CustomSelectById
                                useFormik={true}
                                name="priorityId"
                                id="priority"
                                refetch={values.priorityId && generateRandomString()}  // Remove semicolon, ensure refetch works as expected
                                defaultValue={values?.priorityId}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                                onChange={(selectedOption) => {
                                  let value = selectedOption.value;  // Get the value directly from the selected option
                                  // handlePriorityChange(value);  // Pass the value to handlePriorityChange
                                  setFieldValue('priorityId', value);  // Set the form value with Formik's setFieldValue
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Label htmlFor={'priorityId'}>Vendors</Label>
                              <CustomSelectById
                                useFormik={true}
                                name="priorityId"
                                id="priority"
                                refetch={values.priorityId && generateRandomString()}  // Remove semicolon, ensure refetch works as expected
                                defaultValue={values?.priorityId}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                                onChange={(selectedOption) => {
                                  let value = selectedOption.value;  // Get the value directly from the selected option
                                  // handlePriorityChange(value);  // Pass the value to handlePriorityChange
                                  setFieldValue('priorityId', value);  // Set the form value with Formik's setFieldValue
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                defaultValue={
                                  values?.reportedDate
                                    ? values?.reportedDate
                                    : new Date()
                                }
                                labelName="Reported Date & Time"
                                placeholder=""
                                minDate={new Date(new Date())}
                                maxDate={new Date(new Date())}
                                useFormik={false}
                                isRequired
                              />
                            </div>
                          </div>
                          <div className="group-type-1-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'assetType'}>Invoice Number</Label>
                              <Input
                                label="Asset Type"
                                placeholder="Select"
                                name="assetType"
                                isDisabled={true}
                                defaultValue={values?.assetType}
                                value={
                                  selectdAssetType
                                    ? selectdAssetType
                                    : values?.assetType
                                }
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Label htmlFor={'assetType'}>
                                PO Number</Label>
                              <Input
                                label="Asset Type"
                                placeholder="Select"
                                name="assetType"
                                isDisabled={true}
                                defaultValue={values?.assetType}
                                value={
                                  selectdAssetType
                                    ? selectdAssetType
                                    : values?.assetType
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* issues */}
                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                          <div className='flex justify-between'>
                            <SidePanel title={`Issues`} />
                            <Button> + Add Issue</Button>
                          </div>
                          <Tabs defaultValue={tabs[0].value} onValueChange={setActiveTab}>
                            <TabsList className='p-0'>
                              {tabs.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                  {tab.label}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {tabs.map((tab) => (
                              <TabsContent key={tab.value} value={tab.value}>
                                {/* <DataGrid
                                  rows={rows}
                                  columns={headers}
                                  paginationMode="server"
                                  rowCount={totalCount}
                                  pageSizeOptions={[10, 20, 25, 50, 100]}
                                  paginationModel={paginationModel}
                                  onPaginationModelChange={handlePaginationModelChange}
                                  disableRowSelectionOnClick
                                  // loading={isFetching}
                                /> */}
                                <div>
                                  <ListView
                                    queryKey={`issues`}
                                    queryFn={fetchIssues}
                                    columns={headers}
                                    defaultPageSize={10}
                                    pageSizeOptions={[10, 20, 30]}
                                    searchPlaceholder="Search your data"
                                  />
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>
                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                          <SidePanel title={`Line Items`} />
                          <div className="group-type-1">
                            <div>
                              <label className="upload-wrap border ">
                                <div>
                                  {uploadIcon({ width: 40, height: 40 })}
                                </div>
                                <div className="desc heading-700-22">
                                  Upload Image/Document
                                </div>
                                <div className="heading-400-12">
                                  or drag & drop the file here
                                </div>
                                <div
                                  className="upload-btn cursor-pointer heading-400-12"
                                  onClick={openModal}
                                >
                                  BROWSE FILE
                                </div>
                                <div className="heading-400-10 upload-bottom-message">
                                  Supported File Format: jpg, jpeg, png, docx,
                                  pdf, xlxs, xls (upto 5 MB)
                                </div>
                              </label>
                            </div>
                            <FileUploadModal
                              isOpen={modalIsOpen}
                              onClose={closeModal}
                              onSubmit={handleFileUpload}
                              initialName="Existing Document Name"
                              initialType="Existing Document Type"
                            />
                          </div>
                          {showSubmittedTable && renderFileTable()}
                        </div>
                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                          <SidePanel title={`Photos/Documents`} />
                          <div className="group-type-1">
                            <div>
                              <label className="upload-wrap border ">
                                <div>
                                  {uploadIcon({ width: 40, height: 40 })}
                                </div>
                                <div className="desc heading-700-22">
                                  Upload Image/Document
                                </div>
                                <div className="heading-400-12">
                                  or drag & drop the file here
                                </div>
                                <div
                                  className="upload-btn cursor-pointer heading-400-12"
                                  onClick={openModal}
                                >
                                  BROWSE FILE
                                </div>
                                <div className="heading-400-10 upload-bottom-message">
                                  Supported File Format: jpg, jpeg, png, docx,
                                  pdf, xlxs, xls (upto 5 MB)
                                </div>
                              </label>
                            </div>
                            <FileUploadModal
                              isOpen={modalIsOpen}
                              onClose={closeModal}
                              onSubmit={handleFileUpload}
                              initialName="Existing Document Name"
                              initialType="Existing Document Type"
                            />
                          </div>
                          {showSubmittedTable && renderFileTable()}
                        </div>
                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                          <SidePanel title={`Comments`} />
                          <div className="group-type-1-equal">
                            <DescriptionComponent
                              values={{ description }}
                              setFieldValue={(field, value) => setDescription(value)}
                              transcript={transcript}
                              setTranscript={setTranscript}
                              isListening={isListening}
                              toggleListening={toggleListening}
                              handleSpeak={handleSpeak}
                              isSpeaking={isSpeaking}
                              onDescriptionUpdate={(data) => setDescription(data)}
                            />
                          </div>
                          <div className="border-2 border-[#928D8D] border-dashed p-3">
                            <SidePanel title={`${id ? 'Recorded audio' : 'Record audio'}`} />
                            {id ? <audio controls src={audioBlob}></audio> : <AudioRecorder
                              onAudioRecorded={(audioBlob) =>
                                handleAudioRecorded(audioBlob)
                              }
                            />}


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default Issues;