import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { ROUTES } from '@/constants/route.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteService } from '@/services/RouteService';
import { useContext, useEffect, useState } from 'react';
import { editIcon1, settingFillIcon } from '@/assets/Icons';
import RouteInformations from './RouteInformation';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function PreviewRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const boldItems = 'Route';
  const [pageData, setPageData] = useState({});
  const [outboundRouteDetails, setOutboundRouteDetails] = useState({});
  const [inboundRouteDetails, setInboundRouteDetails] = useState({});
  const [isInbound, setIsInbound] = useState(false);

  const [routeInfo, setRouteInfo] = useState([]);

  const {setCount } = useContext(CounterContext);
  useEffect(() => { 
    setCount('Routes');
  }, []);
  const fetchRoutes = useQuery({
    queryKey: ['route', id],
    queryFn: () =>
      RouteService.getRouteById(id).then((res) => {
        const data = res.data.data;
        setPageData(data);

        setRouteInfo([
          { title: 'Route Code', value: data.routeCode },
          { title: 'Route Name', value: data.name },
          {
            title: 'Route Type',
            value: data.outbound.services[0]?.type.name.english,
          },
          {
            title: 'Route Category',
            value: data.outbound.services[0]?.category?.name?.english || '-',
          },
          { title: 'Stages', value: data.outbound.stages.length },
          {
            title: 'Total Run (Km)',
            value: data.outbound.services[0].distance,
          },
          {
            title: 'Dead Run (Km)',
            value: data.outbound.services[0].deadRunDistance,
          },
        ]);

        setOutboundRouteDetails(data.outbound);
        if (data.isInbound) {
          setIsInbound(true);
          setInboundRouteDetails(data.inbound);
        }

        return data;
      }),
  });

  if (fetchRoutes.isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <LoadingScreen className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="w-full bg-white shadow-md flex-grow overflow-auto  h-[calc(100vh-71px)]">
          <div className="flex justify-between p-4 border-b border-[#dcdcdc]">
            <div>
              <BreadCrumbs
                backNavi={() => navigate(ROUTES.ROUTE)}
                boldItem={boldItems}
              />
              <div className="font-semibold text-2xl text-[#002850]">
                {pageData.name}
              </div>
            </div>

            <div className="flex gap-3 flex-col sm:flex-row">
              {fetchRoutes.data?.timeTable ? null : (
                <Button
                  type="submit"
                  onClick={() => {
                    navigate(`${ROUTES.ROUTE}/edit/${id}`);
                  }}
                >
                  {editIcon1({
                    className: 'w-2 h-2 lg:w-[14px] lg:h-[14px]',
                  })}
                  Edit
                </Button>
              )}
            </div>
          </div>
          <section className="scrollbar overflow-y-scroll h-[calc(100vh-71px-99px)]">
            <RouteInformations routeInfo={routeInfo} />
            <TabSection
              outboundRouteDetails={outboundRouteDetails}
              inboundRouteDetails={inboundRouteDetails}
              isInbound={isInbound}
            />
          </section>
        </div>
      </div>
    </>
  );
}

