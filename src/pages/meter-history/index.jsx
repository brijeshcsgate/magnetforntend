import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const MasterHistory = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Meter History');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default MasterHistory;
