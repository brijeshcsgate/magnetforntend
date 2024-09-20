import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const HRM = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('HRM');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default HRM;
