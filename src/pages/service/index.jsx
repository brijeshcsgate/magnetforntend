import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const Service = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Service');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default Service;
