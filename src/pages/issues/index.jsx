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
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/dateHelper';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { getApi, patchApi, postFileApi } from '@/services/method';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useAppStore from '@/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  CustomSelect,
  CustomSelectById,
} from '@/components/common/CustomSelect/index';
import { Select } from '@/components/ui/select';
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
import { getFileInfo } from '@/utils/Workshop.Issues.utils/issues.helper';

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
    }else {
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
                        boldItem={'Issues'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Issues </Heading>
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
                          <SidePanel title={`Issue Information`} />
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'asset'}>Asset</Label>
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
                              <Label htmlFor={'assetType'}>Asset Type</Label>
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
                          <div className="group-type-2-equal">
                            <div className=" w-100 flex-1">
                              <Label htmlFor="issueCategoryId">Category</Label>
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
                              {/* <CustomSelectById
                              key="issueCategoryId"
                              name="issueCategoryId"
                              placeholder="Select"
                              id="issueCategory"
                              limit={5}
                              defaultValue={values?.issueCategoryId}
                              callback={() => {
                                setFieldValue('issueSubCategoryId', '');
                              }}
                            /> */}
                            </div>
                            <div className=" w-100 flex-1">
                              <Label htmlFor={'issueSubCategoryId'}>
                                Sub Category
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
                              {/* <Label htmlFor={'priorityId'}>Priority</Label>
                              <Input
                                label="Priority"
                                placeholder="Select issue sub category"
                                name="priorityId"
                                isRequired
                                value={
                                  priorityId
                                    ? priorityId
                                    : values?.priorityId?.name?.english
                                }
                              /> */}
                              <Label htmlFor={'priorityId'}>Priority</Label>
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
                                // isMulti={true}  // Commented out, as per your need
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
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <CustomSelect
                                key="assignedTo"
                                label="Assigned To"
                                name="assignedTo"
                                fetchData={fetchUsers}
                                placeholder="Select"
                                limit={5}
                                defaultValue={values?.assignedTo}
                                isRequired={true}
                                useFormik={true}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  console.log(value, 'value');

                                  setFieldValue('assignedTo', value);
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <DatePickerInput
                                name="dueDate"
                                defaultValue={values?.dueDate}
                                isRequired
                                callback={(e) => {
                                  setFieldValue('dueDate', new Date(e));
                                }}
                                labelName="Due Date"
                                placeholder="Enter due date"
                                minDate={new Date(new Date())}
                                useFormik={false}
                              />
                            </div>
                          </div>{' '}
                          <div className="group-type-2-equal">
                            <div className="w-100 flex-1">
                              <Label htmlFor={'watcher'}>Watcher</Label>
                              <CustomSelect
                                useFormik={true}
                                name="watcher"
                                fetchData={fetchUsers}
                                defaultValue={values?.watcher}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                                isMulti={true}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue('watcher', value);
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Label htmlFor={'reportedBy'}>Reported By</Label>
                              <CustomSelect
                                useFormik={true}
                                name="reportedBy"
                                fetchData={fetchUsers}
                                defaultValue={values?.reportedBy}
                                selectProps={{
                                  placeholder: 'Select',
                                  isClearable: true,
                                  isRequired: true,
                                }}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue('reportedBy', value);
                                }}
                              // isMulti={true}
                              />
                            </div>
                          </div>
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