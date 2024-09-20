import React, { useState, useEffect } from 'react';
import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
  InputsContainer,
  Section,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import Swal from 'sweetalert2';
import { ROUTES } from '@/constants/route.constant';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { getApi, patchApi, postApi } from '@/services/method';
import Button from '@/components/common/Button/Button';
import { Formik } from 'formik';
import RouteInformations from '../../Route/RouteInformation';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import {
  startSpcaeRemover,
  validateMobileNumber,
  validateNumbers,
  validateNumberswiothoutzero,
} from '@/utils/common.helper';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import '../AddEditFuleCharging/style.css';

const initialValues = {
  vehicleNumber: '',
  route: '',
  distance: '',
  tripCount: 0,
  isActive: '',
  odometerReading: {
    last: '',
    current: '',
    digital: '',
  },
  fuel: {
    rate: '',
    quantity: '',
  },
  mileage: '',
};

const validationSchema = Yup.object({
  fuel: Yup.object().shape({
    quantity: Yup.string()
      // .matches(/^\d{1,3}$/)
      .required('Fuel quantity is required')
      // .min(1, 'This field must be greater than zero'),
      .min(0.01, 'Fuel quantity cannot be zero')
      .max(999, 'Fuel quantity must be less than 999'),
  }),
  vehicleNumber: Yup.string().required('Please select a Vehicle'), // This enforces the validation
  // Add other fields and their validations here
});
const AddEditCharging = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false); // Default is false
  const [showvehical, setShowVehicalFields] = useState(true); // Default is false
  const [selectedVehicleData, setSelectedVehicleData] = useState(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [fieldInfo, setFieldValue] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [timetableData, setTimetableData] = useState({});
  const [routeDetails, setRouteDetails] = useState({});
  const [selectedFormik, setSelectedFormik] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setShowVehicalFields(false); // Hide the dropdown when editing
      setShowAdditionalFields(true); // Show the form when editing
      getApi(APIS.FUELANDCHAGING, id)
        .then((res) => {
          const editData = res?.data;

          // setFieldValue('fuel.rate', editData?.fuel?.rate || '');
          const fuelRate =
            routeInfo.find((item) => item.title === 'Fuel Rate (L)')?.value ||
            editData.fuel.rate;
          const route =
            routeInfo.find((item) => item.title === 'Route')?.value ||
            editData.route;
          const distance =
            routeInfo.find((item) => item.title === 'Total Distance (Km)')
              ?.value || editData.distance;
          const tripCount =
            routeInfo.find((item) => item.title === 'Trip Count')?.value ||
            editData.tripCount;
          // const odometerLastReading = editData?.odometerReading?.last || '';
          const lastodometer =
            routeInfo.find((item) => item.title === 'Last Odometer Reading')
              ?.value || editData.odometerReading.last;

          // Populate form with fetched data
          setData((prev) => ({
            ...prev,
            vehicleNumber: editData?.vehicleNumber,
            route: route,
            distance: distance,
            tripCount: tripCount,
            odometerReading: {
              last: lastodometer,
              current: editData?.odometerReading?.current,
              digital: editData?.odometerReading?.digital,
            },
            fuel: {
              rate: fuelRate || '',
              quantity: editData?.fuel?.quantity,
            },
            mileage: editData?.mileage,
            isActive: editData?.isActive,
          }));

          const value = editData.vehicleNumber;

          if (editData.vehicleNumber) {
            // Call the API with the selected vehicle ID
            getApi(`${APIS.FUELANDCHAGING}/vehicle/${value}`)
              .then((res) => {
                const vehicleData = res.data;
                const timetableData = vehicleData.vehicaltimetable;
                const routeDetails = vehicleData.routedetails;

                setSelectedVehicleData(vehicleData);
                // console.log(
                //   'route details api: ',
                //   vehicleData.fuelratedetails[0].fuelRates
                // );
                // // Assuming fuelRates is an array within vehicleData
                // const latestFuelRate = vehicleData.fuelratedetails?.[0]?.fuelRates;

                // Check if fuelratedetails and fuelRates exist
                const fuelRateDetails = vehicleData.fuelratedetails?.[0];

                const fuelRates = fuelRateDetails?.fuelRates || [];

                // Extract the latest Fuel Rate (L)from the fuelRates array
                // const latestFuelRate =
                //   fuelRates.length > 0 ? fuelRates[0].rate : '0';

                const latestFuelRate =
                  fuelRates.length > 0 ? `${fuelRates[0].rate}/l` : '0/l';

                // const latestFuelRate = fuelRates.length > 0 ? fuelRates[0].rate : '0/l';

                // Extract route details
                const routename = routeDetails.name || '-';
                // const inbounddistance =
                // ` ${ routeDetails.inbound?.services?.[0]?.distance } km`?? '0 km';
                // const outbounddistance =
                //   `${routeDetails.outbound?.services?.[0]?.distance} km` ?? '0 km';
                const inbounddistance = `${routeDetails.inbound?.services?.[0]?.distance ?? '0'} km`;
                const outbounddistance = `${routeDetails.outbound?.services?.[0]?.distance ?? '0'} km`;

                const vehicaltype =
                  vehicleData.vehical?.[0]?.identification?.fuelTypeId?.name
                    .english;
                const distance = vehicleData.routedetails?.name;
                // const vhicallastodometer = vehicleData.odometerReading?.last || 0;

                // Update routeInfo with the response data
                setRouteInfo([
                  {
                    title: 'TimeTable Date & Time',
                    value: timetableData?.startDate
                      ? new Date(timetableData.startDate).toLocaleString()
                      : '-',
                  },
                  {
                    title: 'Inbound',
                    value: routeDetails.isInbound ? 'Yes' : 'No',
                  },
                  // {
                  //   title: 'Route',
                  //   value: routename ?? 'Not found', // Pre-fill with latest rate or "Not found"
                  //   className: 'hidden',
                  // },
                  // {
                  //   title: 'Fuel Rate (L) (L)',
                  //   value: latestFuelRate ?? 'Not found', // Pre-fill with latest rate or "Not found"
                  //   className: 'hidden',
                  // },
                  {
                    title: 'Inbound Distance (Km)',
                    value: inbounddistance,
                    // className: 'hidden',
                  },
                  {
                    title: 'Outbound Distance (Km)',
                    value: outbounddistance,
                    // className: 'hidden',
                  },
                  {
                    title: 'Frequency',
                    value: vehicleData.driversdetails?.[0]?.frequency ?? '-',
                  }, // Placeholder, replace with actual data if available

                  {
                    title: 'Origin District',
                    value:
                      routeDetails.inbound?.origin?.districtId?.name?.english ??
                      '-',
                  }, // Placeholder, replace with actual data if available
                  {
                    title: 'Destination District',
                    value:
                      routeDetails.inbound?.destination?.districtId?.name
                        ?.english ?? '-',
                  },
                  {
                    title: 'Driver',
                    value:
                      // vehicleData.driversdetails[0].drivers[0].driver.name.english || "N/A"
                      vehicleData.driversdetails?.[0]?.drivers?.[0]?.driver
                        ?.name?.english ?? '-',
                  }, // Placeholder, replace with actual data if available
                  {
                    title: 'Conductor',
                    value:
                      vehicleData.driversdetails?.[0]?.conductors?.[0]
                        ?.conductor?.name?.english ?? '-',
                  }, // Placeholder, replace with actual data if available
                  {
                    title: 'Average',
                    value: `${
                      vehicleData.fuelCharging?.[0]?.identification?.average ??
                      '0'
                    } km/l`,
                  },

                  // {
                  //   title: 'Last Odometer Reading',
                  //   value: vhicallastodometer,
                  // },
                  // {
                  //   title: 'Last Trip Status',
                  //   value: vehicleData.status ?? '-',
                  // },
                  {
                    title: 'Fuel Type',
                    value:
                      vehicleData.vehical?.[0]?.identification?.fuelTypeId?.name
                        .english ?? '-',
                  }, // Placeholder, replace with actual data if available
                ]);

                setFieldValue(
                  'fuel.rate',
                  latestFuelRate || editData?.fuel?.rate || ''
                );
              })
              .catch((err) => {
                toast.error('Failed to fetch vehicle data');
              });
          }
        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
          toast.error('Failed to load data');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  const handleDropdownChange = (selectedOption, formik) => {
    const value = selectedOption ? selectedOption.value : '';

    if (value) {
      setShowAdditionalFields(true);
      setShowVehicalFields(false);

      getApi(`${APIS.FUELANDCHAGING}/vehicle/${value}`)
        .then((res) => {
          const vehicleData = res.data;
          const timetableData = vehicleData.vehicaltimetable[0] || {};
          const routeDetails = vehicleData.routedetails || {};

          setVehicleData(vehicleData);
          setTimetableData(timetableData);
          setRouteDetails(routeDetails);
          setSelectedFormik(formik);

          if (!timetableData.startDate) {
            // Open the dialog if timetable data is missing
            setOpenDialog(true);
          } else {
            updateRouteInfo(vehicleData, timetableData, routeDetails);
          }
        })
        .catch((err) => {
          console.error('API error:', err);
          toast.error('Failed to fetch vehicle data');
          setRouteInfo([]);
        });
    } else {
      setShowAdditionalFields(false);
      setShowVehicalFields(true);
      setRouteInfo([]);
    }
  };
  const handleConfirm = () => {
    updateRouteInfo(vehicleData, timetableData, routeDetails);
  };

  const handleCancel = () => {
    // Ensure selectedFormik is not undefined
    if (selectedFormik) {
      selectedFormik.setFieldValue('vehicleNumber', '');
    }
    setShowAdditionalFields(false);
    setShowVehicalFields(true);
    setRouteInfo([]);
  };

  const updateRouteInfo = (vehicleData, timetableData, routeDetails) => {
    // Process Fuel Rate (L) details
    const fuelRateDetails = vehicleData.fuelratedetails?.[0] || {};
    const fuelRates = fuelRateDetails.fuelRates || [];
    const latestFuelRate =
      fuelRates.length > 0 ? `${fuelRates[0].rate}/l` : '0/l';

    // const latestFuelRate = fuelRates.length > 0 ? fuelRates[0].rate : '0/l';

    // Extract route details
    const routename = routeDetails.name || '-';
    // const inbounddistance =
    // ` ${ routeDetails.inbound?.services?.[0]?.distance } km`?? '0 km';
    // const outbounddistance =
    //   `${routeDetails.outbound?.services?.[0]?.distance} km` ?? '0 km';
    const inbounddistance = `${routeDetails.inbound?.services?.[0]?.distance ?? '0'} km`;
    const outbounddistance = `${routeDetails.outbound?.services?.[0]?.distance ?? '0'} km`;

    // Function to extract numeric value from the distance string
    const extractDistanceValue = (distance) => {
      if (typeof distance === 'string') {
        // Use regex to extract the numeric portion from the string
        const match = distance.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      }
      return 0;
    };

    const inboundValue = extractDistanceValue(inbounddistance);
    const outboundValue = extractDistanceValue(outbounddistance);

    const total = inboundValue + outboundValue;

    // const inbounddistance = routeDetails.inbound?.services?.[0]?.distance || '-';
    // const outbounddistance = routeDetails.outbound?.services?.[0]?.distance || '-';
    // const total = inbounddistance+outbounddistance;
    const tripcount = vehicleData.driversdetails?.[0]?.noOfTrips || '0';

    // Extract vehicle data
    const vhicallastodometer =
      vehicleData.vehicaldata?.[0]?.odometerReading?.current || '0';
    const mileage =
      vehicleData.vehical?.[0]?.specification?.mileage?.city || '0 km/l';

    // Update routeInfo with the response data
    setRouteInfo([
      {
        title: 'TimeTable Date & Time',
        value: timetableData.startDate
          ? new Date(timetableData.startDate).toLocaleString()
          : '-',
      },

      {
        title: 'Inbound',
        value: routeDetails.isInbound ? 'Yes' : 'No',
      },
      {
        title: 'Route',
        value: routename,
        className: 'hidden',
      },
      {
        title: 'Fuel Rate (L)',
        value: latestFuelRate,
        className: 'hidden',
      },
      {
        title: 'Inbound Distance (Km)',
        value: inbounddistance,
        // className: 'hidden',
      },
      {
        title: 'Outbound Distance (Km)',
        value: outbounddistance,
        // className: 'hidden',
      },
      {
        title: 'Total Distance (Km)',
        value: `${total} km`,
        className: 'hidden',
      },
      {
        title: 'Frequency',
        value: vehicleData.driversdetails?.[0]?.frequency || '-',
      },
      {
        title: 'Origin District',
        value: routeDetails.inbound?.origin?.districtId?.name?.english || '-',
      },
      {
        title: 'Destination District',
        value:
          routeDetails.inbound?.destination?.districtId?.name?.english || '-',
      },
      {
        title: 'Driver',
        value:
          vehicleData.driversdetails?.[0]?.drivers?.[0]?.driver?.name
            ?.english || '-',
      },
      {
        title: 'Conductor',
        value:
          vehicleData.driversdetails?.[0]?.conductors?.[0]?.conductor?.name
            ?.english || '-',
      },
      {
        title: 'Average',
        value: `${vehicleData.fuelCharging?.[0]?.identification?.average || '0'} km/l`,
      },

      // {
      //   title: 'Last Trip Status',
      //   value: vehicleData.status || '-',
      // },
      {
        title: 'Last Odometer Reading',
        value: vhicallastodometer,
        className: 'hidden',
      },
      {
        title: 'Trip Count',
        value: tripcount,
        className: 'hidden',
      },
      {
        title: 'Mileage (Km/l)',
        value: mileage,
        className: 'hidden',
      },
      {
        title: 'Fuel Type',
        value:
          vehicleData.vehical?.[0]?.identification?.fuelTypeId?.name.english ||
          '-',
      }, // Placeholder
    ]);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const fuelRate =
      routeInfo.find((item) => item.title === 'Fuel Rate (L)')?.value || '';

    const route = routeInfo.find((item) => item.title === 'Route')?.value || '';
    const distance =
      routeInfo.find((item) => item.title === 'Total Distance (Km)')?.value ||
      '';
    const tripcount =
      routeInfo.find((item) => item.title === 'Trip Count')?.value || '';
    const lastodometer =
      routeInfo.find((item) => item.title === 'Last Odometer Reading')?.value ||
      '';
    const mileage =
      routeInfo.find((item) => item.title === 'Mileage (Km/l)')?.value || '';

    const payload = {
      vehicleNumber: values.vehicleNumber,
      route: route,
      distance: distance,
      tripCount: tripcount,
      odometerReading: {
        // last: values.odometerReading.last,
        last: lastodometer,
        current: values.odometerReading.current,
        digital: values.odometerReading.digital,
      },
      fuel: {
        rate: fuelRate,
        quantity: values.fuel.quantity,
      },
      mileage: mileage,
      isActive: true,
    };
    if (values.fuel.rate) {
      payload.fuel.rate = values.fuel.rate;
    }
    if (values.route) {
      payload.route = values.route;
    }
    if (values.distance) {
      payload.distance = values.distance;
    }
    if (values.odometerReading.last) {
      payload.odometerReading.last = values.odometerReading.last;
    }
    if (values.tripCount) {
      payload.odometerReading.last = values.tripCount;
    }
    if (values.mileage) {
      payload.mileage = values.mileage;
    }

    if (id) {
      payload._id = id;
      patchApi(APIS.FUELANDCHAGING, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.FUELANDCHAGING, payload)
        .then(() => {
          toast.success('Data saved successfully');
          if (values?.saveAndNew) {
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
  };
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow(true);
  }
  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        setFieldValue,
        values,
        handleSubmit: formikSubmit,
      }) => (
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
                      boldItem={'Fuel & Charging'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Fuel & Charging</Heading>
                  </div>
                  <ButtonContainer>
                    <Button
                      type={BUTTON_TYPES.SECONDARY}
                      onClick={() => navigate(-1)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    {!id && (
                      <Button
                        type={BUTTON_TYPES.SECONDARY}
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
                      type={BUTTON_TYPES.PRIMARY}
                      onClick={formikSubmit}
                      loading={isSubmitting && !values?.saveAndNew}
                    >
                      {id ? 'Update' : 'Save'}
                    </Button>
                  </ButtonContainer>
                </Header>
                <div className="p-5 d-flex justify-center">
                  {showvehical && (
                    <div style={{ width: '290px' }}>
                      <div className=" w-100">
                        <FormikAsyncDropdown
                          label="Vehicle No"
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
                      </div>
                    </div>
                  )}
                </div>
                {showAdditionalFields && (
                  <div className="fuel-main-container">
                    <div className="fuel-container">
                      <div className="fuel-left-side-div">
                        <div className="w-100">
                          <FormikAsyncDropdown
                            label="Vehicle No"
                            placeholder="Select"
                            name="vehicleNumber"
                            isRequired
                            endpoint="v2/vehicle/all-vehicle-numbers"
                            callback={handleDropdownChange}
                          />
                        </div>
                        <div className="w-100">
                          <FormikTextField
                            label="Route"
                            placeholder="Enter route name"
                            name="route"
                            autocomplete="off"
                            value={
                              routeInfo.find((item) => item.title === 'Route')
                                ?.value || values.route
                            } // Provide a default empty string if not found
                            onChange={(e) =>
                              setFieldValue('route', e.target.value)
                            }
                            isDisabled
                          />
                        </div>
                        <div className="flue-type-2">
                          <div className="w-100">
                            <FormikTextField
                              label="Total Distance (Km)"
                              placeholder="Enter distance"
                              name="distance"
                              autocomplete="off"
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Total Distance (Km)'
                                )?.value || values.distance
                              }
                              onChange={(e) =>
                                setFieldValue('distance', e.target.value)
                              }
                              isDisabled
                            />
                          </div>
                          <div className="w-100">
                            <FormikTextField
                              label="Trip Count"
                              placeholder="Enter trip count"
                              name="tripCount"
                              autocomplete="off"
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Trip Count'
                                )?.value || values.tripCount
                              }
                              onChange={(e) =>
                                setFieldValue('tripCount', e.target.value)
                              }
                              isDisabled
                            />
                          </div>
                        </div>
                        <div className="flue-type-2">
                          <div className="w-100">
                            <FormikTextField
                              label="Last Odometer Reading"
                              placeholder="Enter last odometer reading"
                              name="odometerReading.last"
                              autocomplete="off"
                              value={
                                routeInfo.find(
                                  (item) =>
                                    item.title === 'Last Odometer Reading'
                                )?.value || values.odometerReading.last
                              }
                              onChange={(e) =>
                                setFieldValue(
                                  'odometerReading.last',
                                  e.target.value
                                )
                              }
                              isDisabled
                            />
                          </div>
                          <div className="w-100">
                            <FormikTextField
                              label="Current Odometer Reading"
                              placeholder="Enter current odometer reading"
                              name="odometerReading.current"
                              autocomplete="off"
                              onChange={(e) =>
                                validateNumberswiothoutzero(
                                  e,
                                  setFieldValue,
                                  'odometerReading.current'
                                )
                              }
                              isDisabled
                            />
                          </div>
                        </div>
                        <div className="flue-type-2">
                          <div className="w-100">
                            <FormikTextField
                              label="Fuel Quantity"
                              placeholder="Enter fuel quantity"
                              name="fuel.quantity"
                              autocomplete="off"
                              onChange={(e) =>
                                validateNumberswiothoutzero(
                                  e,
                                  setFieldValue,
                                  'fuel.quantity'
                                )
                              }
                              isDisabled
                              // isRequired={true}
                            />
                          </div>
                          <div className="w-100">
                            {/* <FormikTextField
                              label="Fuel Rate (L)"
                              placeholder="Enter Fuel Rate (L)"
                              name="
                              "
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Fuel Rate (L)'
                                )?.value || ''
                              } // Provide a default empty string if not found
                              onChange={(e) =>
                                setFieldValue('fuel.rate', e.target.value)
                              }
                              isDisabled
                            /> */}
                            <FormikTextField
                              label="Fuel Rate (L)"
                              placeholder="Enter Fuel Rate (L)"
                              name="fuel.rate"
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Fuel Rate (L)'
                                )?.value || values.fuel.rate
                              } // Ensure this matches Formik's values
                              onChange={(e) =>
                                setFieldValue('fuel.rate', e.target.value)
                              }
                              isDisabled
                            />

                            {/* <FormikTextField
                              label="Fuel Rate (L)"
                              placeholder="Enter Fuel Rate (L)"
                              name="fuel.rate" // Ensure this matches Formik's initialValues
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Fuel Rate (L)'
                                )?.value || ''
                              }
                              onChange={
                                (e) => setFieldValue('fuelRate', e.target.value) // Ensure this matches Formik's name
                              }
                              isDisabled
                            /> */}
                          </div>
                        </div>
                        <div className="flue-type-2">
                          <div className="w-100">
                            <FormikTextField
                              label="Mileage (Km/l)"
                              placeholder="Enter mileage"
                              name="mileage"
                              autocomplete="off"
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Mileage (Km/l)'
                                )?.value || values.mileage
                              } // Ensure this matches Formik's values
                              onChange={(e) =>
                                setFieldValue('mileage', e.target.value)
                              }
                              isDisabled
                            />
                          </div>
                          <div className="w-100">
                            <FormikTextField
                              label="Digital Odometer Reading"
                              placeholder="Enter digital odometer reading"
                              name="odometerReading.digital"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="fuel-right-side-div">
                        <label className="to-label c-black">
                          TimeTable Information
                        </label>
                        {show && (
                          // <div className="fuel-right-side-div-wrapper">
                          //   {routeInfo.map((item, index) => (
                          //     <div className="fuel-info" key={index} className={info.className || ''}>
                          //       <div className="info-label heading-400-14">
                          //         {item.title}
                          //       </div>
                          //       <div className="info-value heading-400-14">
                          //         {item.value}
                          //       </div>
                          //     </div>
                          //   ))}
                          // </div>
                          <div className="fuel-right-side-div-wrapper">
                            {routeInfo.map((item, index) => (
                              <div
                                className={`fuel-info ${item.className || ''}`}
                                key={index}
                              >
                                <div className="info-label heading-400-14">
                                  {item.title}
                                </div>
                                <div className="info-value heading-400-14">
                                  {item.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default AddEditCharging;
