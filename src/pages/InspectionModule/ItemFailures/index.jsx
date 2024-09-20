import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const ItemFailures = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Item Failures');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default ItemFailures;
