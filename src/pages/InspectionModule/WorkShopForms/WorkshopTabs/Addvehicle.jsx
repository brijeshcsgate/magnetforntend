import React from 'react';
import { ArrowDownIcon } from '@/components/icons';
import {
  ButtonContainer,
  Container,
  Header,
  Heading,
} from '@/components/AddFormLayout/AddFormLayout';
import { DatePickerInput } from '@/components/common/DateTimeInputs/index';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { VehicleService } from '@/services/VehicleService';
import { CustomOptionSelectAsync } from '@/components/common/CustomSelect/CustomOptionSelect';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import { frequency } from '@/utils/common.helper';
import { DateInput } from '@/pages/dms/TimeTable/AddEditTimeTable/DateTimeInput';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import { ROUTES } from '@/constants/route.constant';
import { ChevronUp, LockKeyhole, Trash2 } from 'lucide-react';
import { getApi, postApi, patchApi, postFileApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { toast } from 'react-toastify';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const [due, setDue] = useState(0);
  const [time, setTime] = useState('12:00 AM');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedRadioo, setSelectedRadioo] = useState('radioButton1');
  const [selectedRadio1, setSelectedRadio1] = useState('');
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isScheduleEnabled2, setIsScheduleEnabled2] = useState(false);
  const [isScheduleEnabled4, setIsScheduleEnabled4] = useState(false);
  const [isScheduleEnabled3, setIsScheduleEnabled3] = useState(false);
  const [selectedConditionIndex, setSelectedConditionIndex] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false); // Default is false
  const [showvehical, setShowVehicalFields] = useState(true); 
  const [selectedFrequency, setSelectedFrequency] = useState('Daily');
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [frequencyUnit, setFrequencyUnit] = useState('Days');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [conditionsList, setConditionsList] = useState([
    { type: '', value: '', label: '' },
  ]);
  const [selectedSpecify, setSelectedSpecify] = useState('Anytime');
  const [selectedDays, setSelectedDays] = useState([]);
  const [logic, setLogic] = useState('OR');
  const [timeDrop, setTimeDrop] = useState([
    {
      label: '12:00am',
      value: '12:00am',
    },
    {
      label: '1:00am',
      value: '1:00am',
    },
    {
      label: '2:00am',
      value: '2:00am',
    },
    {
      label: '3:00am',
      value: '3:00am',
    },
    {
      label: '4:00am',
      value: '4:00am',
    },
    {
      label: '5:00am',
      value: '5:00am',
    },
    {
      label: '6:00am',
      value: '6:00am',
    },
    {
      label: '7:00am',
      value: '7:00am',
    },
    {
      label: '8:00am',
      value: '8:00am',
    },
    {
      label: '9:00am',
      value: '9:00am',
    },
    {
      label: '10:00am',
      value: '10:00am',
    },
    {
      label: '11:00am',
      value: '11:00am',
    },
    {
      label: '12:00pm',
      value: '12:00pm',
    },
    {
      label: '1:00pm',
      value: '1:00pm',
    },
    {
      label: '2:00pm',
      value: '2:00pm',
    },
    {
      label: '3:00pm',
      value: '3:00pm',
    },
    {
      label: '4:00pm',
      value: '4:00pm',
    },
    {
      label: '5:00pm',
      value: '5:00pm',
    },
    {
      label: '6:00pm',
      value: '6:00pm',
    },
    {
      label: '7:00pm',
      value: '7:00pm',
    },
    {
      label: '8:00pm',
      value: '8:00pm',
    },
    {
      label: '9:00pm',
      value: '9:00pm',
    },
  ]);
  const [specify, setSpecify] = useState([
    {
      label: 'Anytime',
      value: 'Anytime',
    },
    {
      label: 'On a Specific Day ',
      value: 'On a Specific Day',
    },
  ])
  const [date, setDate] = useState(new Date());
  const [dateYearly, setdateYearly] = useState(new Date());
  const [selectedView, setSelectedView] = useState('Calendar');
  const [lastDateOfNextMonth, setLastDateOfNextMonth] = useState(null);
  const [isClick, setIsClick] = useState(false); 
  const [selectedDates, setSelectedDates] = useState([]);
  const [earlyDate, setEarlyDate] = useState(1)
  const [initialValues, setInitialValues] = useState({
    vehicleGroup: null,
    busServiceType: null,
    frequency: '',
    time: '',
    vehicle: '',
    isScheduleEnabled: false,
    isScheduleEnabled2: false,
    isScheduleEnabled3: false,
    isScheduleEnabled4: false,
    selectedRadio: 'All Vehicles',
    scheduleRepeat: '',
    weeklyFrequency: '',
    early: '',
    dayName:'',
    day:'',
  });

  const [data, setData] = useState(initialValues);
  const daysOptions = [
    { label: 'S', value: 'Sunday' },
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday' },
    { label: 'W', value: 'Wednesday' },
    { label: 'Th', value: 'Thursday' },
    { label: 'F', value: 'Friday' },
    { label: 'Sat', value: 'Saturday' },
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCurrentDayValue = () => {
    const days = daysOptions.map(day => day.value);
    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
    return days.find(day => day === currentDay) || null;
  };

  useEffect(() => {
    const defaultDay = getCurrentDayValue();
    if (defaultDay) {
      setSelectedDays([defaultDay]);
    }
  }, []);
  useEffect(() => {
    const defaultDay = getCurrentDayValue();
    const today = new Date();
    setSelectedDate(today);
    if (defaultDay) {
      setSelectedDays([defaultDay]);
    }
  }, []);

  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDates(daysArray);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (selectedView === 'Calendar') {
      // Set date to the last day of the current month
      const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      setDate(lastDayOfMonth);
    }
  }, [selectedView]);

  useEffect(() => {
    switch (selectedFrequency) {
      case 'Daily':
        setFrequencyUnit('Day');
        break;
      case 'Weekly':
        setFrequencyUnit('Week');
        break;
      case 'Monthly':
        setFrequencyUnit('Month');
        break;
      case 'Yearly':
        setFrequencyUnit('Year');
        break;
      default:
        setFrequencyUnit('Day');
    }
  }, [selectedFrequency]);
  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditionsList];
    if (field === 'value') {
      newConditions[index][field] = value;
      newConditions[index].label = getLabelFromId(value); // Update the label based on the value
    } else {
      newConditions[index][field] = value;
    }
    setConditionsList(newConditions);
    setSelectedRadio1(index);
  };


  const handleAddCondition = () => {
    if (conditionsList?.length < 2) {
      setConditionsList([...conditionsList, { type: '', value: '' }]);
    }
  };
  useEffect(() => {
    const today = new Date();
    if (
      today.getMonth() === selectedDate.getMonth() &&
      today.getFullYear() === selectedDate.getFullYear()
    ) {
      setSelectedDates([today]);
    }
  }, [selectedDate]);
  const handleDateChange = (date) => {
    const dateStr = date.toDateString();

    setSelectedDates((prevSelectedDates) => {
      const isAlreadySelected = prevSelectedDates.some(d => d.toDateString() === dateStr);

      if (isAlreadySelected) {
      
        return prevSelectedDates.filter(d => d.toDateString() !== dateStr);
      } else {
       
        return [...prevSelectedDates, date];
      }
    });
  };

  const handleDeleteCondition = (index) => {
    const newConditions = conditionsList.filter((_, i) => i !== index);
    setConditionsList(newConditions);
  };

  const handleDropdownChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setShowAdditionalFields(true);
    setShowAdditionalFields(value !== '');
    setShowVehicalFields(false);
  };
  const getInitialValuesForTab = () => {
    return initialValues[selectedRadio] || {};
  };
  const handleTimeIncrease = () => {
    let [hours, minutes] = time.split(':');
    let [period] = minutes.split(' ');

    hours = parseInt(hours, 10);
    minutes = parseInt(minutes.split(' ')[0], 10);

    minutes += 1;

    if (minutes === 60) {
      minutes = 0;
      hours += 1;
    }

    if (hours === 12 && minutes === 0) {
      period = period === 'AM' ? 'PM' : 'AM';
    }

    if (hours === 13) {
      hours = 1;
    }

    setTime(`${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`);
  };

  const handleTimeDecrease = () => {
    let [hours, minutes] = time.split(':');
    let [period] = minutes.split(' ');

    hours = parseInt(hours, 10);
    minutes = parseInt(minutes.split(' ')[0], 10);

    minutes -= 1;

    if (minutes === -1) {
      minutes = 59;
      hours -= 1;
    }

    if (hours === 0) {
      hours = 12;
      period = period === 'AM' ? 'PM' : 'AM';
    }

    if (hours === 12 && minutes === 59) {
      period = period === 'AM' ? 'PM' : 'AM';
    }

    setTime(`${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`);
  };

  const handleIncrease = () => {
    setDays(Math.min(days + 1, 30));
  };
  const handleIncreasedelay = () => {
    setEarlyDate(Math.min(earlyDate + 1, 4));
  };
  const handleFrequencyChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedFrequency(selectedOption.value);
    console.log('...:', value); // Log the selected frequency
    if (value === 'Daily') {
      setDue(0);
    }
  };

  const handleIncreasee = () => {
    if (due < 7 && selectedFrequency !== 'Daily') {
      setDue(due + 1);
    }
  };
  const handleSpecifyChange = (selectedOption) => {
    setSelectedSpecify(selectedOption.value); // Update local state
  };

  const handleDayClick = (dayValue) => {
    setSelectedDays(prev =>
      prev.includes(dayValue)
        ? prev.filter(day => day !== dayValue)
        : [...prev, dayValue]
    );
  };

  const handleDecreasee = () => {

    if (due > 0 && selectedFrequency !== 'Daily') {
      setDue(due - 1);
    }
  };

  const handleDecrease = () => {
    setDays(Math.max(days - 1, 1));
  };
  const handleDecreasedelay = () => {
    setEarlyDate(Math.max(earlyDate - 1, 1));
  };
  let newDate = new Date();
  let newDateY = new Date();
  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.INSPECTION_VEHICLE_FORMS, id)
        .then((res) => {
          const editData = res?.data;
          setData((prev) => ({
            ...prev,
            frequency: editData?.frequency || '',
            date: editData?.date || '',
            time: editData?.time || '',
            vehicle: editData?.vehicle || '',
            vehicleGroup: editData?.vehicleGroup || '',
           busServiceType : editData?.busServiceType || '',
            selectedRadio: editData?.selectedRadio || '',
            scheduleRepeat: editData?.scheduleRepeat || '',
            weeklyFrequency: editData?.weeklyFrequency || '',
            due: editData?.due || '',
            dateYearly: editData?.dateYearly || '',
            early: editData?.early || '',
            earlyDate: editData?.earlyDate||'',
            dayName: editData?.dayName || '',
            isScheduleEnabled: editData?.isScheduleEnabled,
            isScheduleEnabled2: editData?.isScheduleEnabled2,
            isScheduleEnabled3: editData?.isScheduleEnabled3,
            isScheduleEnabled4: editData?.isScheduleEnabled4,
            day:editData?.day || '',
            days:editData?.days|| '',
            conditionsList: editData?.conditionsList|| '',
          }));
         
        })
        .finally(() => setLoading(false));
    }
  }, [id]);
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submitting Data:', values); 
    const selectedRadioLabel = radioLabelMap[values.selectedRadio] || '';
    
    const payload = {
      frequency: values.frequency,
      date,
      time: values.time,
      vehicleGroup: values.vehicleGroup,
      busServiceType: values.busServiceType,
      vehicle: values.vehicle,
      isScheduleEnabled: values.isScheduleEnabled,
      isScheduleEnabled2: values.isScheduleEnabled2,
      isScheduleEnabled3: values.isScheduleEnabled3,
      isScheduleEnabled4: values.isScheduleEnabled4,
      selectedRadio: values.selectedRadio,
      scheduleRepeat: values.scheduleRepeat,
      weeklyFrequency: values.weeklyFrequency,
      due,
      dateYearly,
      earlyDate,
      dayName: values.dayName,
      day:values.day,
      days,
      conditionsList: values.conditionsList, 
      logic: logic,
    };
    console.log(payload)
    if (id) {
//payload._id = id;
      patchApi(APIS.INSPECTION_VEHICLE_FORMS, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.INSPECTION_VEHICLE_FORMS, payload)
        .then(() => {
          toast.success('Data saved successfully');
          if (values?.save) {
            resetForm();
            setData(initialValues);
          } else {
            navigate(-1);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
    values.conditionsList.forEach(condition => {
      if (condition.type === 'busServiceType') {
        console.log('Vehicle Type:', condition.value);
      }
      if (condition.type === 'vehicleGroup') {
        console.log('Vehicle Group:', condition.value);
      }
    });
  };
 

  useEffect(() => {
    if (id) getVehicleData();
  }, [id]);

  const getVehicleData = () => {
    VehicleService.getVehicleById(
      id,
      { populate: 'false' },
      handleGetVehicleSuccess
    );
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;
    setInitialValues(formattedData);
  };
  useEffect(() => {
    console.log('hhh:', selectedFrequency);
  }, [selectedFrequency]);
  const radioLabelMap = {
    'All Vehicles': 'All Vehicles',
    'By Vehicle Attribute': 'By Vehicle Attribute',
    'Specific Vehicle': 'Specific Vehicle',
  };
  const radioLabelMapp = {
    radio1: 'Day of month',
    radio2: 'Day of week',

  };
  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.id);
  };
  const handleRadioChange2 = (e) => {
    setSelectedRadio1(e);
  };
  const conditions = {
    busServiceType: ['Vehicle Type 1', 'Vehicle Type 2', 'Vehicle Type 3'],
    vehicleGroup: ['Vehicle Group 1', 'Vehicle Group 2', 'Vehicle Group 3'],
  };

  const conditionOptions = [
    { label: 'Vehicle Type', value: 'busServiceType' },
    { label: 'Vehicle Group', value: 'vehicleGroup' },
  ];

  const applyLogic = () => {
    if (logic === 'AND') {
      // Apply intersection logic
      console.log('Applying intersection logic...');
    } else if (logic === 'OR') {
      // Apply union logic
      console.log('Applying union logic...');
    }
  };
  const fetchVehicleData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/vehicle/');
      const data = await response.json();
      console.log("hhhhhhhhhhh", data)
      return data;
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      return [];
    }
  };
  const filterVehicles = async () => {
    const vehicles = await fetchVehicleData();

   
    const filteredVehicles = vehicles.filter(vehicle => {
      return conditionsList.every(condition => {
        const matchGroup = condition.type === 'vehicleGroup' ? vehicle.vehicleGroup === condition.value : true;
        const matchType = condition.type === 'busServiceType' ? vehicle.serviceTypeId === condition.value : true;

        if (logic === 'AND') {
          return matchGroup && matchType;
        } else if (logic === 'OR') {
          return matchGroup || matchType;
        }

        return false;
      });
    });
 
    console.log('Filtered Vehicles....................:', filteredVehicles);
  };
  const handleLogicClick = (selectedLogic) => {
    setLogic(selectedLogic);
    filterVehicles(); 
  };

  const handleLastDateClick = () => {
    // Get the last date of the next month
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    const lastDateOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
    setLastDateOfNextMonth(lastDateOfNextMonth);
    setIsClick(true);
    console.log(lastDateOfNextMonth)
   
  };
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    if (lastDateOfNextMonth && (currentMonth > selectedMonth || (currentMonth === 0 && selectedMonth === 11))) {
      const lastDate = new Date(selectedYear, selectedMonth + 1, 0);
      if (selectedDate.getDate() !== lastDate.getDate()) {
        setSelectedDate(lastDateOfNextMonth);
        console.log(setSelectedDate)
        console.log(lastDateOfNextMonth)
        
      }
    }
  }, [selectedDate, lastDateOfNextMonth]);
 
  const renderCalendarView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date().getDate();

    return (
      <div className="flex flex-wrap border border-gray-300 rounded-md shadow-md py-1">
        {daysArray.map(day => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());

          return (
            <div
              key={day}
              onClick={() => handleDateChange(date)}
              className={`cursor-pointer w-[82px] h-[42px] flex items-center justify-center hover:bg-[#eeeeee] px-4 ${isSelected ? 'bg-[#b0d5fa] text-white' : 'text-gray-700'}`}
              name='day'
           >
              {day}
            </div>
          );
        })}
        <div
          onClick={handleLastDateClick}
          className={`cursor-pointer w-[102px] h-[42px] flex items-center text-sm hover:bg-[#eeeeee] px-4 text-gray-700 mt-1 ${isClick ? 'bg-[#b0d5fa] text-white' : ''}`}
        >
          Last Date
        </div>
      </div>

    );
  };


  const renderWeekView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const startDay = startOfMonth.getDay();

    const daysArray = Array.from({ length: daysInMonth + startDay }, (_, i) => {
      return i < startDay ? null : i - startDay + 1;
    });

    const weeksArray = [];
    for (let i = 0; i < daysArray?.length; i += 7) {
      weeksArray.push(daysArray.slice(i, i + 7));
    }

    const today = new Date();
    const todayStr = today.toDateString();

    return (
      <div className="border border-gray-300 rounded-md shadow-md py-1">
        {weeksArray.map((week, weekIndex) => (
          <div key={weekIndex} className="flex">
            {week.map((day, dayIndex) => {
              const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day || 0);
              const dayName = daysOfWeek[date.getDay()];
              const dateStr = date.toDateString();

              const isSelected = selectedDates.some(d => d.toDateString() === dateStr);
              const isToday = dateStr === todayStr;

              return (
                <div
                  key={dayIndex}
                  onClick={() => day && handleDateChange(date)}
                  className={`cursor-pointer w-[82px] h-[42px] px-3 py-1.5 text-center hover:bg-[#eeeeee] ${isSelected ? 'bg-[#b0d5fa] text-white' : 'text-gray-700'
                    } ${isToday ? 'bg-[#b0d5fa] text-white' : ''}`}
                  name='dayName'
                >
                  {day !== null ? `${dayName}` : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };



  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      // validationSchema={vehicleValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleSubmit: formikSubmit,
      }) => (
        <Container>
          <div className="">
            <>


              <Header>
                <div>
                  <BreadCrumbs
                    backNavi={() => navigate(ROUTES.INSPECTIONS)}
                    breadCrumbs={[
                      {
                        name: 'Inspection List',
                        path: ROUTES.INSPECTIONS_FORMS_LIST,
                      },
                      {
                        name: 'Add Inspection Form',
                        path: ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                      },
                      {
                        name: ' Add Vehicles & Schedules',
                        path: ROUTES.INSPECTIONS_WORKSHOP,
                      },
                    ]}
                  />
                  <Heading>{id ? 'Edit' : 'Add'} Vehicles & Schedules</Heading>

                </div>
                <ButtonContainer>
                  <Button
                    type={BUTTON_TYPES.SECONDARY}
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type={BUTTON_TYPES.PRIMARY}
                    onClick={formikSubmit}
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
                <div className="width90">
                  <div className="add-v-form-section    w100 add-edit-user-card">

                    <div className="text-[#002850] flex mt-3 text-[18px] font-semibold">Add Rule or Manual Override</div>
                    <div className="text-[16px] ">
                      Add a rule to enable this form for all vehicles, or for a set of
                      vehicles by attribute (e.g. Type, Group). Use a manual override to
                      ignore rules for specific vehicles.
                    </div>
                    <div className="form-content flex  text-[14px] items-center">
                      {Object.keys(radioLabelMap).map((radioId) => (
                        <div
                          key={radioId}
                          className={`radio-box w-[351px] h-[47px] border rounded-md flex-1 items-center mr-2 p-2 pt-3 ${values.selectedRadio === radioId ? 'bg-blue-100 border-blue-500' : ''}`}
                        >
                          <label
                            htmlFor={radioId}
                            className="flex items-center w-full cursor-pointer justify-between"
                          >
                            <div>
                              <input
                                type="radio"
                                id={radioId}
                                name="radioGroup"
                                checked={values.selectedRadio === radioId}
                                onChange={(e) => setFieldValue("selectedRadio", e.target.id)}

                                className={`mr-2 ${values.selectedRadio === radioId ? 'accent-blue-500' : ''} cursor-pointer`}
                              />
                              <span>{radioLabelMap[radioId]}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {values.selectedRadio === 'All Vehicles' && (
                    <>

                      <div className="bg-[#E9F7FF] px-4 py-2  border-t-[7px] border-t-[#256EB5] rounded-md add-v-form-section pt-43 w100 add-edit-user-card">
                        This rule enables the inspection form for all vehicles. The
                        form will also be enabled for any new vehicles added to the
                        account. Use multiple rules to apply different schedules to
                        different vehicles by attribute, or use manual overrides to
                        ignore rules for specific vehicles.
                      </div>

                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="text-[18px] text-[#002850] font-semibold">Set Schedule</div>
                        <div className="text-[16px] ">
                          Enable a time-tracked inspection schedule for the above
                          vehicles. If unchecked, the form will still be available to
                          these Vehicles on an “as needed” basis.
                        </div>
                        <div className="flex items-center ">
                          <Checkbox
                            id="isScheduleEnabled"
                            name="isScheduleEnabled"
                            checked={isScheduleEnabled}
                            onCheckedChange={(checked) => setIsScheduleEnabled(checked)}
                            className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />

                          <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Set Schedule{' '}
                          </label>
                        </div>
                        {isScheduleEnabled && (
                          <>
                            {' '}
                            <div className="text-[#002850] font-semibold">
                              How often should this schedule repeat?
                            </div>
                            <div className="w-[250px] flex justify-between text-sm ">
                              <span>Frequency </span>
                              <span>Every</span>
                            </div>
                            <div className="w-[335px] flex justify-between ">
                              <FormikDropdown
                                key="frequency"
                                name="frequency"
                                // endpoint="v2/vehicle/all-vehicle-numbers"
                                placeholder="Select"
                                options={frequency}
                                limit={5}
                                defaultValue={values?.frequency}
                                // isRequired={true}
                                //  callback={handleAssetChange}
                                // isDisabled={!values?.assetType}
                                callback={(selectedOption) => {
                                  handleFrequencyChange(selectedOption);
                                  setFieldValue('frequency', selectedOption.value);
                                  console.log(selectedOption.value)

                                }}
                                value={values.frequency}
                                className="w-[193px] h-[47px] mr-4"
                              />

                              <span className=" w-[193px] h-[47px]  border border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                <span className="w-[193px] h-[47px] flex items-center text-gray-500 " name='days'>
                                  {days}
                                </span>
                                <div className="flex pb-1  flex-col">
                                  <button
                                    onClick={handleIncrease}
                                    aria-label="Increase"
                                    className=""
                                  >
                                    <ChevronUp className="text-gray-500" />
                                  </button>
                                  <button
                                    onClick={handleDecrease}
                                    aria-label="Decrease"
                                    className=" text-gray-700"
                                  >
                                    <ArrowDownIcon
                                      fill={'text-gray-700'}
                                      style={{ width: '15px', marginLeft: '5px' }}
                                    />
                                  </button>
                                </div>
                                <span className='text-[14px] text-gray-500 ml-3'>{frequencyUnit}</span>
                              </span>
                            </div>
                            {(selectedFrequency === 'Weekly' || selectedFrequency === 'Monthly') && (

                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className='w-[335px] '>
                                  <FormikDropdown


                                    key="specify"
                                    name="specify"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Anytime"
                                    options={specify}
                                    limit={5}
                                    defaultValue={values?.specify}
                                    callback={(selectedOption) => {
                                      handleSpecifyChange(selectedOption);
                                      setFieldValue('specify', selectedOption.value);
                                    }}
                                    value={values.specify}
                                    className="w-[272px] h-[40px] mr-4 text-sm"

                                  />
                                </div>
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Weekly' && (
                                  <div className="w-[600px]  ">

                                    <div className="flex ">
                                      {/* Parent div with rounded corners */}
                                      <div className="flex overflow-x-auto bg-gray-100 rounded-md shadow-md mb-4">
                                        {daysOptions.map((day) => (
                                          <div
                                            key={day.value}
                                            name='weeklyFrequency'
                                            onClick={() => handleDayClick(day.value)}
                                            className={`cursor-pointer w-[80px] text-sm px-3 py-1.5 text-center ${selectedDays.includes(day.value) ? 'bg-[#256EB5] text-white' : 'bg-gray-200 text-gray-700'}`}
                                          >
                                            {day.label}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex flex-col ">
<div className='flex items-center'>
                                      <Checkbox
                                        id="isScheduleEnabled4"
                                        name="isScheduleEnabled4"
                                        checked={isScheduleEnabled4}
                                        onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                        className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      />
                                      <label
                                        htmlFor="isScheduleEnabled4"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        Allow early submission
                                        </label></div>
                                       <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>
                                     
                                    </div>
                                    {isScheduleEnabled4 && (
                                      <>
                                        
                                          <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 " name="early">
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                            </span>
                                      </>
                                    )}

                                  </div>
                                )}
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Monthly' && (
                                  <div className="w-[580px] ">
                                    <div className="flex mb-4  ">
                                      <div className="flex ">
                                        <label className='mr-6 '>
                                          <input
                                            type="radio"
                                            value="Calendar"
                                            checked={selectedView === 'Calendar'}
                                            onChange={() => setSelectedView('Calendar')}
                                            className='mr-2 cursor-pointer'
                                          />

                                          Date of month
                                        </label>
                                        <label className=''>
                                          <input
                                            type="radio"
                                            value="Week"
                                            checked={selectedView === 'Week'}
                                            onChange={() => setSelectedView('Week')}
                                            className='mr-2 cursor-pointer'
                                          />
                                          Day of week
                                        </label>
                                      </div>
                                    </div>

                                    {selectedView === 'Calendar' && (
                                      <div className="flex justify-center mb-4">
                                        {renderCalendarView()}
                                      </div>
                                    )}

                                    {selectedView === 'Week' && (
                                      <div className="flex justify-center mb-4">
                                        {renderWeekView()}
                                      </div>
                                    )}

                                    <div className="flex flex-col ">
                                      <div className='flex items-center'>
                                        <Checkbox
                                          id="isScheduleEnabled4"
                                          name="isScheduleEnabled4"
                                          checked={isScheduleEnabled4}
                                          onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                          className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="isScheduleEnabled4"
                                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          Allow early submission
                                        </label></div>
                                      <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>

                                    </div>

                                    {isScheduleEnabled4 && (
                                      <>

                                        <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 " name='earlyDate'>
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                )}

                              </>
                            )}
                            {(selectedFrequency === 'Yearly') && (
                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className="  w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                                  <DatePickerInput
                                    name="Yeardate"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('Yeardate', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                              </>
                            )} 
                            <div className="text-[#002850] font-semibold">Advance</div>
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled2"
                                name="isScheduleEnabled2"
                                checked={isScheduleEnabled2}
                                onCheckedChange={() => setIsScheduleEnabled2(!isScheduleEnabled2)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Set Delayed Start{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Set a delayed start for when this schedule should begin.
                              The next due date will always be in the future.
                            </div>
                            {isScheduleEnabled2 && (
                              <>
                                <div className="ml-8 ">Effective After</div>
                                <div className=" ml-8 w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                                  <DatePickerInput
                                    name="date"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('date', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                                <div className="ml-8 ">
                                  If you leave this date blank, we will use today.
                                </div>
                              </>
                            )}
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled3"
                                name="isScheduleEnabled3"
                                checked={isScheduleEnabled3}
                                onCheckedChange={() => setIsScheduleEnabled3(!isScheduleEnabled3)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled3"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Enable Reminder Notification{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Send a reminder notification to the currently assigned
                              vehicle operator ahead of the inspection’s due date.
                              Notifications are sent in the Account time zone. The
                              vehicle operator must have Inspection Reminders enabled in
                              Notification Settings.
                            </div>
                            {isScheduleEnabled3 && (
                              <>
                                <div className="flex  ml-8 font-medium w-[300px]">
                                  {' '}
                                  <span className="mr-4">Days before due date</span>
                                  <span>
                                    <LockKeyhole className="w-[14px] h-[14px] mt-1" />
                                  </span>{' '}
                                  <span className="ml-8">At</span>
                                </div>
                                <div className=" flex   ml-8">
                                  <span
                                    className={`mr-4 h-[47px] border border-[#C1C0C0]  rounded-md flex items-center py-2 ${selectedFrequency === 'Daily' ? 'bg-gray-200 cursor-not-allowed' : 'bg-white '}`}
                                  >
                                    <span className="flex items-center justify-between w-[273px] h-[47px] px-4">
                                      <span
                                        className="mr-2 text-gray-700 pr-10 w-[300px]"
                                        aria-label="Due"
                                        name='due'
                                      >
                                        {due}
                                       
                                      </span>
                                      <div className="flex flex-col">
                                        <button
                                          aria-label="Increase"
                                          className="flex items-center justify-center"
                                          onClick={handleIncreasee}
                                          disabled={selectedFrequency === 'Daily'}
                                        >
                                          <ChevronUp className="text-gray-500" />
                                        </button>
                                        <button
                                          onClick={handleDecreasee}
                                          aria-label="Decrease"
                                          className=" text-gray-700"
                                        >
                                          <ArrowDownIcon
                                            fill={'text-gray-700'}
                                            style={{ width: '15px', marginLeft: '5px' }}
                                          />
                                        </button>
                                      </div>
                                    </span>
                                  </span>

                                  <FormikDropdown
                                    key="time"
                                    name="time"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Select"
                                    options={timeDrop}
                                    limit={5}
                                    defaultValue={values?.timeDrop}
                                    // isRequired={true}
                                    //  callback={handleAssetChange}
                                    // isDisabled={!values?.assetType}
                                    className="w-[272px] h-[47px] mr-4"
                                  />
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="h-[150px]"></div>
                    </>
                  )}

                  {values.selectedRadio === 'By Vehicle Attribute' && (
                    <>
                      <div className="bg-[#E9F7FF] px-4 py-2  border-t-[7px] border-t-[#256EB5] rounded-md add-v-form-section pt-43 w100 add-edit-user-card" >
                        This rule enables the inspection form for a set of vehicles by
                        attribute (e.g. Type, Group). The form will be enabled for any
                        new vehicles matching the given attributes, and the form will
                        be disabled if the vehicle attributes are changed. Use
                        multiple rules to apply different schedules, or use manual
                        overrides to ignore rules for specific vehicles.
                      </div>
                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="text-[18px]  text-[#002850] font-semibold">Set Schedule</div>
                        <div className="text-[16px] ">
                          Enable a time-tracked inspection schedule for the above
                          vehicles. If unchecked, the form will still be available to
                          these Vehicles on an “as needed” basis.
                        </div>
                        {conditionsList.map((condition, index) => (
                          <React.Fragment key={index}>
                            <div className="flex  items-center  ">
                              <div className="flex items-center " style={{ width: '50%' }}>
                                {/* Separate Divs for 'group' and 'vehicle' */}
                                <div
                                  className={`flex items-center   border py-1.5 px-4  rounded-md cursor-pointer ${condition.type === 'vehicleGroup' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                                  style={{ width: '50%' }}
                                >
                                  <label
                                    className={`flex  ${condition.type === 'vehicleGroup' ? 'text-[#3661FA]' : ''}`}
                                  >
                                    <input
                                      type="radio"
                                      name={`condition-type-${index}`}
                                      value="vehicleGroup"
                                      checked={condition.type === 'vehicleGroup'}
                                      onChange={() =>
                                        handleConditionChange(index, 'type', 'vehicleGroup')
                                      }
                                      className={`mr-2 cursor-pointer ${condition.type === 'vehicleGroup' ? 'accent-[#3661FA]' : ''}`}
                                      style={{ width: '50%' }}
                                    />
                                    Group
                                  </label>
                                </div>
                                <div
                                  className={`flex  border py-1.5 px-4 rounded-md cursor-pointer ${condition.type === 'busServiceType' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                                  style={{ width: '50%' }}
                                >
                                  <label
                                    className={`flex items-center ${condition.type === 'busServiceType' ? 'text-[#3661FA]' : ''}`}
                                  >
                                    <input
                                      type="radio"
                                      name={`condition-type-${index}`}
                                      value="busServiceType"
                                      checked={condition.type === 'busServiceType'}
                                      onChange={() =>
                                        handleConditionChange(index, 'type', 'busServiceType')
                                      }
                                      className={`mr-2 cursor-pointer ${condition.type === 'busServiceType' ? 'accent-[#3661FA]' : ''}`}
                                    />
                                    Vehicle Type
                                  </label>
                                </div>
                              </div>
                              <div className=" flex text-[12px] pl-3 pr-1 items-center" style={{ width: '10%' }}>is any of</div>
                              {/* Conditionally render FormikAsyncDropdown based on the selected type */}
                              <div className="flex-row items-center -mt-1 " style={{ width: '30%' }}>
                                {!condition.type && (
                                  <FormikAsyncDropdown

                                    placeholder="Attribute"
                                    limit={5}
                                    isDisabled
                                    className="cursor-pointer"
                                  />
                                )}
                                {condition.type && (
                                  <FormikAsyncDropdown
                                    key={condition.type}

                                    name={`conditionsList.${index}.value`}
                                    placeholder="Attribute"
                                    id={condition.type}
                                    limit={5}
                                    defaultValue={condition.value}

                                    loadOptions={(inputValue) => {
                                      const type = condition.type;
                                      return conditions[type] || [];
                                    }}
                                    disabled={!condition.type}
                                  />
                                  
                                 
                                )
                                
                                
                                }
                                  
                        
                                
                              </div>
                              <div className='flex items-center mb-2'>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event from propagating to parent div
                                    handleDeleteCondition(index);
                                  }}
                                  className="text-red-500 ml-2 "
                                >
                                  <Trash2 />
                                </button>
                              </div>
                            </div>
                            {/* Render logic buttons between conditions */}
                            {index < conditionsList?.length - 1 && (
                              <div className="flex flex-col md:flex-row items-center ">
                                <button
                                  onClick={() => handleLogicClick('AND')}
                                  className={`px-3 py-1 rounded ${logic === 'AND' ? 'bg-[#002850] text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                  AND
                                </button>
                                <button
                                  onClick={() => handleLogicClick('OR')}
                                  className={`px-3 py-1 rounded ${logic === 'OR' ? 'bg-[#002850] text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                  OR
                                </button>
                              </div>
                            )}
                          </React.Fragment>
                        ))}


                        {/* Add Condition Button */}
                        {conditionsList?.length < 2 && (
                          <button
                            onClick={handleAddCondition}
                            className="flex items-center space-x-2 text-[#002850] "
                          >
                            <span>+ Add Condition</span>
                          </button>
                        )}

                        <div className="flex items-center ">
                          <Checkbox
                            id="isScheduleEnabled"
                            name="isScheduleEnabled"
                            checked={isScheduleEnabled}
                            onCheckedChange={() => setIsScheduleEnabled(!isScheduleEnabled)}
                            className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />

                          <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Set Schedule{' '}
                          </label>
                        </div>
                        {isScheduleEnabled && (
                          <>
                            {' '}
                            <div className="text-[#002850] font-semibold">
                              How often should this schedule repeat?
                            </div>
                            <div className="w-[250px] flex justify-between ">
                              <span>Frequency </span>
                              <span>Every</span>
                            </div>
                            <div className="w-[335px] flex justify-between ">
                              <FormikDropdown
                                key="frequency"
                                name="frequency"
                                // endpoint="v2/vehicle/all-vehicle-numbers"
                                placeholder="Select"
                                options={frequency}
                                limit={5}
                                defaultValue={values?.frequency}
                                // isRequired={true}
                                //  callback={handleAssetChange}
                                // isDisabled={!values?.assetType}
                                callback={(selectedOption) => {
                                  handleFrequencyChange(selectedOption);
                                  setFieldValue('frequency', selectedOption.value);
                                  console.log(selectedOption.value)

                                }}
                                value={values.frequency}
                                className="w-[193px] h-[47px] mr-4"
                              />

                              <span className=" w-[193px] h-[47px]  border border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                  {days}
                                </span>
                                <div className="flex pb-1  flex-col">
                                  <button
                                    onClick={handleIncrease}
                                    aria-label="Increase"
                                    className=""
                                  >
                                    <ChevronUp className="text-gray-500" />
                                  </button>
                                  <button
                                    onClick={handleDecrease}
                                    aria-label="Decrease"
                                    className=" text-gray-700"
                                  >
                                    <ArrowDownIcon
                                      fill={'text-gray-700'}
                                      style={{ width: '15px', marginLeft: '5px' }}
                                    />
                                  </button>
                                </div>
                                <span className='text-[14px] text-gray-500 ml-3'>{frequencyUnit}</span>
                              </span>
                            </div>
                            {(selectedFrequency === 'Weekly' || selectedFrequency === 'Monthly') && (

                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className='w-[335px] '>
                                  <FormikDropdown


                                    key="specify"
                                    name="specify"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Anytime"
                                    options={specify}
                                    limit={5}
                                    defaultValue={values?.specify}
                                    callback={(selectedOption) => {
                                      handleSpecifyChange(selectedOption);
                                      setFieldValue('specify', selectedOption.value);
                                    }}
                                    value={values.specify}
                                    className="w-[272px] h-[40px] mr-4 text-sm"

                                  />
                                </div>
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Weekly' && (
                                  <div className="w-[600px]  ">

                                    <div className="flex ">
                                      {/* Parent div with rounded corners */}
                                      <div className="flex overflow-x-auto bg-gray-100 rounded-md shadow-md mb-4">
                                        {daysOptions.map((day) => (
                                          <div
                                            key={day.value}
                                            onClick={() => handleDayClick(day.value)}
                                            className={`cursor-pointer w-[80px] text-sm px-3 py-1.5 text-center  ${selectedDays.includes(day.value) ? 'bg-[#256EB5] text-white' : 'bg-gray-200 text-gray-700'}`}
                                          >
                                            {day.label}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex flex-col ">
                                      <div className='flex items-center'>
                                        <Checkbox
                                          id="isScheduleEnabled4"
                                          name="isScheduleEnabled4"
                                          checked={isScheduleEnabled4}
                                          onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                          className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="isScheduleEnabled4"
                                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          Allow early submission
                                        </label></div>
                                      <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>

                                    </div>
                                    {isScheduleEnabled4 && (
                                      <>

                                        <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                        </span>
                                      </>
                                    )}

                                  </div>
                                )}
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Monthly' && (
                                  <div className="w-[580px] ">
                                    <div className="flex mb-4  ">
                                      <div className="flex ">
                                        <label className='mr-6 '>
                                          <input
                                            type="radio"
                                            value="Calendar"
                                            checked={selectedView === 'Calendar'}
                                            onChange={() => setSelectedView('Calendar')}
                                            className='mr-2 cursor-pointer'
                                          />

                                          Date of month
                                        </label>
                                        <label className=''>
                                          <input
                                            type="radio"
                                            value="Week"
                                            checked={selectedView === 'Week'}
                                            onChange={() => setSelectedView('Week')}
                                            className='mr-2 cursor-pointer'
                                          />
                                          Day of week
                                        </label>
                                      </div>
                                    </div>

                                    {selectedView === 'Calendar' && (
                                      <div className="flex justify-center mb-4">
                                        {renderCalendarView()}
                                      </div>
                                    )}

                                    {selectedView === 'Week' && (
                                      <div className="flex justify-center mb-4">
                                        {renderWeekView()}
                                      </div>
                                    )}

                                    <div className="flex flex-col ">
                                      <div className='flex items-center'>
                                        <Checkbox
                                          id="isScheduleEnabled4"
                                          name="isScheduleEnabled4"
                                          checked={isScheduleEnabled4}
                                          onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                          className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="isScheduleEnabled4"
                                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          Allow early submission
                                        </label></div>
                                      <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>

                                    </div>

                                    {isScheduleEnabled4 && (
                                      <>

                                        <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                )}

                              </>
                            )}
                            {(selectedFrequency === 'Yearly') && (
                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className="  w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                                  <DatePickerInput
                                    name="Yeardate"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('Yeardate', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                              </>
                            )} 
                            <div className="text-[#002850] font-semibold">Advance</div>
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled2"
                                name="isScheduleEnabled2"
                                checked={isScheduleEnabled2}
                                onCheckedChange={() => setIsScheduleEnabled2(!isScheduleEnabled2)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Set Delayed Start{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Set a delayed start for when this schedule should begin.
                              The next due date will always be in the future.
                            </div>
                            {isScheduleEnabled2 && (
                              <>
                                <div className="ml-8 ">Effective After</div>
                                <div className=" ml-8 w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                                  <DatePickerInput
                                    name="date"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('date', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                                <div className="ml-8 ">
                                  If you leave this date blank, we will use today.
                                </div>
                              </>
                            )}
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled3"
                                name="isScheduleEnabled3"
                                checked={isScheduleEnabled3}
                                onCheckedChange={() => setIsScheduleEnabled3(!isScheduleEnabled3)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled3"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Enable Reminder Notification{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Send a reminder notification to the currently assigned
                              vehicle operator ahead of the inspection’s due date.
                              Notifications are sent in the Account time zone. The
                              vehicle operator must have Inspection Reminders enabled in
                              Notification Settings.
                            </div>
                            {isScheduleEnabled3 && (
                              <>
                                <div className="flex  ml-8 font-medium w-[300px]">
                                  {' '}
                                  <span className="mr-4">Days before due date</span>
                                  <span>
                                    <LockKeyhole className="w-[14px] h-[14px] mt-1" />
                                  </span>{' '}
                                  <span className="ml-8">At</span>
                                </div>
                                <div className=" flex   ml-8">
                                  <span
                                    className={`mr-4 h-[47px] border border-[#C1C0C0] bg-[#EFEEEE] rounded-md flex items-center py-2 ${selectedFrequency === 'Daily' ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                  >
                                    <span className="flex items-center justify-between w-[273px] h-[47px] px-4">
                                      <span
                                        className="mr-2 text-gray-700 pr-10 w-[300px]"
                                        aria-label="Due"
                                      >
                                        {due}
                                      </span>
                                      <div className="flex flex-col">
                                        <button
                                          aria-label="Increase"
                                          className="flex items-center justify-center"
                                          onClick={handleIncreasee}
                                          disabled={selectedFrequency === 'Daily'}
                                        >
                                          <ChevronUp className="text-gray-500" />
                                        </button>
                                        <button
                                          onClick={handleDecreasee}
                                          aria-label="Decrease"
                                          className=" text-gray-700"
                                        >
                                          <ArrowDownIcon
                                            fill={'text-gray-700'}
                                            style={{ width: '15px', marginLeft: '5px' }}
                                          />
                                        </button>
                                      </div>
                                    </span>
                                  </span>

                                  <FormikDropdown
                                    key="time"
                                    name="time"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Select"
                                    options={timeDrop}
                                    limit={5}
                                    defaultValue={values?.timeDrop}
                                    // isRequired={true}
                                    //  callback={handleAssetChange}
                                    // isDisabled={!values?.assetType}
                                    className="w-[272px] h-[47px] mr-4"
                                  />
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      <div className="h-[150px]"></div>
                    </>
                  )}

                  {values.selectedRadio === 'Specific Vehicle' && (
                    <>
                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="bg-[#E9F7FF] px-4 py-2  border-t-[7px] border-t-[#256EB5] rounded-md" >
                          This manual override will enable the form for specific
                          vehicles, ignoring any rules which would otherwise apply. A
                          manual override to disable the form can be applied by clicking
                          Update Schedule Manually for any specific vehicle.
                        </div>
                        <div className=" border py-4 px-5 rounded-md">
                        <CustomOptionSelectAsync
                          label="Vehicles"
                          placeholder="Select"
                          name="vehicleNumber"
                          isRequired
                          endpoint="v2/vehicle/all-vehicle-numbers"
                          callback={(selectedOption) =>
                            handleDropdownChange(selectedOption, {
                              setFieldValue,
                              values,
                            })
                          }
                        />
                        </div></div>
                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="text-[18px]  text-[#002850] font-semibold">Set Schedule</div>
                        <div className="text-[16px] ">
                          Enable a time-tracked inspection schedule for the above
                          vehicles. If unchecked, the form will still be available to
                          these Vehicles on an “as needed” basis.
                        </div>
                        <div className="flex items-center ">
                          <Checkbox
                            id="isScheduleEnabled"
                            name="isScheduleEnabled"
                            checked={isScheduleEnabled}
                            onCheckedChange={() => setIsScheduleEnabled(!isScheduleEnabled)}
                            className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />

                          <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Set Schedule{' '}
                          </label>
                        </div>
                        {isScheduleEnabled && (
                          <>
                            {' '}
                            <div className="text-[#002850] font-semibold">
                              How often should this schedule repeat?
                            </div>
                            <div className="w-[250px] flex justify-between ">
                              <span>Frequency </span>
                              <span>Every</span>
                            </div>
                            <div className="w-[335px] flex justify-between ">
                              <FormikDropdown
                                key="frequency"
                                name="frequency"
                                // endpoint="v2/vehicle/all-vehicle-numbers"
                                placeholder="Select"
                                options={frequency}
                                limit={5}
                                defaultValue={values?.frequency}
                                // isRequired={true}
                                //  callback={handleAssetChange}
                                // isDisabled={!values?.assetType}
                                callback={(selectedOption) => {
                                  handleFrequencyChange(selectedOption);
                                  setFieldValue('frequency', selectedOption.value);
                                  console.log(selectedOption.value)

                                }}
                                value={values.frequency}
                                className="w-[193px] h-[47px] mr-4"
                              />

                              <span className=" w-[193px] h-[47px]  border border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                  {days}
                                </span>
                                <div className="flex pb-1  flex-col">
                                  <button
                                    onClick={handleIncrease}
                                    aria-label="Increase"
                                    className=""
                                  >
                                    <ChevronUp className="text-gray-500" />
                                  </button>
                                  <button
                                    onClick={handleDecrease}
                                    aria-label="Decrease"
                                    className=" text-gray-700"
                                  >
                                    <ArrowDownIcon
                                      fill={'text-gray-700'}
                                      style={{ width: '15px', marginLeft: '5px' }}
                                    />
                                  </button>
                                </div>
                                <span className='text-[14px] text-gray-500 ml-3'>{frequencyUnit}</span>
                              </span>
                            </div>
                            {(selectedFrequency === 'Weekly' || selectedFrequency === 'Monthly') && (

                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className='w-[335px] '>
                                  <FormikDropdown


                                    key="specify"
                                    name="specify"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Anytime"
                                    options={specify}
                                    limit={5}
                                    defaultValue={values?.specify}
                                    callback={(selectedOption) => {
                                      handleSpecifyChange(selectedOption);
                                      setFieldValue('specify', selectedOption.value);
                                    }}
                                    value={values.specify}
                                    className="w-[272px] h-[40px] mr-4 text-sm"

                                  />
                                </div>
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Weekly' && (
                                  <div className="w-[600px]  ">

                                    <div className="flex ">
                                      {/* Parent div with rounded corners */}
                                      <div className="flex overflow-x-auto bg-gray-100 rounded-md shadow-md mb-4">
                                        {daysOptions.map((day) => (
                                          <div
                                            key={day.value}
                                            onClick={() => handleDayClick(day.value)}
                                            className={`cursor-pointer w-[80px] text-sm px-3 py-1.5 text-center ${selectedDays.includes(day.value) ? 'bg-[#256EB5] text-white' : 'bg-gray-200 text-gray-700'}`}
                                          >
                                            {day.label}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex flex-col ">
                                      <div className='flex items-center'>
                                        <Checkbox
                                          id="isScheduleEnabled4"
                                          name="isScheduleEnabled4"
                                          checked={isScheduleEnabled4}
                                          onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                          className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="isScheduleEnabled4"
                                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          Allow early submission
                                        </label></div>
                                      <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>

                                    </div>
                                    {isScheduleEnabled4 && (
                                      <>

                                        <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                        </span>
                                      </>
                                    )}

                                  </div>
                                )}
                                {selectedSpecify === 'On a Specific Day' && selectedFrequency === 'Monthly' && (
                                  <div className="w-[580px] ">
                                    <div className="flex mb-4  ">
                                      <div className="flex ">
                                        <label className='mr-6 '>
                                          <input
                                            type="radio"
                                            value="Calendar"
                                            checked={selectedView === 'Calendar'}
                                            onChange={() => setSelectedView('Calendar')}
                                            className='mr-2 cursor-pointer'
                                          />

                                          Date of month
                                        </label>
                                        <label className=''>
                                          <input
                                            type="radio"
                                            value="Week"
                                            checked={selectedView === 'Week'}
                                            onChange={() => setSelectedView('Week')}
                                            className='mr-2 cursor-pointer'
                                          />
                                          Day of week
                                        </label>
                                      </div>
                                    </div>

                                    {selectedView === 'Calendar' && (
                                      <div className="flex justify-center mb-4">
                                        {renderCalendarView()}
                                      </div>
                                    )}

                                    {selectedView === 'Week' && (
                                      <div className="flex justify-center mb-4">
                                        {renderWeekView()}
                                      </div>
                                    )}

                                    <div className="flex flex-col ">
                                      <div className='flex items-center'>
                                        <Checkbox
                                          id="isScheduleEnabled4"
                                          name="isScheduleEnabled4"
                                          checked={isScheduleEnabled4}
                                          onCheckedChange={() => setIsScheduleEnabled4(!isScheduleEnabled4)}
                                          className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="isScheduleEnabled4"
                                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          Allow early submission
                                        </label></div>
                                      <div className='flex items-center ml-8 text-sm text-gray-400'>Allows users to submit inspections early and still satisfy the required due date.</div>

                                    </div>

                                    {isScheduleEnabled4 && (
                                      <>

                                        <div className='ml-8 text-sm mt-2'>Days Early</div>
                                        <span className=" w-[120px] h-[47px] ml-8 border mt-2 border-[#f0e8e8] rounded-md flex items-center justify-end px-5">
                                          <span className="w-[193px] h-[47px] flex items-center text-gray-500 ">
                                            {earlyDate}
                                          </span>
                                          <div className="flex pb-1  flex-col">
                                            <button
                                              onClick={handleIncreasedelay}
                                              aria-label="Increase"
                                              className=""
                                            >
                                              <ChevronUp className="text-gray-500" />
                                            </button>
                                            <button
                                              onClick={handleDecreasedelay}
                                              aria-label="Decrease"
                                              className=" text-gray-700"
                                            >
                                              <ArrowDownIcon
                                                fill={'text-gray-700'}
                                                style={{ width: '15px', marginLeft: '5px' }}
                                              />
                                            </button>
                                          </div>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                )}

                              </>
                            )}
                            {(selectedFrequency === 'Yearly') && (
                              <>
                                <div className=''>When can this form be submitted?
                                </div>
                                <div className='text-sm'> {`${selectedFrequency} Submission Schedule`}</div>
                                <div className="  w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                                  
                                  <DatePickerInput
                                    name="Yeardate"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('Yeardate', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                              </>
                            )} 
                            <div className="text-[#002850] font-semibold">Advance</div>
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled2"
                                name="isScheduleEnabled2"
                                checked={isScheduleEnabled2}
                                onCheckedChange={() => setIsScheduleEnabled2(!isScheduleEnabled2)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Set Delayed Start{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Set a delayed start for when this schedule should begin.
                              The next due date will always be in the future.
                            </div>
                            {isScheduleEnabled2 && (
                              <>
                                <div className="ml-8 ">Effective After</div>
                                <div className=" ml-8 w-[235px]  flex justify-between  border border-[#A39E9E] rounded-md">
                              
                                  <DatePickerInput
                                    name="date"
                                    defaultValue={newDate}
                                    isRequired
                                    callback={(e) => {
                                      setFieldValue('date', new Date(e));
                                    }}

                                    placeholder="Enter due date"
                                    minDate={new Date(new Date())}
                                    useFormik={false}
                                  />
                                </div>
                                <div className="ml-8 ">
                                  If you leave this date blank, we will use today.
                                </div>
                              </>
                            )}
                            <div className="flex items-center ">

                              <Checkbox
                                id="isScheduleEnabled3"
                                name="isScheduleEnabled3"
                                checked={isScheduleEnabled3}
                                onCheckedChange={() => setIsScheduleEnabled3(!isScheduleEnabled3)}
                                className="w-6 h-6  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="isScheduleEnabled3"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Enable Reminder Notification{' '}
                              </label>
                            </div>
                            <div className="ml-8 ">
                              Send a reminder notification to the currently assigned
                              vehicle operator ahead of the inspection’s due date.
                              Notifications are sent in the Account time zone. The
                              vehicle operator must have Inspection Reminders enabled in
                              Notification Settings.
                            </div>
                            {isScheduleEnabled3 && (
                              <>
                                <div className="flex  ml-8 font-medium w-[300px]">
                                  {' '}
                                  <span className="mr-4">Days before due date</span>
                                  <span>
                                    <LockKeyhole className="w-[14px] h-[14px] mt-1" />
                                  </span>{' '}
                                  <span className="ml-8">At</span>
                                </div>
                                <div className=" flex   ml-8">
                                  <span
                                    className={`mr-4 h-[47px] border border-[#C1C0C0] bg-[#EFEEEE] rounded-md flex items-center py-2 ${selectedFrequency === 'Daily' ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                  >
                                    <span className="flex items-center justify-between w-[273px] h-[47px] px-4">
                                      <span
                                        className="mr-2 text-gray-700 pr-10 w-[300px]"
                                        aria-label="Due"
                                      >
                                        {due}
                                      </span>
                                      <div className="flex flex-col">
                                        <button
                                          aria-label="Increase"
                                          className="flex items-center justify-center"
                                          onClick={handleIncreasee}
                                          disabled={selectedFrequency === 'Daily'}
                                        >
                                          <ChevronUp className="text-gray-500" />
                                        </button>
                                        <button
                                          onClick={handleDecreasee}
                                          aria-label="Decrease"
                                          className=" text-gray-700"
                                        >
                                          <ArrowDownIcon
                                            fill={'text-gray-700'}
                                            style={{ width: '15px', marginLeft: '5px' }}
                                          />
                                        </button>
                                      </div>
                                    </span>
                                  </span>

                                  <FormikDropdown
                                    key="time"
                                    name="time"
                                    // endpoint="v2/vehicle/all-vehicle-numbers"
                                    placeholder="Select"
                                    options={timeDrop}
                                    limit={5}
                                    defaultValue={values?.timeDrop}
                                    // isRequired={true}
                                    //  callback={handleAssetChange}
                                    // isDisabled={!values?.assetType}
                                    className="w-[272px] h-[47px] mr-4"
                                  />
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="h-[150px]"></div>
                    </>
                  )}
                </div>
              </div>
            </>
          </div>
        </Container>

      )}
    </Formik>
  );
};

export default AddVehicle;