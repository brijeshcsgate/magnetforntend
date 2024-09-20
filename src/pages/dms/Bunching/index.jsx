import { Container, Heading } from '@/components/AddFormLayout/AddFormLayout';

import { Button } from '@/components/ui/button';
import { BusFrontIcon, EllipsisIcon } from 'lucide-react';
import { Bunching, BunchingGrowthIcon } from '@/components/icons';
import { CustomSelect } from '@/components/common/CustomSelect';
import VehicleTimelineChart from './vehicle-timeline-chart';
import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { useContext } from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { useEffect } from 'react';

const fetchRoutesData = async (inputValue, page) => {
  const limit = 15;
  const response = await apiService.get(`${APIS.GET_ALL_ROUTES}`, {
    params: {
      limit,
      page: page || 0,
      search: inputValue || null,
      sortBy: 'name',
      order: 'asc',
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

const VehicleBunching = () => {
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Bunching');
  }, []);

  const data = [
    {
      time: '07:00',
      stage: 'Gorakhpur',
      stageKey: 0,
      UP321234: 0,
      UP321567: null,
      UP329012: null,
    },
    {
      time: '08:00',
      stage: 'Barhalganj',
      stageKey: 1,
      UP321234: 1,
      UP321567: 0,
      UP329012: null,
    },
    {
      time: '09:00',
      stage: 'Azamgarh',
      stageKey: 2,
      UP321234: 2,
      UP321567: 1,
      UP329012: 0,
    },
    {
      time: '10:00',
      stage: 'Jaunpur',
      stageKey: 3,
      UP321234: 3,
      UP321567: 3,
      UP329012: 2,
    },
    {
      time: '11:00',
      stage: 'Badshahpur',
      stageKey: 4,
      UP321234: 3,
      UP321567: 4,
      UP329012: 3,
    },
    {
      time: '12:00',
      stage: 'Azamgarh',
      stageKey: 5,
      UP321234: 4,
      UP321567: 4,
      UP329012: 5,
    },
    {
      time: '13:00',
      stage: 'Prayagraj',
      stageKey: 6,
      UP321234: 5,
      UP321567: 6,
      UP329012: 6,
    },
    {
      time: '14:00',
      stage: 'Prayagraj Workshop',
      stageKey: 7,
      UP321234: 7,
      UP321567: 7,
      UP329012: 7,
    },
  ];

  const stageNames = data.map((d) => d.stage);

  stageNames.push('Time');

  return (
    <Container>
      <section className="p-4 bg-blue-primary-200 flex items-center justify-between">
        <div className="flex gap-4 min-w-max max-w-2xl">
          <CustomSelect
            name="routeSelect1"
            fetchData={fetchRoutesData}
            selectProps={{
              placeholder: 'Select Route',
              isClearable: true,
            }}
            defaultValue={{
              value: '66dae9ec833c0ce54a1db2cb',
              label: 'Gorakhpur to Prayagraj via Azamgarh',
            }}
          />
          <CustomSelect
            name="routeSelect2"
            selectProps={{
              placeholder: ' Select Vehicle',
              isClearable: true,
              isDisabled: true,
            }}
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <div className="flex items-center bg-white rounded-md p-0.5 px-1 gap-1 h-8">
            <Button
              variant="outline"
              size="icon"
              className="group border-0 min-w-6 h-6"
            >
              <Bunching className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="group border-0 min-w-6 h-6"
            >
              <BunchingGrowthIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="group border-0 min-w-6 h-6"
            >
              <BusFrontIcon className="size-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="group hover:border-white"
          >
            <EllipsisIcon />
          </Button>
        </div>
      </section>
      <div className="w-full h-[calc(100vh-59px-64px)] grid grid-cols-6 bg-[#002850]">
        <div className="col-span-1 flex flex-col px-4 gap-2  justify-between my-6 mt-4">
          {stageNames.reverse().map((d, idx) => (
            <div key={idx} className="text-white text-md truncate">
              {d}
            </div>
          ))}
        </div>
        <div className="col-span-5 bg-white">
          <VehicleTimelineChart data={data} />
        </div>
      </div>{' '}
    </Container>
  );
};
export default VehicleBunching;