function TabSection({ outboundRouteDetails, inboundRouteDetails, isInbound }) {
  const [tabStep, setTabStep] = useState(0);

  return (
    <div className="mx-4 bg-[#F5FBFD] border border-[#dcdcdc]">
      <div className="w-full h-fit flex items-center justify-between border-b border-[#dcdcdc] px-4 pt-2 gap-4">
        <div />
        <div className="flex items-center justify-center gap-4">
          <span
            onClick={() => {
              if (tabStep !== 1) return;
              setTabStep(0);
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
          {isInbound && (
            <span
              onClick={() => {
                if (tabStep !== 0) return;
                setTabStep(1);
              }}
              className={cn(
                'text-base font-semibold  cursor-pointer',
                tabStep === 1
                  ? 'border-b-4 border-[#002850] pb-2  text-[#002850]'
                  : 'text-[#23262B] pb-3'
              )}
            >
              INBOUND
            </span>
          )}
        </div>
        <div />
      </div>
      {tabStep === 0 && <RoutePreview routeDetails={outboundRouteDetails} />}

      {isInbound && tabStep === 1 && (
        <RoutePreview routeDetails={inboundRouteDetails} />
      )}
    </div>
  );
}

function RoutePreview({ routeDetails }) {
  const detailsList = [
    {
      lablePrefix: settingFillIcon({
        width: 14,
        height: 14,
        className: 'text-[#00D93D] mr-[6px]',
      }),
      label: 'Origin Workshop',
      value: routeDetails.originWorkshop?.name?.english,
    },
    {
      lablePrefix: <div className="route-circle route-stage-start"></div>,
      label: 'Origin',
      value: routeDetails.origin?.name?.english,
    },
    {
      lablePrefix: <div className="route-circle route-stage-end"></div>,
      label: 'Destination',
      value: routeDetails.destination?.name?.english,
    },
    {
      lablePrefix: settingFillIcon({
        width: 14,
        height: 14,
        className: 'text-[#E81818] mr-[6px]',
      }),
      label: 'Destination Workshop',
      value: routeDetails.destinationWorkshop?.name?.english,
    },
    {
      lablePrefix: <div className="route-circle route-stage-waiting"></div>,
      label: 'Via',
      value: routeDetails.via?.name?.english,
    },
  ];
  return (
    <>
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          {detailsList?.map((item, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div className="col-span-3 flex items-center justify-start text-sm text-[#002850]">
                {item.lablePrefix}
                {item.label}
              </div>
              <div className="col-span-3 text-sm font-semibold text-[#002850] ml-5">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <section className="flex flex-col md:flex-row border-t border-[#dcdcdc] gap-4 p-4 h-full">
          <section className="w-full md:max-w-[300px] md:min-w-[300px] border border-[#dcdcdc] rounded-md bg-[#002850]">
            <div className="p-4 font-semibold flex justify-between text-base h-14 text-white">
              All Stages
            </div>
            <div className="px-4 py-2 border-y bg-[#002850] border-[#dcdcdc] text-sm font-medium text-white">
              <div className="ml-16">Stage Names</div>
            </div>
            <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
              {routeDetails?.stages?.map((stage) => {
                return (
                  <div className="flex md:contents" key={stage._id}>
                    <div className="col-start-2 col-end-4 mx-4 md:mr-10 md:mx-auto relative">
                      <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-0.5 bg-white pointer-events-none"></div>
                      </div>
                      <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-white shadow text-center flex justify-center items-center">
                        <div className="bg-[#002850] w-4 h-4 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-white text-black col-start-4 col-end-12 p-4 rounded-md my-2 mr-4 md:mr-auto w-full">
                      <p className="font-semibold text-justify text-sm truncate">
                        {stage.stage.name.english}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="overflow-x-auto scrollbar flex flex-col md:flex-row md:w-[calc(100vw-332px)] gap-4">
            {routeDetails?.services?.map((service, index) => (
              <ServiceManager key={index} service={service} index={index} />
            ))}
          </section>
        </section>
      </section>
    </>
  );
}

function ServiceManager({ service, index }) {
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

  return (
    <section
      className={cn(
        `w-full md:max-w-[250px] md:min-w-[250px] border border-[#dcdcdc] rounded-md h-full text-black`,
        color.primary
      )}
      key={index}
    >
      <div className="p-4 font-semibold flex justify-between text-base h-14">
        {service?.service.name.english}
      </div>
      <div
        className={cn(
          'px-4 py-2 border-y border-[#dcdcdc] text-sm font-medium',
          color.secondary
        )}
      >
        <div className="ml-6">Halt Time</div>
      </div>
      <section className="flex flex-col ">
        {service?.stages?.map((stage, stageIndex) => (
          <div
            className="col-start-4 col-end-12   my-2 mr-4 md:mr-auto w-full px-4 "
            key={stageIndex}
          >
            <div
              className={cn(
                'p-4 text-black rounded-md',
                isEven ? 'bg-white' : 'bg-[#EAF8FF]'
              )}
            >
              <p className="font-semibold text-justify text-sm">
                {stage.haltTime ? stage.haltTime : 'No Halt Time'}
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="flex flex-col border-t border-[#dcdcdc]">
        <div className="col-start-4 col-end-12 flex flex-col gap-1  my-2 mr-4 md:mr-auto w-full px-4 ">
          <p className="to-label c-black">Dead Km</p>
          <div
            className={cn(
              'p-4 text-black rounded-md',
              isEven ? 'bg-white' : 'bg-[#EAF8FF]'
            )}
          >
            <p className="font-semibold text-justify text-sm">
              {service.deadRunDistance}
            </p>
          </div>
        </div>
        <div className="col-start-4 col-end-12 flex flex-col gap-1  my-2 mr-4 md:mr-auto w-full px-4 ">
          <p className="to-label c-black">Run Km</p>
          <div
            className={cn(
              'p-4 text-black rounded-md',
              isEven ? 'bg-white' : 'bg-[#EAF8FF]'
            )}
          >
            <p className="font-semibold text-justify text-sm">
              {service.distance}
            </p>
          </div>
        </div>
        <div className="col-start-4 col-end-12 flex flex-col gap-1  my-2 mr-4 md:mr-auto w-full px-4 ">
          <p className="to-label c-black">Estimated Time</p>
          <div
            className={cn(
              'p-4 text-black rounded-md',
              isEven ? 'bg-white' : 'bg-[#EAF8FF]'
            )}
          >
            <p className="font-semibold text-justify text-sm">{service.time}</p>
          </div>
        </div>

        <div className="col-start-4 col-end-12 flex flex-col gap-1  my-2 mr-4 md:mr-auto w-full px-4 ">
          <p className="to-label c-black">Stops</p>
          <div
            className={cn(
              'p-4 text-black rounded-md',
              isEven ? 'bg-white' : 'bg-[#EAF8FF]'
            )}
          >
            <p className="font-semibold text-justify text-sm">
              {service.stops}
            </p>
          </div>
        </div>

        <div className="col-start-4 col-end-12 flex flex-col gap-1  my-2 mr-4 md:mr-auto w-full px-4 ">
          <p className="to-label c-black">Estimated Time (UPSRTC)</p>
          <div
            className={cn(
              'p-4 text-black rounded-md',
              isEven ? 'bg-white' : 'bg-[#EAF8FF]'
            )}
          >
            <p className="font-semibold text-justify text-sm">
              {service.estimatedTime}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
