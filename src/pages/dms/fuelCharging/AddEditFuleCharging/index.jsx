
import React, { useState, useEffect, useContext } from 'react';
import {
  ButtonContainer,
  Container,
  Header,
  Heading,
} from '@/components/AddFormLayout/AddFormLayout';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { getApi, patchApi, postApi } from '@/services/method';
import Button from '@/components/common/Button/Button';
import { Formik } from 'formik';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import {
  validateNumberswiothoutzero,
  validatequantity
} from '@/utils/common.helper';
import './style.css';

import { CustomOptionSelectAsync } from '@/components/common/CustomSelect/CustomOptionSelect';
import PopupAlert from '@/components/common/PopupAlert/PopupAlert';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

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
      .required('Fuel quantity is required')
      .min(0.01, 'Fuel quantity cannot be zero')
      .max(999, 'Fuel quantity must be less than 999'),
  }),
  vehicleNumber: Yup.string().required('Please select a Vehicle'),
});

const AddEditCharging = () => {
  const navigate = useNavigate();
  const location = useLocation()
  
  const { id } = useParams();
  const [data, setData] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false); 
  const [showvehical, setShowVehicalFields] = useState(true); 
  const [selectedVehicleData, setSelectedVehicleData] = useState(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [fieldInfo, setFieldValue] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [timetableData, setTimetableData] = useState({});
  const [routeDetails, setRouteDetails] = useState({});
  const [selectedFormik, setSelectedFormik] = useState(null);
  const {setCount } = useContext(CounterContext);
  useEffect(() => { 
    setCount('Fuel & Charging');
  }, []);
  useEffect(() => {
    if (id) {
      setLoading(true);
      setShowVehicalFields(false);
      setShowAdditionalFields(true);
      getApi(APIS.FUELANDCHAGING, id)
        .then((res) => {
          const editData = res?.data;
          const fuelRate =
            routeInfo.find((item) => item.title === 'Fuel Rate (per liter)')?.value ||
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
          const lastodometer =
            routeInfo.find((item) => item.title === 'Last Odometer Reading')
              ?.value || editData.odometerReading.last;

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
            getApi(`${APIS.FUELANDCHAGING}/vehicle/${value}`)
              .then((res) => {
                const vehicleData = res.data;
                const timetableData = vehicleData.vehicaltimetable;
                const routeDetails = vehicleData.routedetails;

                setSelectedVehicleData(vehicleData);
                const fuelRateDetails = vehicleData.fuelratedetails?.[0];

                const fuelRates = fuelRateDetails?.fuelRates || [];

                const latestFuelRate =
                  fuelRates.length > 0 ? `${fuelRates[0].rate}/l` : '0/l';
                const routename = routeDetails.name || '-';
                const inbounddistance = `${routeDetails.inbound?.services?.[0]?.distance ?? '0'} km`;
                const outbounddistance = `${routeDetails.outbound?.services?.[0]?.distance ?? '0'} km`;

                const vehicaltype =
                  vehicleData.vehical?.[0]?.identification?.fuelTypeId?.name
                    .english;
                const distance = vehicleData.routedetails?.name;
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
                  {
                    title: 'Inbound Distance (Km)',
                    value: inbounddistance,
                  },
                  {
                    title: 'Outbound Distance (Km)',
                    value: outbounddistance,
                  },
                  {
                    title: 'Frequency',
                    value: vehicleData.driversdetails?.[0]?.frequency ?? '-',
                  },
                  {
                    title: 'Origin District',
                    value:
                      routeDetails.inbound?.origin?.districtId?.name?.english ??
                      '-',
                  },
                  {
                    title: 'Destination District',
                    value:
                      routeDetails.inbound?.destination?.districtId?.name
                        ?.english ?? '-',
                  },
                  {
                    title: 'Driver',
                    value:
                      vehicleData.driversdetails?.[0]?.drivers?.[0]?.driver
                        ?.name?.english ?? '-',
                  },
                  {
                    title: 'Conductor',
                    value:
                      vehicleData.driversdetails?.[0]?.conductors?.[0]
                        ?.conductor?.name?.english ?? '-',
                  },
                  {
                    title: 'Average',
                    value: `${vehicleData.fuelCharging?.[0]?.identification?.average ??
                      '0'
                      } km/l`,
                  },
                  {
                    title: 'Fuel Type',
                    value:
                      vehicleData.vehical?.[0]?.identification?.fuelTypeId?.name
                        .english ?? '-',
                  },]);

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
    if (selectedFormik) {
      selectedFormik.setFieldValue('vehicleNumber', '');
    }
    setShowAdditionalFields(false);
    setShowVehicalFields(true);
    setRouteInfo([]);
  };

  const updateRouteInfo = (vehicleData, timetableData, routeDetails) => {
    const fuelRateDetails = vehicleData.fuelratedetails?.[0] || {};
    const fuelRates = fuelRateDetails.fuelRates || [];
    const latestFuelRate =
      fuelRates.length > 0 ? `${fuelRates[0].rate}` : '0';
    const routename = routeDetails.name || '-';
    const inbounddistance = `${routeDetails.inbound?.services?.[0]?.distance ?? '0'} km`;
    const outbounddistance = `${routeDetails.outbound?.services?.[0]?.distance ?? '0'} km`;
    const extractDistanceValue = (distance) => {
      if (typeof distance === 'string') {
        const match = distance.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      }
      return 0;
    };

    const inboundValue = extractDistanceValue(inbounddistance);
    const outboundValue = extractDistanceValue(outbounddistance);

    const total = inboundValue + outboundValue;
    const tripcount = vehicleData.driversdetails?.[0]?.noOfTrips || '0';
    const vhicallastodometer =
      vehicleData.vehicaldata?.[0]?.odometerReading?.current || '0';
    const mileage =
      vehicleData.vehical?.[0]?.specification?.mileage?.city || '0';
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
        title: 'Fuel Rate (per liter)',
        value: latestFuelRate,
        className: 'hidden',
      },
      {
        title: 'Inbound Distance',
        value: inbounddistance,
      },
      {
        title: 'Outbound Distance',
        value: outbounddistance,
      },
      {
        title: 'Total Distance (Km)',
        value: `${total}`,
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
      },
    ]);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const fuelRate =
      routeInfo.find((item) => item.title === 'Fuel Rate (per liter)')?.value || '';

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
                <PopupAlert open={openDialog}
                  setOpen={setOpenDialog}
                  title="Attention"
                  message="No timetable is currently available for the chosen vehicle. Are you sure to proceed?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  submitTxt='Yes'
                  cancelTxt='No' />
                <Header>
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(-1)}
                      breadCrumbs={[]}
                      boldItem={'Fuel & Charging'}
                    />
                    {location?.state?.isEditeActive === true ? <Heading>{id ? 'Edit' : 'Add'} Fuel & Charging</Heading> : <></>}
                  </div>{location?.state?.isEditeActive === true ?
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
                    </ButtonContainer> : ''}
                </Header>
                <div className="pt-5 d-flex justify-center">
                  {showvehical && (
                    <div className='width290'>
                      <div className=" w-100">
                        <CustomOptionSelectAsync
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
                          <CustomOptionSelectAsync
                            label="Vehicle No"
                            placeholder="Select"
                            name="vehicleNumber"
                            isRequired

                            isDisabled={location?.state?.isEditeActive === true ? false : true}
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
                            }
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
                              readOnly={location?.state?.isEditeActive === true ? false : true}
                              onChange={(e) =>
                                validateNumberswiothoutzero(
                                  e,
                                  setFieldValue,
                                  'odometerReading.current'
                                )
                              }
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
                              readOnly={location?.state?.isEditeActive === true ? false : true}
                              onChange={(e) =>
                                validatequantity(
                                  e,
                                  setFieldValue,
                                  'fuel.quantity'
                                )
                              }
                            />
                          </div>
                          <div className="w-100">

                            <FormikTextField
                              label="Fuel Rate (per liter)"
                              placeholder="Enter Fuel Rate (per liter)"
                              name="fuel.rate"
                              value={
                                routeInfo.find(
                                  (item) => item.title === 'Fuel Rate (per liter)'
                                )?.value || values.fuel.rate
                              }
                              onChange={(e) =>
                                setFieldValue('fuel.rate', e.target.value)
                              }
                              isDisabled
                            />


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
                              }
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
                              readOnly={location?.state?.isEditeActive === true ? false : true}
                              onChange={(e) =>
                                validateNumberswiothoutzero(
                                  e,
                                  setFieldValue,
                                  'odometerReading.digital'
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="fuel-right-side-div">
                        <label className="to-label c-black">
                          TimeTable Information
                        </label>
                        {show && (
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
