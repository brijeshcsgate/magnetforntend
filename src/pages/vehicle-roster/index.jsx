import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const VehicleRoster = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Vehicle Roaster');
  }, []);
  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default VehicleRoster;
