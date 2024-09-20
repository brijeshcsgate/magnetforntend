import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const ExpensesHistory = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Expense History');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default ExpensesHistory;
