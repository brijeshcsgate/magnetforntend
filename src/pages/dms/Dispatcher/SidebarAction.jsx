import { formatDate } from '@/utils/dateHelper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DateInput } from '../TimeTable/AddEditTimeTable/DateTimeInput';
import { Slider } from '@/components/ui/slider';

export default function SidebarAction({ selectedDate, setSelectedDate }) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // Set initial slider value based on current time
    const currentHours = selectedDate.getHours();
    const currentMinutes = selectedDate.getMinutes();
    setSliderValue(((currentHours * 60 + currentMinutes) / 1440) * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTodayClick = () => {
    const now = new Date();
    setSelectedDate(now);
    setSliderValue(((now.getHours() * 60 + now.getMinutes()) / 1440) * 100);
  };

  const handleArrowClick = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value[0]);
    const newDate = new Date(selectedDate);
    const totalMinutes = Math.floor((value[0] / 100) * 1440);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    newDate.setHours(hours, minutes, 0, 0);
    setSelectedDate(newDate);
  };

  return (
    <aside className="bg-blue-primary-200 p-4 h-[calc(100vh-71px)] w-[200px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="text-white font-semibold text-4xl">
            {formatDate(selectedDate, 'time')}
          </div>
        </div>
        <div className="flex flex-col gap-2.5 border-b pb-4 border-[#1463B0]">
          <DateInput
            useFormik={false}
            name="date"
            defaultValue={selectedDate}
            callback={setSelectedDate}
          />
          <div className="flex items-center justify-start gap-4">
            <div
              className="cursor-pointer bg-white h-8 w-fit px-2.5 flex items-center justify-center rounded-md text-xs font-semibold text-blue-primary-200"
              onClick={handleTodayClick}
            >
              Today
            </div>

            <div className="flex divide-x-2">
              <div
                className="cursor-pointer bg-white w-fit p-2 flex items-center justify-center rounded-s-md text-xs font-semibold text-[#A0A3A7] hover:text-[#7C7E81]"
                onClick={() => handleArrowClick(-1)}
              >
                <ChevronLeft className="size-4" />
              </div>
              <div
                className="cursor-pointer bg-white w-fit p-2 flex items-center justify-center rounded-e-md text-xs font-semibold text-[#A0A3A7] hover:text-[#7C7E81]"
                onClick={() => handleArrowClick(1)}
              >
                <ChevronRight className="size-4" />
              </div>
            </div>
          </div>
          <Slider
            value={[sliderValue]}
            max={100}
            step={1}
            className="w-full pt-4"
            onValueChange={handleSliderChange}
          />
        </div>
      </div>
    </aside>
  );
}
