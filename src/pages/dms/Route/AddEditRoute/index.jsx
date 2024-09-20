import React from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Formik } from 'formik';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/route.constant';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { CustomSelect } from '@/components/common/CustomSelect';
import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import LoadingScreen from '@/components/LoadingScreen';
import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { settingFillIcon } from '@/assets/Icons';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { PlusIcon } from 'lucide-react';
import AddStageList from './AddStageList';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const validationSchema = Yup.object({
  code: Yup.string().required('Code is required'),
  name: Yup.string().required('Name is required'),
  serviceTypes: Yup.array()
    .of(Yup.mixed())
    .required('Service type is required'),
  originWorkshop: Yup.string().required('Origin workshop is required'),
  origin: Yup.string().required('Origin is required'),
  destination: Yup.string()
    .required('Destination is required')
    .notOneOf(
      [Yup.ref('origin'), null],
      'Origin and destination cannot be the same'
    ),
  destinationWorkshop: Yup.string().required(
    'Destination workshop is required'
  ),
  via: Yup.string().required('Via is required'),
});

export default function AddEditRoute() {
  const { setCount } = useContext(CounterContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [options, setOptions] = useState([]);
  const [depotData, setDepotData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);
  const [busStopData, setBusStopData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    code: '',
    name: '',
    serviceTypes: [],
    originWorkshop: '',
    origin: '',
    destination: '',
    destinationWorkshop: '',
    via: '',
    stages: [],
    services: [],
  });
  const [routeDetails, setRouteDetails] = useState({
    originWorkshop: '',
    origin: '',
    destination: '',
    destinationWorkshop: '',
    via: '',
  });

  const setRouteName = ({ origin, destination, via }) => {
    if (origin && destination && via) {
      return `${origin} to ${destination} via ${via}`;
    } else if (origin && destination) {
      return `${origin} to ${destination}`;
    } else if (origin && via) {
      return `${origin} via ${via}`;
    } else if (destination && via) {
      return `${destination} via ${via}`;
    } else if (origin) {
      return `${origin}`;
    } else if (destination) {
      return `${destination}`;
    } else if (via) {
      return `${via}`;
    }
  };

  const handleRouteDetailsChange = (name, value) => {
    setRouteDetails({
      ...routeDetails,
      [name]: value,
    });
  };

  const fetchServiceTypesData = async (inputValue, page) => {
    const limit = 1000;
    const response = await apiService.get(`${APIS.BUS_SERVICE_TYPE}`, {
      params: {
        limit,
        page: page || 0,
        search: inputValue || null,
        sortBy: 'name',
        order: 'asc',
      },
    });

    const serviceTypes = response.data?.list.map((item) => ({
      value: item._id,
      label: item?.name?.english,
    }));

    const totalCount = response.data.totalCount;
    const hasNextPage = page * limit < totalCount;

    return {
      results: serviceTypes,
      nextPage: hasNextPage ? page + 1 : null,
    };
  };

  const fetchRoutes = useQuery({
    queryKey: ['createRoute'],
    queryFn: async () => {
      let allOptions = [];

      // Depot Office
      const depotRes = await apiService.get(APIS.OFFICE, {
        params: {
          officeType: 'depot',
          page: 1,
          pageSize: 10000,
        },
      });
      const depotData = depotRes.data.list.map((item) => ({
        value: item?.name?.english.toLowerCase(),
        id: item._id,
        label: item?.name?.english,
        lat: item?.lat,
        lng: item?.long,
      }));
      allOptions.push(...depotRes.data.list);
      setDepotData(depotData);
      setOptions((prev) => [...prev, ...depotData]);

      // BusStop Office
      const busStopRes = await apiService.get(APIS.OFFICE, {
        params: {
          officeType: 'busStop',
          page: 1,
          pageSize: 10000,
        },
      });

      const busStopData = busStopRes.data.list.map((item) => ({
        value: item?.name?.english.toLowerCase(),
        id: item._id,
        label: item?.name?.english,
        lat: item?.lat,
        lng: item?.long,
      }));
      allOptions.push(...busStopRes.data.list);
      setBusStopData(busStopData);
      setOptions((prev) => [...prev, ...busStopData]);

      // Workshop Office
      const workshopRes = await apiService.get(APIS.OFFICE, {
        params: {
          officeType: 'workshop',
          page: 1,
          pageSize: 10000,
        },
      });

      const workshopData = workshopRes.data.list.map((item) => ({
        value: item?.name?.english.toLowerCase(),
        id: item._id,
        label: item?.name?.english,
        lat: item?.lat,
        lng: item?.long,
      }));
      allOptions.push(...workshopRes.data.list);
      setWorkshopData(workshopData);
      setOptions((prev) => [...prev, ...workshopData]);

      return allOptions;
    },
  });

  const checkRoute = useMutation({
    mutationKey: ['checkRoute'],
    mutationFn: async (data) =>
      await apiService
        .get(`${APIS.GET_ALL_ROUTES}/checkRoute`, {
          params: {
            origin: data.origin,
            destination: data.destination,
          },
        })
        .then((res) => {
          if (res.data.length != 0) {
            if (!id) {
              toast.error(`${res.data.length} routes Already Exists.`);
            }
          }
          return res;
        }),
  });

  useEffect(() => {
    setCount('Routes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (routeDetails.origin && routeDetails.destination) {
      checkRoute.mutate({
        origin: routeDetails.origin.id,
        destination: routeDetails.destination.id,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDetails]);

  const selectOptions = {
    options: options,
    data: [
      {
        title: 'Depot',
        options: depotData,
      },
      {
        title: 'BusStop',
        options: busStopData,
      },
      {
        title: 'Workshop',
        options: workshopData,
      },
    ],
  };

  const fetchPageData = useQuery({
    queryKey: ['editRoute', id],
    queryFn: async () => {
      // const data = await RouteService.getRouteById(id).then(
      //   (res) => res.data.data
      // );

      // setInitialValues({
      //   name: data.name,
      //   routeCode: data.routeCode,
      //   serviceTypes: data.serviceTypes?.map((d) => ({
      //     id: d?._id,
      //     label: d?.name.english,
      //     value: d?.name.english.toLowerCase(),
      //   })),
      //   isInbound: data?.isInbound,
      // });

      // const initalStagesData = await data?.outbound?.stages?.map((d) => ({
      //   id: Date.now() + Math.random().toString(36).substring(2, 15),
      //   duration: d?.duration,
      //   stage: {
      //     value: d?.stage.name.english?.toLowerCase(),
      //     id: d?.stage._id,
      //     label: d?.stage.name.english,
      //     lat: d?.stage.lat,
      //     lng: d?.stage.long,
      //   },
      // }));

      // const initialservices = await data?.outbound.services.map((service) => ({
      //   id: service?.service?._id,
      //   service: {
      //     id: service?.service?._id,
      //     label: service?.service.name.english,
      //     value: service?.service.name.english?.toLowerCase(),
      //   },
      //   stages: service?.stages.map((d) => ({
      //     check: d?.check,
      //     id: d._id,
      //     duration: d?.duration,
      //     haltTime: d?.haltTime,
      //     stage: {
      //       value: d?.stage?.name.english?.toLowerCase(),
      //       id: d?.stage?._id,
      //       label: d?.stage?.name.english,
      //       lat: d?.stage?.lat,
      //       lng: d?.stage?.long,
      //     },
      //   })),
      //   type: service?.type,
      //   category: service?.category,
      //   distance: service?.distance,
      //   destinationDuration: service?.destinationDuration,
      //   deadRunDistance: service?.deadRunDistance,
      //   time: service?.time,
      //   estimatedTime: service?.estimatedTime,
      //   stops: service?.stops,
      // }));

      // setServices(initialservices);

      // const OutboundRouteDetailsData = {
      //   originWorkshop: {
      //     value: data?.outbound?.originWorkshop?.name?.english?.toLowerCase(),
      //     id: data?.outbound?.originWorkshop?._id,
      //     label: data.outbound?.originWorkshop?.name?.english,
      //     lat: data.outbound?.originWorkshop?.lat,
      //     lng: data.outbound?.originWorkshop?.long,
      //   },
      //   origin: {
      //     value: data.outbound?.origin?.name?.english?.toLowerCase(),
      //     id: data.outbound?.origin?._id,
      //     label: data.outbound?.origin?.name?.english,
      //     lat: data.outbound?.origin?.lat,
      //     lng: data.outbound?.origin?.long,
      //   },
      //   destination: {
      //     value: data.outbound?.destination?.name?.english?.toLowerCase(),
      //     id: data.outbound?.destination?._id,
      //     label: data.outbound?.destination?.name?.english,
      //     lat: data.outbound?.destination?.lat,
      //     lng: data.outbound?.destination?.long,
      //   },
      //   destinationWorkshop: {
      //     value:
      //       data?.outbound?.destinationWorkshop?.name?.english?.toLowerCase(),
      //     id: data?.outbound?.destinationWorkshop?._id,
      //     label: data.outbound?.destinationWorkshop?.name?.english,
      //     lat: data.outbound?.destinationWorkshop?.lat,
      //     lng: data.outbound?.destinationWorkshop?.long,
      //   },
      //   via: {
      //     value: data.outbound?.via?.name?.english?.toLowerCase(),
      //     id: data.outbound?.via?._id,
      //     label: data.outbound?.via?.name?.english,
      //     lat: data.outbound?.via?.lat,
      //     lng: data.outbound?.via?.long,
      //   },
      //   services: await initialservices,
      //   stages: initalStagesData,
      // };

      // setAddStage(initalStagesData);
      // setOutboundRouteDetails(OutboundRouteDetailsData);

      // if (data?.isInbound) {
      //   const InboundRouteDetailsData = {
      //     originWorkshop: {
      //       value: data?.inbound?.originWorkshop?.name?.english?.toLowerCase(),
      //       id: data?.inbound?.originWorkshop?._id,
      //       label: data.inbound?.originWorkshop?.name?.english,
      //       lat: data.inbound?.originWorkshop?.lat,
      //       lng: data.inbound?.originWorkshop?.long,
      //     },
      //     origin: {
      //       value: data.inbound?.origin?.name?.english?.toLowerCase(),
      //       id: data.inbound?.origin?._id,
      //       label: data.inbound?.origin?.name?.english,
      //       lat: data.inbound?.origin?.lat,
      //       lng: data.inbound?.origin?.long,
      //     },
      //     destination: {
      //       value: data.inbound?.destination?.name?.english?.toLowerCase(),
      //       id: data.outboundinbound.destination?._id,
      //       label: data.inbound?.destination?.name?.english,
      //       lat: data.inbound?.destination?.lat,
      //       lng: data.inbound?.destination?.long,
      //     },
      //     destinationWorkshop: {
      //       value:
      //         data?.inbound?.destinationWorkshop?.name?.english?.toLowerCase(),
      //       id: data?.inbound?.destinationWorkshop?._id,
      //       label: data.inbound?.destinationWorkshop?.name?.english,
      //       lat: data.inbound?.destinationWorkshop?.lat,
      //       lng: data.inbound?.destinationWorkshop?.long,
      //     },
      //     via: {
      //       value: data.inbound?.via?.name?.english?.toLowerCase(),
      //       id: data.inbound?.via?._id,
      //       label: data.inbound?.via?.name?.english,
      //       lat: data.inbound?.via?.lat,
      //       lng: data.inbound?.via?.long,
      //     },
      //     services: await initialservices,
      //     stages: initalStagesData,
      //   };

      //   setInboundRouteDetails(InboundRouteDetailsData);
      // }

      return;
    },
    enabled: id ? !fetchRoutes.isLoading : false,
  });

  if (fetchRoutes.isLoading) {
    if (id && !fetchPageData.isLoading) {
      return (
        <div className="w-full h-full flex flex-col gap-4">
          <LoadingScreen className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]" />
        </div>
      );
    }
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <LoadingScreen className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            setFieldValue,
            handleSubmit: formikSubmit,
          }) => {
            console.log('values', values, routeDetails);
            return (
              <>
                <div className="p-4 flex justify-between border-b border-[#dcdcdc]">
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(ROUTES.ROUTE)}
                      boldItem="Route"
                    />
                    <div className="font-semibold text-2xl text-[#002850]">
                      {!id ? 'Add' : 'Edit'} Route
                    </div>
                  </div>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => history.back()}
                    >
                      Cancel
                    </Button>
                    {!id && (
                      <Button
                        type="button"
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
                  <section className="grid md:grid-cols-6 gap-4 z-0 p-4 border-t border-[#dcdcdc] align-bottom">
                    <div className="col-span-1">
                      <FormikTextField
                        label="Route Code"
                        name="code"
                        placeholder="Enter route code"
                        isRequired
                        maxLength={16}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormikTextField
                        readOnly
                        label="Route Name"
                        name="name"
                        placeholder="Select Origin Destination & Via"
                        isDisabled={true}
                        isRequired
                      />
                    </div>
                    <div className="col-span-3">
                      <CustomSelect
                        isMulti
                        useFormik={true}
                        name="serviceTypes"
                        label="Service Type"
                        placeholder="Select service type"
                        fetchData={fetchServiceTypesData}
                        isRequired
                        defaultValue={values.serviceTypes}
                        selectProps={{
                          isRequired: true,
                        }}
                      />
                    </div>
                  </section>
                  <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4 pb-4">
                    <CustomFormikDropdownInput
                      label="Origin Workshop"
                      lablePrefix={
                        <div className="mr-[6px]">
                          {settingFillIcon({
                            width: 14,
                            height: 14,
                            className: 'text-[#00D93D]',
                          })}
                        </div>
                      }
                      name="originWorkshop"
                      placeholder="Select Origin Workshop"
                      options={selectOptions}
                      value={values.originWorkshop}
                      callback={(value) => {
                        handleRouteDetailsChange('originWorkshop', value);
                      }}
                      isRequired
                      useFormik
                    />
                    <CustomFormikDropdownInput
                      label="Origin"
                      name="origin"
                      placeholder="Select Origin"
                      options={selectOptions}
                      value={values.origin}
                      callback={(value) => {
                        handleRouteDetailsChange('origin', value);
                        setFieldValue(
                          'name',
                          setRouteName({
                            origin: value.label,
                            destination: routeDetails.destination.label,
                            via: routeDetails.via.label,
                          })
                        );
                      }}
                      isRequired
                      useFormik
                    />
                    <CustomFormikDropdownInput
                      label="Destination"
                      name="destination"
                      placeholder="Select Destination"
                      options={selectOptions}
                      value={values.destination}
                      callback={(value) => {
                        handleRouteDetailsChange('destination', value);
                        setFieldValue(
                          'name',
                          setRouteName({
                            origin: routeDetails.origin.label,
                            destination: value.label,
                            via: routeDetails.via.label,
                          })
                        );
                      }}
                      isRequired
                      useFormik
                    />
                    <CustomFormikDropdownInput
                      label="Destination Workshop"
                      lablePrefix={
                        <div className="mr-[6px]">
                          {settingFillIcon({
                            width: 14,
                            height: 14,
                            className: 'text-[#E81818]',
                          })}
                        </div>
                      }
                      name="destinationWorkshop"
                      placeholder="Select Destination Workshop"
                      options={selectOptions}
                      value={values.destinationWorkshop}
                      callback={(value) => {
                        handleRouteDetailsChange('destinationWorkshop', value);
                      }}
                      isRequired
                      useFormik
                    />
                    <CustomFormikDropdownInput
                      label="Via"
                      lablePrefix={
                        <div className="route-circle route-stage-waiting"></div>
                      }
                      name="via"
                      placeholder="Select Via"
                      options={selectOptions}
                      value={values.via}
                      callback={(value) => {
                        handleRouteDetailsChange('via', value);
                        setFieldValue(
                          'name',
                          setRouteName({
                            origin: routeDetails.origin.label,
                            destination: routeDetails.destination.label,
                            via: value.label,
                          })
                        );
                      }}
                      isRequired
                      useFormik
                    />
                  </section>
                  {/* Suggestions */}
                  {checkRoute.data?.data &&
                    checkRoute.data?.data.length > 0 && (
                      <section className="flex flex-col gap-2 p-4  h-full">
                        <div className="text-xs font-medium">Suggestions</div>
                        <div className="flex flex-col gap-2">
                          {checkRoute.data?.data.map((d) => (
                            <div key={d._id} className="text-xs font-normal">
                              {d.name}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  {/* Stages Data */}
                  <RouteStageSection
                    values={values}
                    routeDetails={routeDetails}
                    selectOptions={selectOptions}
                  />
                </section>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

function RouteStageSection({ values, routeDetails, selectOptions }) {
  const [stages, setStages] = useState([]);
  const [services, setServices] = useState([]);
  const addStagehandle = () => {
    const newStage = {
      id: Date.now() + Math.random().toString(36).substring(2, 15),
      stage: '',
      duration: '',
    };
    setStages((prev) => [...prev, newStage]);
  };
  const deleteStageHandler = (id) =>
    setStages(stages.filter((stage) => stage.id !== id));

  useEffect(() => {
    if (values.serviceTypes > 0) {
      setServices(values.serviceTypes);
    }
  }, [services]);

  return (
    <>
      <section className="flex flex-col md:flex-row border-t border-[#dcdcdc] gap-4 p-4">
        <section className="w-full md:max-w-[300px] md:min-w-[350px] border border-[#dcdcdc] rounded-md bg-[#002850] pb-2">
          <div
            className="font-medium flex justify-center items-center gap-2 text-base h-10 rounded-md cursor-pointer m-2 bg-[#256EB5] text-white"
            onClick={addStagehandle}
          >
            <PlusIcon className="w-5 h-5" /> <span>Add Stage</span>
          </div>
          <div className="px-4 py-2 border-y bg-[#002850] border-[#dcdcdc] text-sm font-medium text-white flex">
            <div className="ml-6">
              Stages <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="px-4 mb-4 mt-2">
            <Label className={cn('text-white mb-1')}>Origin</Label>
            <Input
              className="opacity-50 cursor-not-allowed"
              type="text"
              placeholder="Select origin"
              disabled
              readOnly
              value={routeDetails.origin.label}
            />
          </div>
          <AddStageList
            addStage={stages}
            setAddStage={setStages}
            selectOptions={selectOptions}
            deleteStageHandler={deleteStageHandler}
          />

          <div className="px-4">
            <Label className={cn('text-white mb-1')}>Destination</Label>
            <Input
              className="opacity-50 cursor-not-allowed"
              type="text"
              placeholder="Select destination"
              disabled
              readOnly
              value={routeDetails.destination.label}
            />
          </div>
        </section>
        <section className="overflow-x-auto scrollbar flex flex-col md:flex-row md:w-[calc(100vw-332px)] gap-4">
          {services.map((service, index) => (
            <>a</>
          ))}
          {services.length === 0 && (
            <div className="text-center text-sm font-medium text-gray-400 w-full flex items-center justify-center border rounded-md">
              No Services
            </div>
          )}
        </section>
      </section>
    </>
  );
}
