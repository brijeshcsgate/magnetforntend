import React from 'react'
import DataTableComponent from '@/components/DataGrid/TableWithHead';
import { APIS } from '@/constants/api.constant';
import { getApi } from '@/services/method';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modifyVehicleResponse } from '@/utils/vehicle.utils/vehicle.helper';
import { VehicleService } from '@/services/VehicleService';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import { Formik } from 'formik';
import { toast } from 'sonner';
import { ROUTES } from '@/constants/route.constant';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import apiService from '@/lib/apiService';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import Tabs from '@/components/common/Tabs/Tabs';
import { Tooltip } from '@mui/material';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  arrowTraingleIcon,
  exportIcon,
  targetIcon,
} from '@/assets/Icons';
import { Button } from '@/components/ui/button';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import {
  Info, EllipsisIcon,
  GripVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const VehiclesSchedules = ({ tabId, onDataLengthChange }) => {
  const [userApiData, setUserApiData] = useState('executed');
  const [extraFilterIds, setExtraFilterIds] = useState({
    depotsIds: [],
  });
  const [isActiveTab, setIsActiveTab] = useState('All');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [isClearAll, setIsClearAll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [labels, setLabels] = useState({});
  const [error, setError] = useState(null);
  const [items, setItems] = useState({ selectedRadio: '' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const { setCount } = useContext(CounterContext);
  const [apiValues, setApiValues] = useState([]);
  const [matchingConditions, setMatchingConditions] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [matchingRegistrationNumbers, setMatchingRegistrationNumbers] = useState([]);
  const [registrationNumbersByRule, setRegistrationNumbersByRule] = useState({});
  const [allVehicleCount, setAllVehicleCount] = useState(0);
  const [allVehiclesData, setAllVehiclesData] = useState({ labels: [], allVehicleCount: 0 });
 

 
 


  useEffect(() => {
    setCount('Inspection');
  }, []);
 



  const getLabelForCondition = (conditionValue) => {
    return labels[conditionValue] || 'Unknown';
  };

  useEffect(() => {
    // Fetch the inspection forms data
    getApi(APIS.INSPECTION_VEHICLE_FORMS)
      .then(response => {
        if (response?.data) {
          const list = response.data.list || [];
          setData(list);

          const selectedItem = list.find(item => item.selectedRadio);
          if (selectedItem) {
            setItems(selectedItem); // Set items with the selected radio value
            setSelectedRadio(selectedItem.selectedRadio); // Update selectedRadio
          }
          if (onDataLengthChange) {
            onDataLengthChange(list?.length); // Pass the length of the data back to the parent
          }
        }
      })
      .catch(error => console.error('Error fetching inspection forms:', error))
      .finally(() => setLoading(false));
  }, [onDataLengthChange]);



  useEffect(() => {
    if (tabId) {
      getVehicleData();
    }
  }, [tabId]);

  const getVehicleData = () => {
    VehicleService.getVehicleById(tabId, { populate: 'false' }, handleGetVehicleSuccess);
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;
    setInitialValues(formattedData); // Ensure setInitialValues is correctly used
  };
 
  useEffect(() => {
    const fetchAllVehiclesData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v2/vehicle/all-vehicle-numbers');
        const labels = response.data.data.vehicles.map(vehicle => vehicle.label);
        const allVehicleCount = labels.length;
        setAllVehiclesData({ labels, allVehicleCount });
      } catch (error) {
        console.error('Error fetching all vehicles data', error);
        setError('Error fetching all vehicles data');
      }
    };

    fetchAllVehiclesData();
  }, []);

  useEffect(() => {
    const fetchDataIfAllVehiclesSelected = async () => {
      if (items.selectedRadio === 'All Vehicles') {
        const { labels, allVehicleCount } = await fetchAllVehiclesData();
        console.log('Fetched all vehicles data:', { labels, allVehicleCount });
        setAllVehiclesData({ labels, allVehicleCount }); // Store both labels and count
      }
    };

    fetchDataIfAllVehiclesSelected();
  }, [items.selectedRadio]);
  useEffect(() => {
    const fetchVehicleGroups = async () => {
      setLoading(true);
      try {
        const [vehicleGroupsResponse, vehicleTypesResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/v2/masters/vehicleGroup'),
          axios.get('http://localhost:3000/api/v2/masters/typeOfService'),
        ]);

        const vehicleGroups = vehicleGroupsResponse.data.data.list;
        const vehicleTypes = vehicleTypesResponse.data.data.list;

        const vehicleGroupsLabelsMap = vehicleGroups.reduce((acc, group) => {
          acc[group.id] = `Group is any of ${group.name.english || 'Unknown'}`;
          return acc;
        }, {});

        const vehicleTypesLabelsMap = vehicleTypes.reduce((acc, type) => {
          acc[type.id] = `Type is any of ${type.name.english || 'Unknown'}`;
          return acc;
        }, {});

        const combinedLabelsMap = { ...vehicleGroupsLabelsMap, ...vehicleTypesLabelsMap };

        setLabels(combinedLabelsMap);
      } catch (error) {
        setError('Error fetching vehicle data');
        console.error('Error fetching vehicle data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleGroups();
  }, []);

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

            });
            // let url = ${APIS.GET_ALL_VEHICLES};

            setIsActiveTab('All');
            setIsClearAll(false);
          }
          : '',
    },
  ];

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const HEAD_BUTTONS = [

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
  const headers = [
    {
      field: 'vechicleName',
      headerName: selectedRadio ? 'Vehicle' : 'bhago',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        selectedRadio === 'All Vehicles'  && (
          <Link

          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <img
                src="/assets/images/busimage.jpg"
                alt={`Image `}
                style={{ width: '33px', height: '33px' }}
              />
              <div>{params.row.vechicleName}</div>
            </div>
          </Link>)
      ),
    },

    {
      field: 'addVia',
      headerName: 'Add Via',
      headerClassName: 'super-app-theme--header',
      width: 110,
      renderCell: (params) => (
        <Link

        >   {"Rule"}
        </Link>
      ),
    },
    {
      field: 'formStatus',
      headerName: 'Form Status',
      headerClassName: 'super-app-theme--header',
      width: 110,
      renderCell: (params) => (
        <Link

        >   {"Enable"}
        </Link>
      ),
    },
    {
      field: 'schedule',
      headerName: 'Schedule',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link

        >   {"ON"}
        </Link>
      ),

    },
    {
      field: 'frequency',
      headerName: 'Frequency',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link

        >   {"ON"}
        </Link>
      ),
    },
    {
      field: 'vehicleGroup',
      headerName: 'Group ',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link

        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>

            <div>{params.row.vechicleGroup}</div>
          </div>
        </Link>
      ),
    },
    {
      field: 'vehicleType',
      headerName: 'Type ',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Link

        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>

            <div>{params.row.vechicleType}</div>
          </div>
        </Link>
      ),
    },
  ];











  useMemo(() => {
    if (isActiveTab !== 'All') {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [isActiveTab]);
  // Handler for drag end
  const onDragEnd = (result) => {
    if (!result.destination) return; // If no destination, exit

    // Reorder data based on drag result
    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);

    // Update state with new order
    setData(reorderedData);
  };

  //..........
  const tabs = [
    { tabName: 'All' },
    { tabName: 'Active' },
    { tabName: 'Disabled' },
    { tabName: 'In Workshop' },
    { tabName: 'Out of Service' },
  ];

  const navigateToPreview = (rowData) => {
    navigate(`${ ROUTES.VEHICLES } / preview / ${ rowData?._id }`, {
      state: { rowData, comparator: 'gridNillComparator' },
    });
  };
  const navigateToEdit = (rowData) => {
    navigate(`${ ROUTES.VEHICLES } / edit / ${ rowData?._id }`, {
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
      const response = await axios.delete(
        `${ import.meta.env.VITE_APP_BASE_URL } / vehicle / ${ id }`,
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
      let backendURL = `${ APIS.EXPORT_VEHICLES }`;
      getApi(backendURL, null, null)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'vehicles.csv');
          // convert response.data to csv

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
      if (selectedIds.length === 0) {
        return toast.error('Please select at least one vehicle');
      }

      const data = {
        ids: selectedIds,
      };

      let backendURL = `${ APIS.EXPORT_VEHICLES }`;
      postApi(backendURL, data)
        .then((response) => {
          const csvContent = createCSVContent(response);
          downloadCSV(csvContent, 'vehicle.csv');
          // convert response.data to csv

          toast.success('Data Exported Successfully');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const actionButtons = [

    // setTimeout(() => {
    //   navigate("/vehicles");
    //   history.go("/vehicles")

    //   }, 300)
  ];
  const actionData = {
    leftAction: [
      {
        title: 'Export',

        onClick: handleSelectedExportCSV,
      },
      {
        title: 'Update Status',

        onClick: () => setShowStatusModal(true),
      },
    ],
  };
  const moreActionData = [
    {
      title: 'Add Multiple Vehicles',

      onClick: '',
    },
    {
      title: 'Import Vehicles',
      type: 'vehicle',

      onClick: () => {
        const fileInput = document.getElementById('bulk-upload');
        fileInput.click();
      },
    },
    {
      title: 'Import Meter Entries',

      onClick: '',
    },
    {
      title: 'Add GPS / Telematics integration',
      icon: targetIcon({ width: 15, height: 14 }),
      onClick: '',
    },
    {
      title: 'Export CSV',
      icon: exportIcon({ width: 12, height: 11 }),
      onClick: () => handleExportCSV(),
    },
  ];
  const getRowOptions = (params) => {
    const options = [];




    return options;
  };
  const onGetVechicleApi = (isImport) => {
    !isImport && setLoading(true);
    const payload = {
      page,
      pageSize,
      search,
    };
    if (isActiveTab === 'Clear All') {
      let url = `${ APIS.GET_ALL_VEHICLES }`;
      getApi(url, null, payload)
        .then((response) => {
          modifyVehicleResponse({
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
      let url = `${APIS.GET_ALL_VEHICLES}?pageSize=${pageSize}&page=${page + 1
        }&search=${search}&id=${[

        ]}`;
      getApi(url, null, payload)
        .then((response) => {
          modifyVehicleResponse({
            setRows,
            setTotalCount,
            response,
            page,
            pageSize,
          });
        })
        .finally(() => setLoading(false));
    } else {
      let url = `${APIS.GET_ALL_VEHICLES}?pageSize=${pageSize}&page=${page + 1
        }&status=${isActiveTab.toLocaleLowerCase()}&search=${search}&depot=${extraFilterIds.depotsIds
        }`;
      getApi(url, null, payload)
        .then((response) => {
          modifyVehicleResponse({
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
    onGetVechicleApi();
  }, [page, pageSize, refresh, isActiveTab, search, extraFilterIds]);

  useMemo(() => {
    if (isActiveTab !== 'All') {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [isActiveTab]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        const response = await fetch('http://localhost:3000/api/v2/vehicle/'); // Fetch vehicle data from API
        const result = await response.json(); // Parse JSON response

        if (result.status && result.data && result.data.list) {
          setVehicleData(result.data.list); // Store the vehicle data in state

          // Extract serviceTypeId and groupId values from the vehicle data
          const combinedArray = result.data.list.flatMap(vehicle => {
            const serviceTypeId = vehicle.serviceDetail?.serviceTypeId?.id; // Get serviceTypeId
            const groupId = vehicle.serviceDetail?.groupId; // Get groupId
            return [serviceTypeId, groupId].filter(value => value !== null); // Return values if not null
          });
          setApiValues(combinedArray); // Store the combined array of API values
        } else {
          console.warn('Unexpected API response structure:', result); // Log unexpected structure
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error); // Handle errors
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      // Create a map to hold registration numbers and their counts for each rule
      const registrationDataByRule = {};

      data.forEach(item => {
        // Find matching conditions from inspection data
        const matchingConditions = item.conditionsList?.filter(condition =>
          apiValues.includes(condition.value) // Check if the condition value is in apiValues
        ) || [];

        // Determine the logic to apply
        const logic = item.logic || 'AND'; // Default to 'AND' if logic is undefined

        // Filter vehicles based on matching conditions for the current item
        const filteredVehicles = vehicleData.filter(vehicle => {
          // Extract vehicle attributes
          const serviceTypeId = vehicle.serviceDetail?.serviceTypeId?.id;
          const groupId = vehicle.serviceDetail?.groupId;

          // Check if vehicle matches conditions based on the logic
          const matchesConditions = matchingConditions.map(condition =>
            serviceTypeId === condition.value || groupId === condition.value
          );

          if (logic === 'AND') {
            // All conditions must be met
            return matchesConditions.every(Boolean);
          } else if (logic === 'OR') {
            // At least one condition must be met
            return matchesConditions.some(Boolean);
          }

          return false;
        });

        // Extract registration numbers from filtered vehicles
        const matchingRegistrationNumbers = filteredVehicles
          .map(vehicle => vehicle.identification?.registrationNumber)
          .filter(regNum => regNum !== undefined); // Filter out undefined values

        // Store registration numbers and their count
        registrationDataByRule[item._id] = {
          registrationNumbers: [...new Set(matchingRegistrationNumbers)],
          count: matchingRegistrationNumbers.length
        };

        // Log the count for debugging
      
      });
      console.log("value test", registrationDataByRule);
      // Set state with registration numbers and counts by rule
      setRegistrationNumbersByRule(registrationDataByRule);
    } else {
      setRegistrationNumbersByRule({});
    }
  }, [data]);







  return (
    <Formik

      enableReinitialize={true}

    >
      {({ values, isSubmitting, handleSubmit: formikSubmit }) => (
        <div>
          <div className="w-full  mx-auto ">



            <Accordion
              type="multiple"
              collapsible
              className="text-details-one pl-3 pr-3 shadow-md my-4"
              style={{ border: '1px solid #e0e0e0' }}
            >
              <AccordionItem value={'dd'}>
                <AccordionTrigger>
                  <div
                    className="aifbc-flex-9 w-[98%] mr-2"
                  >
                    <div
                      className="aifbc-ml-24-mt-5 flex flex-row items-center gap-2.5"


                    >
                      {arrowTraingleIcon({
                        width: 30,
                        height: 20,
                      })}

                      <span
                        className=""
                        onClick={() =>
                          navigate(
                            ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                            { state: dataItem }
                          )
                        }
                      >
                        <span className="flex text-[#002850] font-semibold text-lg items-center"> Rules and Manual Overrides

                          <div className="relative group flex items-center justify-center">
                            <button
                              className="flex items-center justify-center p-2 rounded-full  focus:outline-none"
                            >
                              <Info className="h-5 w-5" color='gray' />
                            </button>

                            <Tooltip >
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 w-[300px] p-2 bg-[#002850] text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p>Create rules to enable the inspection form and set inspection schedules for vehicles based on attributes. Rules keep vehicles automatically in sync. Prioritize with drag-and-drop and apply manual overrides to exempt specific vehicles from rules.</p>
                              </div>
                            </Tooltip>

                          </div>
                        </span>

                      </span>
                    </div>
                    <div className="aifbc-flex-5 aifbc-jc-r">
                      <div


                      >
                        <div className="text-[#002850] text-sm md:text-base cursor-pointer flex items-center" onClick={() => navigate("/inspections/vehicle/add")} >  <span className='text-[25px] mr-2'>+</span> Add Vehicles</div>

                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="aifbc-box1-without-border aifbc-flex4-g12">
                    <div className="group-type-1">
                      {loading ? (
                        <p>Loading...</p>
                      ) : data?.length === 0 ? (
                        <>
                          <div className="flex justify-center text-lg text-[#030303] font-medium my-2">
                            <span>Add vehicle rules to this inspection form</span>
                          </div>
                          <div className="flex justify-center text-[#8D8E93] text-center text-[10px] mb-4">
                            <span>Create rules to enable the inspection form and set inspection schedules for vehicles based on <br />
                              attributes. Rules keep vehicles automatically in sync.</span>
                          </div>

                          <div className="flex justify-center">
                            <div className="rounded-md w-[157px] h-[39px] bg-[#256EB5] text-white flex items-center justify-center text-[15px] cursor-pointer">
                              <span onClick={() => navigate("/inspections/vehicle/add")} className='flex items-center'>
                                <span className='text-[25px] mr-2'>+</span> Add Vehicle
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="-mb-5">
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable" type="ROWS">
                              {(provided) => (
                                <table className="" {...provided.droppableProps} ref={provided.innerRef}>
                                  <thead className='border-b border-b-gray-300'>
                                    <tr className="border-b-gray-300">
                                      <th className="py-2 text-center w-[300px]">Rule</th>
                                      <th className="py-2 text-center w-[300px]">Vehicles</th>
                                      <th className="py-2 w-[300px] text-center">Schedule</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((item, index) => {
                                      const selectedFrequency = item.frequency;
                                      const due = item.due;
                                      const time = item.time;
                                      const newDate = item.date;

                                      let scheduleString = '';

                                      if (selectedFrequency) {
                                        scheduleString += ` ${selectedFrequency}`;
                                      }

                                      if (newDate) {
                                        const dateObj = new Date(newDate);
                                        const options = { day: 'numeric', month: 'long', year: 'numeric' };
                                        const formattedDate = dateObj.toLocaleDateString('en-GB', options);

                                        if (scheduleString) {
                                          scheduleString += ` starting at ${formattedDate}`;
                                        } else {
                                          scheduleString = `Starting at ${ formattedDate }`;
                                        }
                                      }

                                      if (time) {
                                        if (scheduleString) {
                                          scheduleString += ` with a reminder set at ${time}`;
                                        } else {
                                          scheduleString = `Reminder set at ${ time }`;
                                        }
                                      }

                                      if (due) {
                                        if (scheduleString) {
                                          scheduleString += ` ${due} before the due date.`;
                                        } else {
                                          scheduleString = `${ due } before the due date.`;
                                        }
                                      }

                                      if (!scheduleString) {
                                        scheduleString = 'No schedule information available';
                                      }

                                      return (
                                        <Draggable key={item._id} draggableId={item._id} index={index}>
                                          {(provided) => (
                                            <tr
                                              className="hover:bg-gray-50 border-b border-b-gray-300"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <td className="py-2 px-4 w-[400px] text-center">
                                                <div>
                                                  {item.selectedRadio === 'All Vehicles' ? (
                                                    <div className='flex w-[200px] justify-between'>
                                                      <GripVertical />
                                                      <div className=''>{item.selectedRadio}</div>
                                                    </div>
                                                  ) : item.selectedRadio === 'By Vehicle Attribute' ? (
                                                    <div className='flex'>
                                                      <GripVertical />
                                                      <div className='flex flex-col items-center ml-9'>
                                                        {Array.isArray(item.conditionsList) && item.conditionsList.length > 0 ? (
                                                          item.conditionsList.map((condition, index) => (
                                                            <React.Fragment key={index}>
                                                              <div className='text-sm'>{getLabelForCondition(condition.value)}</div>

                                                              {index < item.conditionsList.length - 1 && (
                                                                <div className="text-center rounded-full py-0.5 my-0.5 bg-gray-300 w-[40px] flex justify-center">{item.logic}</div>
                                                              )}
                                                            </React.Fragment>
                                                          ))
                                                        ) : (
                                                          <div>No conditions available</div>
                                                        )}
                                                      </div>
                                                    </div>
                                                  ) : item.selectedRadio === 'Specific Vehicle' ? (
                                                    <div className='flex w-[240px] justify-between'>
                                                      <GripVertical />
                                                      <div className="text-yellow-500 border border-yellow-500 py-1 px-4 rounded-full ">Manual Overrides</div>
                                                    </div>
                                                  ) : (
                                                    <div>No selection made</div>
                                                  )}
                                                </div>
                                              </td>

                                              <td className="py-2 px-4 w-[400px] text-center">
                                                
                                                <div className="text-[#256EB5]">
                                                 {console.log("allVehiclesData.allVehicleCount",allVehiclesData.allVehicleCount)}
                                                  {item.selectedRadio === 'All Vehicles' ? allVehiclesData.allVehicleCount : registrationNumbersByRule[item._id]?.count || 0} Vehicles
                                                </div>
                                              </td>

                                              <td className="py-2 px-4 w-[800px] text-center">{scheduleString}</td>
                                              <td className="py-2 px-4 w-[300px] text-center">
                                                <RowDetailsButton
                                                  imgUrl="/assets/threeDotDataGrid.svg"
                                                  options={getRowOptions(item)}
                                                />
                                              </td>
                                            </tr>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </tbody>
                                </table>
                              )}
                            </Droppable>
                          </DragDropContext>

                        </div>
                      )}

                      {/* Display Matching Conditions */}
                      {matchingConditions.length > 0 && (
                        <div className="matching-conditions">
                          <h3>Matching Conditions:</h3>
                          <ul>
                            {matchingConditions.map((condition, index) => (
                              <li key={index}>
                                {getLabelForCondition(condition.value)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>



          </div>


          <>
            <div className='shadow-md'>

              <DataTableComponent

                headers={headers}
                rows={rows}
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}

                actionButtons={actionButtons}
                actionData={actionData}
                moreActionData={moreActionData}
                onGetVehicleApi={(e) => onGetVechicleApi(e)}
                loading={loading}
                setSearch={setSearch}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                LIST_OF_FILTERS={LIST_OF_FILTERS}
              />


            </div>
          </>
        </div>
      )}
    </Formik>
  );
};
export default VehiclesSchedules;