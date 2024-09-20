import SidebarAction from './SidebarAction';
import { useContext, useEffect, useState } from 'react';
import DriverTable from './DriverTable';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

export default function DispatcherView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Dispatcher');
  }, []);

  return (
    <section className="flex bg-white shadow-md overflow-hidden h-[calc(100vh-71px)] w-full">
      <SidebarAction
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <section className="h-[calc(100vh-71px)] w-[calc(100%-200px)]">
        <DriverTable selectedDate={selectedDate} />
      </section>
    </section>
  );
}
