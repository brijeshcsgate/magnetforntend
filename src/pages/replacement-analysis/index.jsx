import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const ReplacementAnalysis = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Replacement Analysis');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default ReplacementAnalysis;
