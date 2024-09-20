import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const AccountFinance = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Account & Finance');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default AccountFinance;
