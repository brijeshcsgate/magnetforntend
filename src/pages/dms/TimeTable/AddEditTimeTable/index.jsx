import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import LoadingScreen from '@/components/LoadingScreen';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi } from '@/services/method';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TableView from './TableView';
import { toast } from 'react-toastify';
import { TimeTableService } from '@/services/TimeTableService';
import { Button } from '@/components/ui/button';
import apiService from '@/lib/apiService';
import { CustomSelect } from '@/components/common/CustomSelect';

const fetchData = async (inputValue, page) => {
  const limit = 15;
  const response = await apiService.get(`${APIS.GET_ALL_ROUTES}`, {
    params: {
      limit,
      page: page || 0,
      search: inputValue || null,
      sortBy: 'name',
      order: 'asc',
      timeTable: true,
    },
  });

  const routes = response.data.routes.map((route) => ({
    value: route._id,
    label: route.name,
    route: route,
  }));

  const totalCount = response.data.totalCount;
  const hasNextPage = page * limit < totalCount;

  return {
    results: routes,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

const fetchDrivers = async (inputValue, page) => {
  const limit = 15;
  const response = await apiService.get(`${APIS.DRIVER_CONDUCTOR}`, {
    params: {
      limit,
      page: 0,
      search: inputValue || null,
      sortBy: 'name',
      order: 'asc',
      staffType: 'Driver',
    },
  });

  const DRIVER = response.data.list.map((d) => ({
    value: d._id,
    label: d.name.english + ' (' + d.loginMobile + ')',
  }));

  return {
    results: DRIVER,
    nextPage: false,
  };
};

const fetchConductors = async (inputValue, page) => {
  const limit = 15;
  const response = await apiService.get(`${APIS.DRIVER_CONDUCTOR}`, {
    params: {
      limit,
      page: 0,
      search: inputValue || null,
      sortBy: 'name',
      order: 'asc',
      staffType: 'Conductor',
    },
  });

  const DRIVER = response.data.list.map((d) => ({
    value: d._id,
    label: d.name.english + ' (' + d.loginMobile + ')',
  }));

  return {
    results: DRIVER,
    nextPage: false,
  };
};

export default function AddEditTimeTable() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const routeName = queryParams.get('routeName');
  const [isSaved, setIsSaved] = useState(false);
  const [showSelectTimeTable, setShowSelectTimeTable] = useState(false);
  const [routes, setRoutes] = useState({
    data: [],
    options: [],
    route: null,
  });
  const [vehicle, setVehicle] = useState({
    data: [],
    options: [],
  });
  const [timeTables, setTimeTables] = useState([]);
  const [pageData, setPageData] = useState({});
  const [initialValues, setInitialValues] = useState({
    routeName: '',
    routeCode: '',
    origin: '',
    destination: '',
    via: '',
  });
  const [selectedData, setSelectedData] = useState({
    vehicles: [],
    drivers: [],
    conductors: [],
  });

  const getRoutes = useQuery({
    queryKey: ['routes'],
    queryFn: () =>
      apiService
        .get(`${APIS.GET_ALL_ROUTES}`, {
          params: {
            limit: 10000,
            page: 1,
            sortBy: 'name',
            order: 'asc',
          },
        })
        .then(async (res) => {
          const data = await res?.data.routes?.map((item) => ({
            value: item?.name?.toLowerCase(),
            id: item._id,
            label: item?.name,
          }));
          setRoutes({
            data: res?.data?.routes,
            options: data,
          });

          if (routeName) {
            const autofield = res?.data?.routes.find(
              (item) => item.name === routeName
            );

            setInitialValues({
              routeName: autofield.name.toLowerCase(),
              routeCode: autofield.routeCode,
              origin: autofield.outbound?.origin?.name?.english,
              destination: autofield.outbound?.destination?.name?.english,
              via: autofield.outbound?.via?.name?.english,
            });

            setRoutes((prev) => ({
              ...prev,
              route: autofield,
            }));
          }

          if (id) {
            const timeTableData = await TimeTableService.getTimeTableById(
              id
            ).then((res) => res.data.data);
            setPageData(timeTableData);

            setInitialValues({
              routeName: timeTableData.route.name?.toLowerCase(),
              routeCode: timeTableData.route.routeCode,
              origin: timeTableData.route?.outbound?.origin?.name?.english,
              destination:
                timeTableData.route?.outbound?.destination?.name?.english,
              via: timeTableData.route?.outbound?.via?.name?.english,
            });

            setRoutes((prev) => ({
              ...prev,
              route: timeTableData.route,
            }));
          }

          return res?.data?.routes;
        }),
  });

  useQuery({
    queryKey: ['vehicle'],
    queryFn: () =>
      getApi(`${APIS.GET_ALL_VEHICLES}?page=0&pageSize=15&search=&`).then(
        (res) => {
          const data = res?.data?.list?.map((item) => ({
            value: item?.identification.registrationNumber.toLowerCase(),
            id: item._id,
            label: item?.identification.registrationNumber,
          }));
          setVehicle({
            data: res?.data?.list,
            options: data,
          });
          return res?.data?.list;
        }
      ),
  });

  useEffect(() => {
    if (routes.route !== null) {
      setShowSelectTimeTable(true);
      setInitialValues({
        routeName: routes.route?.name?.toLowerCase(),
        routeCode: routes.route?.routeCode,
        origin: routes.route?.outbound?.origin?.name?.english,
        destination: routes.route?.outbound?.destination?.name?.english,
        via: routes.route?.outbound?.via?.name?.english,
      });
    }
  }, [routes.route]);

  if (getRoutes.isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <LoadingScreen className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]" />
      </div>
    );
  }

  const processServicesData = async ({ data }) => {
    return data.map((serviceData) => {
      if (
        !serviceData.service ||
        !serviceData.startDate ||
        !serviceData.endDate ||
        !serviceData.headway ||
        !serviceData.frequency ||
        !serviceData.vehicles ||
        !serviceData.vehiclesTimeTable
      ) {
        throw new Error('Required fields are missing in service');
      }

      const vehiclesTimeTable = serviceData.vehiclesTimeTable.map(
        (timetable) => {
          if (
            !timetable.startTime ||
            !timetable.startDate ||
            !timetable.endDate ||
            !timetable.frequency ||
            !timetable.vehicle ||
            !timetable.driver1
          ) {
            throw new Error('Required fields are missing in service');
          }

          if (timetable.driver1 === timetable.driver2) {
            throw new Error(
              'Driver 2 must be different from driver 1 in the same service'
            );
          }

          return {
            startTime: timetable.startTime,
            startDate: timetable.startDate,
            endDate: timetable.endDate,
            frequency: timetable.frequency.value, // Assuming the frequency ID is what is needed
            vehicle: timetable.vehicle.id,
            drivers: timetable.isDriver2
              ? [timetable.driver1, timetable.driver2]
              : [timetable.driver1],
            conductor: timetable.conductor,
            noOfTrips: timetable.noOfTrips,
            tripsBreak: timetable.tripsBreak,
            days: timetable.days,
            timetable: [],
          };
        }
      );

      return {
        service: serviceData.service._id,
        buses: serviceData.buses,
        startDate: serviceData.startDate,
        endDate: serviceData.endDate,
        headway: serviceData.headway,
        vehicles: serviceData.vehicles.map((vehicle) => vehicle.id),
        frequency: serviceData.frequency.value, // Assuming the frequency ID is what is needed
        vehiclesTimeTable: vehiclesTimeTable || {},
      };
    });
  };

  const handleCreateTimeTableSuccess = () => {
    toast.success('Time Table created successfully');
    if (!isSaved) {
      navigate(ROUTES.TIME_TABLE);
    }
    setIsSaved(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (routes.route === undefined) {
        toast.error('Please select route');
        return;
      }

      console.log(timeTables);

      const servicesData = await processServicesData({
        data: timeTables,
      });

      const payloadData = {
        route: routes?.route?._id,
        services: servicesData,
      };

      if (id) {
        //
      } else {
        TimeTableService.createTimeTable(
          payloadData,
          handleCreateTimeTableSuccess
        );
      }

      if (isSaved) {
        resetForm();
      }
      setSubmitting(false);
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, handleSubmit: formikSubmit }) => {
            const resetData = () => {
              setFieldValue('routeCode', '');
              setFieldValue('origin', '');
              setFieldValue('destination', '');
              setFieldValue('via', '');
              setFieldValue('routeName', '');
              setShowSelectTimeTable(false);
              if (!id) {
                setRoutes((prev) => ({
                  ...prev,
                  route: null,
                }));
              }
            };
            return (
              <>
                <div className="p-4 flex justify-between border-b border-border-primary">
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(ROUTES.TIME_TABLE)}
                      boldItem="Time Table"
                    />
                    <div className="font-semibold text-2xl text-[#002850]">
                      {!id ? 'Add' : 'Edit'} Time Table
                    </div>
                  </div>

                  <div className="flex gap-3 flex-col sm:flex-row">
                    <Button variant="outline" onClick={() => history.back()}>
                      Cancel
                    </Button>
                    {!id && (
                      <Button
                        variant="outline"
                        disabled={isSubmitting}
                        onClick={() => {
                          formikSubmit();
                          setIsSaved(true);
                        }}
                      >
                        Save & Add New
                      </Button>
                    )}

                    <Button
                      type="submit"
                      onClick={formikSubmit}
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <section className="scrollbar overflow-y-scroll h-[calc(100vh-71px-95px)]">
                  <div className="grid sm:grid-cols-3 gap-4 z-0 p-4">
                    <div className="col-span-3">
                      <CustomSelect
                        name="mySelect"
                        label="Select Route"
                        defaultValue={
                          routeName && {
                            value: routes.route._id,
                            label: routes.route.name,
                            route: routes.route,
                          }
                        }
                        onChange={(data) => {
                          console.log(data, 'data');
                          setRoutes((prev) => ({
                            ...prev,
                            route: data.route,
                          }));

                          setFieldValue('routeCode', data.route.routeCode);
                          setFieldValue(
                            'origin',
                            data.route.outbound.origin.name.english
                          );
                          setFieldValue(
                            'destination',
                            data.route.outbound.destination.name.english
                          );
                          setFieldValue(
                            'via',
                            data.route.outbound.via.name.english
                          );
                        }}
                        fetchData={fetchData}
                        selectProps={{
                          placeholder: 'Search...',
                        }}
                      />
                    </div>
                    <FormikTextField
                      label="Route Code"
                      placeholder="Route Code"
                      name="routeCode"
                      isRequired
                      isDisabled
                    />
                    <FormikTextField
                      label="Origin"
                      placeholder="Origin"
                      name="origin"
                      isRequired
                      isDisabled
                    />
                    <FormikTextField
                      label="Destination"
                      placeholder="Destination"
                      name="destination"
                      isRequired
                      isDisabled
                    />
                  </div>

                  {showSelectTimeTable && (
                    <>
                      <TableView
                        route={routes.route}
                        vehicle={vehicle}
                        setVehicle={setVehicle}
                        resetData={resetData}
                        id={id}
                        driver={fetchDrivers}
                        conductor={fetchConductors}
                        timeTables={timeTables}
                        setTimeTables={setTimeTables}
                        pageData={pageData}
                        selectedData={selectedData}
                        setSelectedData={setSelectedData}
                      />
                    </>
                  )}
                </section>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
