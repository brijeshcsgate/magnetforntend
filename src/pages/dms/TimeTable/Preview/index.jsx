import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import LoadingScreen from '@/components/LoadingScreen';
import { ROUTES } from '@/constants/route.constant';
import { TimeTableService } from '@/services/TimeTableService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import TimeTablesTable from './TimeTablesTable';
import { useContext, useEffect } from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function Index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Time Table');
  }, []);

  const fetchTimeTable = useQuery({
    queryKey: ['timeTable', id],
    queryFn: () =>
      TimeTableService.getTimeTableById(id).then((res) => {
        return res.data.data;
      }),
  });

  if (fetchTimeTable.isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <LoadingScreen className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]">
          <div className="head p-4 border-b border-[#dcdcdc]">
            <div>
              <BreadCrumbs
                backNavi={() => navigate(ROUTES.TIME_TABLE)}
                boldItem="Time Table"
              />
              <div className="font-semibold text-2xl text-[#002850]">
                ({fetchTimeTable?.data?.timeTableCode}){' '}
                {fetchTimeTable?.data?.route?.name}
              </div>
            </div>

            <div className="flex gap-3 flex-col sm:flex-row"></div>
          </div>
          <TimeTablesTable timetables={fetchTimeTable?.data} />
        </div>
      </div>
    </>
  );
}
