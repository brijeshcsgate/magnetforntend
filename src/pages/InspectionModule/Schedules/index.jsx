import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const Schedules = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Schedules');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default Schedules;
