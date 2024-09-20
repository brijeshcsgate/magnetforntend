import ComingSoonScreen from "@/components/ComingSoonScreen";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { useContext, useEffect } from "react";

const CrewRoster = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Crew Roster');
  }, []);

  return (
    <>
      <ComingSoonScreen />
    </>
  );
};
export default CrewRoster;
