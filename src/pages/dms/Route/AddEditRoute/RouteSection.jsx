import { useContext, useEffect, useState } from 'react';
import { settingFillIcon } from '@/assets/Icons';
import { PlusIcon, RotateCwIcon } from 'lucide-react';
import AddStageList from './AddStageList';
import { cn } from '@/lib/utils';
import TextField from '@/components/inputs/formik/TextField/TextField';
import { formattedTime } from '@/utils/dateHelper';
import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';
import { useRouteMetrics } from '@/hooks/useRouteMetrics';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { getApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { Checkbox } from '@/components/ui/checkbox';

export default function RouteSection({
  selectOptions,
  values,
  addStage,
  setAddStage,
  routeDetails,
  setRouteDetails,
  services,
  setServices,
  setFieldValue,
  isEdit,
}) {
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

  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Routes');
  }, []);
  const addStagehandle = () => {
    const newStage = {
      id: Date.now() + Math.random().toString(36).substring(2, 15),
      stage: '',
      duration: '',
    };
    setAddStage((prev) => [...prev, newStage]);
  };

  const deleteStageHandler = (id) =>
    setAddStage(addStage.filter((stage) => stage.id !== id));

  const handleFieldChange = (field, value) => {
    // setFieldValue(field, value);
    setRouteDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (values?.serviceTypes) {
      // if (isEdit) return;
      // if (!isEdit) {
      // Create a dictionary of existing services for quick lookup
      const existingServicesMap = services.reduce((map, service) => {
        map[service.id] = service;
        return map;
      }, {});

      // Function to get the updated stage with preserved values
      const getUpdatedStage = (stage, existingStages) => {
        const existingStage =
          existingStages?.find((s) => s.id === stage.id) || {};
        return {
          ...stage,
          check: existingStage.check !== undefined ? existingStage.check : true,
          haltTime: existingStage.haltTime || '',
          duration: existingStage.duration || '',
        };
      };

      const updatedServices = values.serviceTypes.map((service) => {
        const existingService = existingServicesMap[service.id] || {};
        const serviceStages = addStage.map((stage) =>
          getUpdatedStage(stage, existingService.stages)
        );
        return {
          id: service.id,
          service,
          stages: serviceStages,
          type: existingService.type || '',
          category: existingService.category || '',
          distance: existingService.distance || '',
          deadRunDistance: existingService.deadRunDistance || '',
          destinationDuration: existingService.destinationDuration || '',
          time: existingService.time || '',
          estimatedTime: existingService.estimatedTime || '',
          stops: existingService?.stops || 0,
        };
      });

      setServices(updatedServices);
      setRouteDetails((prevDetails) => ({
        ...prevDetails,
        services: updatedServices,
        stages: addStage,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.serviceTypes, addStage, isEdit]);

  const checkRoute = useMutation({
    mutationKey: ['checkRoute'],
    mutationFn: async (data) =>
      await getApi(
        `${APIS.GET_ALL_ROUTES}/checkRoute?origin=${data.origin}&destination=${data.destination}`
      ).then((res) => {
        if (res.data.length != 0) {
          if (!isEdit) {
            toast.error(`${res.data.length} routes Already Exists.`);
          }
        }
        return res;
      }),
  });

  useEffect(() => {
    setFieldValue(
      'name',
      setRouteName({
        origin: routeDetails.origin.label,
        destination: routeDetails.destination.label,
        via: routeDetails.via.label,
      })
    );

    if (routeDetails.origin && routeDetails.destination) {
      checkRoute.mutate({
        origin: routeDetails.origin.id,
        destination: routeDetails.destination.id,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDetails.origin, routeDetails.destination, routeDetails.via]);

  return (
    <div className="w-full flex flex-col">
      <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
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
          defaultValue={routeDetails.originWorkshop.value}
          name="originWorkshop"
          placeholder="Select Origin Workshop"
          options={selectOptions}
          callback={(value) => {
            handleFieldChange('originWorkshop', value);
          }}
          useFormik={false}
          isRequired
        />
        <CustomFormikDropdownInput
          label="Origin"
          lablePrefix={<div className="route-circle route-stage-start"></div>}
          defaultValue={routeDetails.origin.value}
          name="origin"
          placeholder="Select Origin"
          options={selectOptions}
          callback={(value) => {
            if (routeDetails.destination.value === value.value) {
              toast.error(
                `Pleash select different Origin. It is already selected as Destination.`
              );
            }
            handleFieldChange('origin', value);
          }}
          useFormik={false}
          isRequired
        />
        <CustomFormikDropdownInput
          label="Destination"
          lablePrefix={<div className="route-circle route-stage-end"></div>}
          defaultValue={routeDetails.destination.value}
          name="destination"
          placeholder="Select Destination"
          options={selectOptions}
          callback={(value) => {
            if (routeDetails.origin.value === value.value) {
              toast.error(
                `Pleash select different Destination. It is already selected as Origin.`
              );
            }
            handleFieldChange('destination', value);
          }}
          useFormik={false}
          isRequired
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
          defaultValue={routeDetails.destinationWorkshop.value}
          name="destinationWorkshop"
          placeholder="Select Destination"
          options={selectOptions}
          callback={(value) => {
            handleFieldChange('destinationWorkshop', value);
          }}
          useFormik={false}
          isRequired
        />
        <CustomFormikDropdownInput
          label="Via"
          lablePrefix={<div className="route-circle route-stage-waiting"></div>}
          defaultValue={routeDetails.via.value}
          name="via"
          placeholder="Select Via"
          options={selectOptions}
          callback={(value) => {
            handleFieldChange('via', value);
          }}
          useFormik={false}
          isRequired
        />
      </section>
      {console.log(checkRoute.data?.data && checkRoute.data?.data.length > 0)}
      {checkRoute.data?.data && checkRoute.data?.data.length > 0 && (
        <section className="flex flex-col gap-2 p-4 h-full">
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

      <section className="flex flex-col md:flex-row border-t border-[#dcdcdc] gap-4 p-4 h-full">
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
          <AddStageList
            addStage={addStage}
            setAddStage={setAddStage}
            selectOptions={selectOptions}
            deleteStageHandler={deleteStageHandler}
          />
          <section className="px-4 py-2">
            <TextField
              labelName="Destination"
              labelClassName="!text-white"
              placeholder={'Destination'}
              id="time"
              value={routeDetails.destination.label}
              isRequired
              disabled
            />
          </section>
        </section>

        <section className="overflow-x-auto scrollbar flex flex-col md:flex-row md:w-[calc(100vw-332px)] gap-4">
          {services.map((service, index) => (
            <ServiceManager
              key={index}
              index={index}
              service={service}
              setRouteDetails={setRouteDetails}
              routeDetails={routeDetails}
            />
          ))}
          {services.length === 0 && (
            <div className="text-center text-sm font-medium text-gray-400 w-full flex items-center justify-center">
              No Services
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

function ServiceManager({ service, routeDetails, setRouteDetails, index }) {
  const { calculateDistanceAndTime } = useRouteMetrics();
  const [isLoading, setIsLoading] = useState(false);
  // Determine background color based on index
  const isEven = index % 2 === 0;
  const color = isEven
    ? {
        primary: 'bg-[#CDE9F6]',
        secondary: 'bg-[#7EC0DF]',
        icon: 'text-[#4491B6]',
      }
    : {
        primary: 'bg-white',
        secondary: 'bg-[#EAF8FF]',
        icon: 'text-[#4491B6]',
      };

  const handleChange = (value, field) => {
    setRouteDetails((prevDetails) => {
      const updatedServices = [...prevDetails.services];
      updatedServices[index][field] = value;
      return {
        ...prevDetails,
        services: updatedServices,
      };
    });
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      let originToDestinationWaypoints = [];
      service.stages
        .map((stage) => (stage.check === true ? stage : null))
        .filter((stage) => stage)
        .map((stage) => {
          if (stage.stage.lat) {
            originToDestinationWaypoints.push({
              lat: stage.stage.lat,
              lng: stage.stage.lng,
            });
          }
        });

      const originToDestinationPoints = {
        origin: {
          lat: routeDetails.origin.lat,
          lng: routeDetails.origin.lng,
        },
        destination: {
          lat: routeDetails.destination.lat,
          lng: routeDetails.destination.lng,
        },
        waypoints: originToDestinationWaypoints,
      };

      const { totalDistance: runKm } = await calculateDistanceAndTime(
        originToDestinationPoints
      );
      handleChange(runKm, 'distance');

      // deadRunDistance

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

      handleChange(deadRunDistance, 'deadRunDistance');

      handleChange(
        service.stages
          .map((service) => service.check === true)
          .filter((check) => check).length + 2,
        'stops'
      );

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // toast.error(
      //   'Please select origin, destination, origin workshop and destination workshop'
      // );
    }
  };

  useEffect(() => {
    if (
      routeDetails.originWorkshop.lat &&
      routeDetails.origin.lat &&
      routeDetails.destination.lat &&
      routeDetails.destinationWorkshop.lat
    ) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDetails.stages]);

  return (
    <section
      className={cn(
        `w-full md:max-w-[250px] md:min-w-[250px] border border-[#dcdcdc] rounded-md h-full text-black`,
        color.primary
      )}
      key={index}
    >
      <div className="p-4 font-semibold flex justify-between text-base h-14">
        {service?.service.label}
        <div
          className={cn(
            'flex p-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer'
          )}
          onClick={handleClick}
        >
          <RotateCwIcon
            className={cn('w-4 h-4 p-0.5', isLoading && 'animate-spin')}
          />{' '}
        </div>
      </div>
      <div
        className={cn(
          'px-4 py-2 border-y border-[#dcdcdc] text-sm font-medium flex',
          color.secondary
        )}
      >
        <div className="ml-6">
          Halt
          <span className="text-red-500">*</span>
        </div>
        <div className="ml-16">
          Run
          <span className="text-red-500">*</span>
        </div>
      </div>
      <section className="flex flex-col gap-2 my-2">
        {service?.stages.map((stage, stageIndex) => (
          <ServiceManagerItem
            key={stageIndex}
            stage={stage}
            setRouteDetails={setRouteDetails}
            serviceIndex={index}
            stageIndex={stageIndex}
          />
        ))}
        {service?.stages.length === 0 && (
          <div className="text-center text-sm font-medium text-gray-400 w-full flex items-center justify-center md:h-full py-2">
            No Stages
          </div>
        )}

        <section className="grid gap-2 px-4 pt-2 border-t border-[#dcdcdc]">
          <TextField
            labelName="Destination Duration"
            placeholder={'00:00'}
            id="destinationDuration"
            value={service.destinationDuration}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9:]*$/.test(value)) {
                if (value.length <= 5) {
                  handleChange(value, 'destinationDuration');
                }
              }
            }}
            onBlur={() =>
              handleChange(
                formattedTime(service.destinationDuration),
                'destinationDuration'
              )
            }
            isRequired
          />
          <TextField
            labelName="Dead Km"
            placeholder={'Dead Km'}
            id="deadRunDistance"
            value={service.deadRunDistance}
            onChange={(e) => handleChange(e.target.value, 'deadRunDistance')}
            disabled
          />
          <TextField
            labelName="Run Km"
            placeholder={'Run Km'}
            id="distance"
            value={service.distance}
            onChange={(e) => handleChange(e.target.value, 'distance')}
            disabled
          />
          <TextField
            labelName="Stops"
            placeholder={'Stops'}
            id="stops"
            value={service.stops}
            onChange={(e) => handleChange(e.target.value, 'stops')}
            disabled
          />
        </section>
      </section>
    </section>
  );
}

function ServiceManagerItem({
  stage,
  setRouteDetails,
  serviceIndex,
  stageIndex,
}) {
  const handleStageChange = (value, field) => {
    setRouteDetails((prevDetails) => {
      const updatedServices = [...prevDetails.services];
      const updatedStages = [...updatedServices[serviceIndex].stages];
      updatedStages[stageIndex] = {
        ...updatedStages[stageIndex],
        [field]: value,
      };
      updatedServices[serviceIndex].stages = updatedStages;
      return {
        ...prevDetails,
        services: updatedServices,
      };
    });
  };

  return (
    <div className="w-full h-fit flex items-center justify-center px-4 gap-2">
      <Checkbox
        checked={stage.check} // Ensure the checked prop is boolean
        onCheckedChange={(e) => handleStageChange(e, 'check')}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextField
          labelName={`Stage ${stageIndex + 1}`}
          name="haltTime"
          placeholder="00:00"
          value={stage.haltTime || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9:]*$/.test(value)) {
              if (value.length <= 5) {
                handleStageChange(e.target.value, 'haltTime');
              }
            }
          }}
          onBlur={() =>
            handleStageChange(formattedTime(stage.haltTime), 'haltTime')
          }
        />
        <div className="mt-[20px]">
          <TextField
            name="duration"
            placeholder="00:00"
            value={stage.duration || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9:]*$/.test(value)) {
                if (value.length <= 5) {
                  handleStageChange(value, 'duration');
                }
              }
            }}
            onBlur={() =>
              handleStageChange(formattedTime(stage.duration), 'duration')
            }
          />
        </div>
      </div>
    </div>
  );
}
