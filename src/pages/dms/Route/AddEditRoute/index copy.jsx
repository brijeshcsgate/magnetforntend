import LoadingScreen from '@/components/LoadingScreen';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import MultiSelectDropdown from '@/components/ui/MultiSelectDropdown';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi } from '@/services/method';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RouteSection from './RouteSection';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import { useRouteMetrics } from '@/hooks/useRouteMetrics';
import { toast } from 'react-toastify';
import { RouteService } from '@/services/RouteService';
import { Button } from '@/components/ui/button';

export default function AddEditRoute() {
  const navigate = useNavigate();
  const { calculateDistanceAndTime } = useRouteMetrics();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    serviceTypes: [],
    isInbound: false,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [options, setOptions] = useState([]);
  const [depotData, setDepotData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);
  const [busStopData, setBusStopData] = useState([]);
  const [addStage, setAddStage] = useState([]);
  const [services, setServices] = useState([]);
  const [outboundRouteDetails, setOutboundRouteDetails] = useState({
    originWorkshop: '',
    origin: '',
    destination: '',
    destinationWorkshop: '',
    via: '',
    services: services,
    stages: addStage,
  });
  const [inboundRouteDetails, setInboundRouteDetails] = useState({
    originWorkshop: '',
    origin: '',
    destination: '',
    destinationWorkshop: '',
    via: '',
    services: services,
    stages: addStage,
  });

  const [serviceType, setServiceType] = useState({
    data: [],
    options: [],
  });

  const fetchRoutes = useQuery({
    queryKey: ['createRoute'],
    queryFn: async () => {
      let allOptions = [];

      // Depot Office
      const depotRes = await getApi(
        `${APIS.OFFICE}?officeType=depot&page=1&pageSize=10000`
      );
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
      const busStopRes = await getApi(
        `${APIS.OFFICE}?officeType=busStop&page=1&pageSize=10000`
      );
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
      const workshopRes = await getApi(
        `${APIS.OFFICE}?officeType=workshop&page=1&pageSize=10000`
      );
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

  useQuery({
    queryKey: ['serviceType'],
    queryFn: () =>
      getApi(`${APIS.BUS_SERVICE_TYPE}?page=0&pageSize=15&search=&`).then(
        (res) => {
          const data = res?.data?.list?.map((item) => ({
            value: item?.name?.english.toLowerCase(),
            id: item._id,
            label: item?.name?.english,
          }));
          setServiceType({
            data: res?.data?.list,
            options: data,
          });

          return res?.data?.list;
        }
      ),
  });

  const routeCategorys = useQuery({
    queryKey: ['routeCategory'],
    queryFn: () =>
      getApi(`${APIS.ROUTE_CATEGORY}?page=0&pageSize=15&search=&`).then(
        (res) => {
          return res?.data?.list;
        }
      ),
  });

  const routeType = useQuery({
    queryKey: ['routeType'],
    queryFn: () =>
      getApi(`${APIS.ROUTE_TYPE}?page=0&pageSize=15&search=&`).then((res) => {
        return res?.data?.list;
      }),
  });

  const fetchPageData = useQuery({
    queryKey: ['editRoute', id],
    queryFn: async () => {
      const data = await RouteService.getRouteById(id).then(
        (res) => res.data.data
      );

      setInitialValues({
        name: data.name,
        routeCode: data.routeCode,
        serviceTypes: data.serviceTypes?.map((d) => ({
          id: d?._id,
          label: d?.name.english,
          value: d?.name.english.toLowerCase(),
        })),
        isInbound: data?.isInbound,
      });

      const initalStagesData = await data?.outbound?.stages?.map((d) => ({
        id: Date.now() + Math.random().toString(36).substring(2, 15),
        duration: d?.duration,
        stage: {
          value: d?.stage.name.english?.toLowerCase(),
          id: d?.stage._id,
          label: d?.stage.name.english,
          lat: d?.stage.lat,
          lng: d?.stage.long,
        },
      }));

      const initialservices = await data?.outbound.services.map((service) => ({
        id: service?.service?._id,
        service: {
          id: service?.service?._id,
          label: service?.service.name.english,
          value: service?.service.name.english?.toLowerCase(),
        },
        stages: service?.stages.map((d) => ({
          check: d?.check,
          id: d._id,
          duration: d?.duration,
          haltTime: d?.haltTime,
          stage: {
            value: d?.stage?.name.english?.toLowerCase(),
            id: d?.stage?._id,
            label: d?.stage?.name.english,
            lat: d?.stage?.lat,
            lng: d?.stage?.long,
          },
        })),
        type: service?.type,
        category: service?.category,
        distance: service?.distance,
        destinationDuration: service?.destinationDuration,
        deadRunDistance: service?.deadRunDistance,
        time: service?.time,
        estimatedTime: service?.estimatedTime,
        stops: service?.stops,
      }));

      setServices(initialservices);

      const OutboundRouteDetailsData = {
        originWorkshop: {
          value: data?.outbound?.originWorkshop?.name?.english?.toLowerCase(),
          id: data?.outbound?.originWorkshop?._id,
          label: data.outbound?.originWorkshop?.name?.english,
          lat: data.outbound?.originWorkshop?.lat,
          lng: data.outbound?.originWorkshop?.long,
        },
        origin: {
          value: data.outbound?.origin?.name?.english?.toLowerCase(),
          id: data.outbound?.origin?._id,
          label: data.outbound?.origin?.name?.english,
          lat: data.outbound?.origin?.lat,
          lng: data.outbound?.origin?.long,
        },
        destination: {
          value: data.outbound?.destination?.name?.english?.toLowerCase(),
          id: data.outbound?.destination?._id,
          label: data.outbound?.destination?.name?.english,
          lat: data.outbound?.destination?.lat,
          lng: data.outbound?.destination?.long,
        },
        destinationWorkshop: {
          value:
            data?.outbound?.destinationWorkshop?.name?.english?.toLowerCase(),
          id: data?.outbound?.destinationWorkshop?._id,
          label: data.outbound?.destinationWorkshop?.name?.english,
          lat: data.outbound?.destinationWorkshop?.lat,
          lng: data.outbound?.destinationWorkshop?.long,
        },
        via: {
          value: data.outbound?.via?.name?.english?.toLowerCase(),
          id: data.outbound?.via?._id,
          label: data.outbound?.via?.name?.english,
          lat: data.outbound?.via?.lat,
          lng: data.outbound?.via?.long,
        },
        services: await initialservices,
        stages: initalStagesData,
      };

      setAddStage(initalStagesData);
      setOutboundRouteDetails(OutboundRouteDetailsData);

      if (data?.isInbound) {
        const InboundRouteDetailsData = {
          originWorkshop: {
            value: data?.inbound?.originWorkshop?.name?.english?.toLowerCase(),
            id: data?.inbound?.originWorkshop?._id,
            label: data.inbound?.originWorkshop?.name?.english,
            lat: data.inbound?.originWorkshop?.lat,
            lng: data.inbound?.originWorkshop?.long,
          },
          origin: {
            value: data.inbound?.origin?.name?.english?.toLowerCase(),
            id: data.inbound?.origin?._id,
            label: data.inbound?.origin?.name?.english,
            lat: data.inbound?.origin?.lat,
            lng: data.inbound?.origin?.long,
          },
          destination: {
            value: data.inbound?.destination?.name?.english?.toLowerCase(),
            id: data.outboundinbound.destination?._id,
            label: data.inbound?.destination?.name?.english,
            lat: data.inbound?.destination?.lat,
            lng: data.inbound?.destination?.long,
          },
          destinationWorkshop: {
            value:
              data?.inbound?.destinationWorkshop?.name?.english?.toLowerCase(),
            id: data?.inbound?.destinationWorkshop?._id,
            label: data.inbound?.destinationWorkshop?.name?.english,
            lat: data.inbound?.destinationWorkshop?.lat,
            lng: data.inbound?.destinationWorkshop?.long,
          },
          via: {
            value: data.inbound?.via?.name?.english?.toLowerCase(),
            id: data.inbound?.via?._id,
            label: data.inbound?.via?.name?.english,
            lat: data.inbound?.via?.lat,
            lng: data.inbound?.via?.long,
          },
          services: await initialservices,
          stages: initalStagesData,
        };

        setInboundRouteDetails(InboundRouteDetailsData);
      }

      return data;
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
  const calculateRouteDetails = async (routeDetails, serviceId) => {
    const service = routeDetails.services.find(
      (service) => service.id === serviceId
    );

    let originToDestinationWaypoints = [];
    service.stages
      .map((stage) => (stage.check === true ? stage : null))
      .filter((stage) => stage)
      .map((stage) => {
        originToDestinationWaypoints.push({
          lat: stage.stage.lat,
          lng: stage.stage.lng,
        });
      });

    // // Assuming you want to calculate distances between origin and destination workshops
    const originToDestinationPoints = {
      origin: {
        lat: parseFloat(routeDetails.origin.lat),
        lng: parseFloat(routeDetails.origin.lng),
      },
      destination: {
        lat: parseFloat(routeDetails.destination.lat),
        lng: parseFloat(routeDetails.destination.lng),
      },
      waypoints: originToDestinationWaypoints,
    };

    const { totalDistance: runKm, totalTime: estimatedTime } =
      await calculateDistanceAndTime(originToDestinationPoints);

    const originWorkshopToOriginPoints = {
      origin: {
        lat: parseFloat(routeDetails.originWorkshop.lat),
        lng: parseFloat(routeDetails.originWorkshop.lng),
      },
      destination: {
        lat: parseFloat(routeDetails.origin.lat),
        lng: parseFloat(routeDetails.origin.lng),
      },
      waypoints: [],
    };

    const destinationToDestinationWorkshopPoints = {
      origin: {
        lat: parseFloat(routeDetails.destination.lat),
        lng: parseFloat(routeDetails.destination.lng),
      },
      destination: {
        lat: parseFloat(routeDetails.destinationWorkshop.lat),
        lng: parseFloat(routeDetails.destinationWorkshop.lng),
      },
      waypoints: [],
    };

    const { totalDistance: deadKmOriginWorkshopToOrigin } =
      await calculateDistanceAndTime(originWorkshopToOriginPoints);

    const { totalDistance: deadKmDestinationToDestinationWorkshopPoints } =
      await calculateDistanceAndTime(destinationToDestinationWorkshopPoints);

    const finalDeadDistances = (distance, deadRunDistance) => {
      const dist1 = parseFloat(distance.split(' ')[0]);
      const dist2 = parseFloat(deadRunDistance.split(' ')[0]);

      const diff = Math.abs(dist1 + dist2);

      return `${diff.toFixed(2)} km`;
    };

    const deadRunDistance = finalDeadDistances(
      deadKmOriginWorkshopToOrigin,
      deadKmDestinationToDestinationWorkshopPoints
    );

    return {
      distance: runKm,
      time: estimatedTime,
      deadRunDistance,
    };
  };

  function findSuitableRouteCategory(routeCategories, routeDetails) {
    const distance = parseInt(routeDetails.split(' ')[0]);
    return routeCategories.find((route) => route.distance <= distance);
  }

  function findSutableRouteType() {
    const origin = fetchRoutes.data.find(
      (item) => item._id === outboundRouteDetails.origin.id
    );
    const destination = fetchRoutes.data.find(
      (item) => item._id === outboundRouteDetails.destination.id
    );

    if (
      origin.regionId.name.english.toLowerCase() ===
      destination.regionId.name.english.toLowerCase()
    ) {
      return routeType.data.find((item) => item.code === 'ROUTYP0001');
    } else if (
      origin.stateId.name.english.toLowerCase() !==
      destination.stateId.name.english.toLowerCase()
    ) {
      return routeType.data.find((item) => item.code === 'ROUTYP0003');
    } else if (
      origin.regionId.name.english.toLowerCase() !==
      destination.regionId.name.english.toLowerCase()
    ) {
      return routeType.data.find((item) => item.code === 'ROUTYP0002');
    }
  }

  function calculateDuration(allDuration) {
    let totalHours = 0;
    let totalMinutes = 0;

    allDuration.forEach((timeObj) => {
      let [haltHours, haltMinutes] = timeObj.haltTime.split(':').map(Number);
      let [durationHours, durationMinutes] = timeObj.duration
        .split(':')
        .map(Number);

      totalHours += haltHours + durationHours;
      totalMinutes += haltMinutes + durationMinutes;
    });

    // Convert minutes to hours if they exceed 59
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }

    // Format the result as HH:MM
    const formattedHours = String(totalHours).padStart(2, '0');
    const formattedMinutes = String(totalMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  async function processServicesData(routeServiceDetail) {
    const services = await Promise.all(
      routeServiceDetail.services.map(async (service) => {
        const routeDetails = await calculateRouteDetails(
          routeServiceDetail,
          service.id
        );
        const category = await findSuitableRouteCategory(
          routeCategorys.data,
          routeDetails.distance
        );

        const type = findSutableRouteType();

        // time calucation
        let allDuration = [];

        service.stages.map((d) => {
          allDuration.push({
            haltTime: d.haltTime,
            duration: d.duration,
          });
        });

        allDuration.push({
          haltTime: '00:00',
          duration: service.destinationDuration,
        });

        const time = calculateDuration(allDuration);

        const data = {
          service: service.id,
          stages: service.stages.map((d) => ({
            check: d.check,
            stage: d.stage.id,
            haltTime: d.haltTime,
            duration: d.duration,
          })),
          destinationDuration: service.destinationDuration,
          type: type._id,
          category: category?._id,
          distance: routeDetails.distance,
          deadRunDistance: routeDetails.deadRunDistance,
          time: time,
          stops:
            service.stages
              .map((service) => service.check === true)
              .filter((check) => check).length + 2,
        };
        return data;
      })
    );

    return services;
  }

  const handleCreateRouteSuccess = () => {
    toast.success('Route created successfully');
    if (!isSaved) {
      navigate(ROUTES.ROUTE);
    }
    setIsSaved(false);
  };

  const handleUpdateRouteSuccess = () => {
    toast.success('Updated Route successfully');
    if (!isSaved) {
      navigate(ROUTES.ROUTE);
    }
    setIsSaved(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.serviceTypes.length === 0) {
        return toast.error('Please select service type.');
      } else if (outboundRouteDetails.originWorkshop === '') {
        return toast.error('Please select origin workshop.');
      } else if (outboundRouteDetails.origin === '') {
        return toast.error('Please select origin.');
      } else if (outboundRouteDetails.destination === '') {
        return toast.error('Please select destination.');
      } else if (outboundRouteDetails.via === '') {
        return toast.error('Please select via.');
      } else if (
        outboundRouteDetails.stages.length <= 0 ||
        outboundRouteDetails.stages[0].stage === ''
      ) {
        return toast.error('Please select atleast one stage.');
      } else if (
        outboundRouteDetails.services
          .map((s) =>
            s.stages.find((e) => e.duration === '' || e.haltTime === '')
          )
          .filter((e) => e).length > 0
      ) {
        return toast.error(
          'Please enter duration and halt time of all stages.'
        );
      } else if (
        outboundRouteDetails.services.find((s) => s.destinationDuration === '')
      ) {
        return toast.error(
          'Please enter destination duration of all services.'
        );
      }

      const outboundServices = await processServicesData(outboundRouteDetails);

      const inboundServices = await processServicesData(inboundRouteDetails);

      const payloadData = {
        name: values.name,
        serviceTypes: values.serviceTypes.map((d) => d.id),
        outbound: {
          originWorkshop: outboundRouteDetails.originWorkshop.id,
          origin: outboundRouteDetails.origin.id,
          destination: outboundRouteDetails.destination.id,
          destinationWorkshop: outboundRouteDetails.destinationWorkshop.id,
          via: outboundRouteDetails.via.id,
          services: outboundServices,
          stages: outboundRouteDetails.stages.map((d) => ({
            duration: d.duration,
            stage: d.stage.id,
          })),
        },
        isInbound: values.isInbound,
        inbound: values.isInbound
          ? {
              originWorkshop: inboundRouteDetails.originWorkshop.id,
              origin: inboundRouteDetails.origin.id,
              destination: inboundRouteDetails.destination.id,
              destinationWorkshop: inboundRouteDetails.destinationWorkshop.id,
              via: inboundRouteDetails.via.id,
              services: inboundServices,
              stages: inboundRouteDetails.stages.map((d) => ({
                duration: d.duration,
                stage: d.stage.id,
              })),
            }
          : undefined,
      };

      if (id) {
        RouteService.updateRouteById(id, payloadData, handleUpdateRouteSuccess);
      } else {
        RouteService.createRoute(payloadData, handleCreateRouteSuccess);
      }

      if (isSaved) {
        resetForm();
      }
      setSubmitting(false);
    } catch (e) {
      toast.error('Something went wrong while saving. Please try again later.');
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
          {({
            isSubmitting,
            values,
            setFieldValue,
            handleSubmit: formikSubmit,
          }) => {
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
                  <div className="grid md:grid-cols-6 gap-4 z-0 p-4 border-t border-[#dcdcdc] align-bottom">
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

                    <MultiSelectDropdown
                      name="serviceTypes"
                      label="Service Type"
                      placeholder="Select Service Type"
                      options={serviceType.options}
                      defaultValue={values.serviceTypes}
                      isRequired
                      className="col-span-4"
                    />
                  </div>

                  <TabSection
                    values={values}
                    setOutboundRouteDetails={setOutboundRouteDetails}
                    inboundRouteDetails={inboundRouteDetails}
                    setInboundRouteDetails={setInboundRouteDetails}
                    outboundRouteDetails={outboundRouteDetails}
                    selectOptions={selectOptions}
                    addStage={addStage}
                    setAddStage={setAddStage}
                    services={services}
                    setServices={setServices}
                    setFieldValue={setFieldValue}
                    id={id}
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

function TabSection({
  values,
  setOutboundRouteDetails,
  inboundRouteDetails,
  setInboundRouteDetails,
  outboundRouteDetails,
  selectOptions,
  addStage,
  setAddStage,
  services,
  setServices,
  setFieldValue,
  id,
}) {
  const [tabStep, setTabStep] = useState(0);
  useEffect(() => {
    if (!values.isInbound) {
      setTabStep(0);
    }
    setInboundRouteDetails(() => {
      return {
        originWorkshop: outboundRouteDetails?.destinationWorkshop,
        origin: outboundRouteDetails?.destination,
        destination: outboundRouteDetails?.origin,
        destinationWorkshop: outboundRouteDetails?.originWorkshop,
        via: outboundRouteDetails?.via,
        services: outboundRouteDetails.services,
        stages: outboundRouteDetails.stages.reverse(),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.isInbound]);

  return (
    <div className="mx-4 bg-[#F5FBFD] border border-[#dcdcdc]">
      <div className="w-full h-fit flex items-center justify-between border-b border-[#dcdcdc] px-4 pt-2 gap-4">
        <div />
        <div className="flex items-center justify-center gap-4">
          <span
            onClick={() => {
              if (tabStep !== 1) return;
              setTabStep(0);
              setOutboundRouteDetails(() => {
                return {
                  originWorkshop: inboundRouteDetails?.destinationWorkshop,
                  origin: inboundRouteDetails?.destination,
                  destination: inboundRouteDetails?.origin,
                  destinationWorkshop: inboundRouteDetails?.originWorkshop,
                  via: inboundRouteDetails?.via,
                  services: inboundRouteDetails.services,
                  stages: inboundRouteDetails.stages.reverse(),
                };
              });
            }}
            className={cn(
              'text-base font-semibold cursor-pointer',
              tabStep === 0
                ? 'border-b-4 border-[#002850] pb-2  text-[#002850]'
                : 'text-[#23262B] pb-3'
            )}
          >
            OUTBOUND
          </span>
          <span
            onClick={() => {
              if (tabStep !== 0) return;
              if (!values.isInbound) return;
              setTabStep(1);

              setInboundRouteDetails(() => {
                return {
                  originWorkshop: outboundRouteDetails?.destinationWorkshop,
                  origin: outboundRouteDetails?.destination,
                  destination: outboundRouteDetails?.origin,
                  destinationWorkshop: outboundRouteDetails?.originWorkshop,
                  via: outboundRouteDetails?.via,
                  services: outboundRouteDetails.services,
                  stages: outboundRouteDetails.stages.reverse(),
                };
              });
            }}
            className={cn(
              'text-base font-semibold  cursor-pointer',
              tabStep === 1
                ? 'border-b-4 border-[#002850] pb-2  text-[#002850]'
                : 'text-[#23262B] pb-3',
              !values.isInbound && 'cursor-not-allowed text-gray-400'
            )}
          >
            INBOUND
          </span>
        </div>
        <FormikSwitch
          label="Is Inbound"
          name="isInbound"
          onChange={() => setFieldValue('isInbound', !values.isInbound)}
        />
      </div>
      <>
        {tabStep === 0 && (
          <RouteSection
            direction="outbound"
            selectOptions={selectOptions}
            values={values}
            addStage={addStage}
            setAddStage={setAddStage}
            routeDetails={outboundRouteDetails}
            setRouteDetails={setOutboundRouteDetails}
            services={services}
            setServices={setServices}
            setFieldValue={setFieldValue}
            isEdit={id ? true : false}
          />
        )}
        {tabStep === 1 && (
          <RouteSection
            direction="inbound"
            selectOptions={selectOptions}
            values={values}
            addStage={addStage}
            setAddStage={setAddStage}
            routeDetails={inboundRouteDetails}
            setRouteDetails={setInboundRouteDetails}
            services={services}
            setServices={setServices}
            setFieldValue={setFieldValue}
            isEdit={id ? true : false}
          />
        )}
      </>
    </div>
  );
}
