import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const Reports = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Reports');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default Reports;
