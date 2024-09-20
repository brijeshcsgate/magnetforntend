import { DateInput, TimePickerInput } from './DateTimeInput';
import { minusIcon, plusIcon } from '@/assets/Icons';
import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';
import TextField from './TextField';
import { formattedTime } from '@/utils/dateHelper';
import { BusFrontIcon, Trash2Icon } from 'lucide-react';
import { CustomSelect } from '@/components/common/CustomSelect';

export default function ServiceSection({
  idx,
  sIdx,
  vehicle,
  frequencyOptions,
  driver,
  conductor,
  setTimeTables,
  vehiclesTimeTable,
  services,
}) {
  const handleTableFieldChange = (index, fieldName, newValue) => {
    setTimeTables((prevTables) =>
      prevTables.map((table, i) =>
        i === index
          ? {
              ...table,
              vehiclesTimeTable: table.vehiclesTimeTable.map(
                (vehicleTable, idx) =>
                  idx === sIdx
                    ? { ...vehicleTable, [fieldName]: newValue }
                    : vehicleTable
              ),
            }
          : table
      )
    );
  };
  const removeTable = (serviceIdx, tableIdx) => {
    setTimeTables((prevTables) =>
      prevTables.map((service, i) =>
        i === tableIdx
          ? {
              ...service,
              vehiclesTimeTable: service.vehiclesTimeTable.filter(
                (_, idx) => idx !== serviceIdx
              ),
            }
          : service
      )
    );
  };
  return (
    <>
      <section className="p-4 bg-blue-primary-100 w-full flex justify-between items-center">
        <div className="bg-white w-fit text-blue-primary-200 px-2 py-1 rounded-md text-xs font-semibold flex gap-1 items-center justify-center">
          <BusFrontIcon className="w-4 h-4 " />
          <span>
            {String(sIdx + 1).padStart(2, '0')} /{' '}
            {String(services.vehiclesTimeTable.length).padStart(2, '0')}
          </span>
        </div>
        <div
          className="text-blue-primary-200 text-sm flex cursor-pointer font-medium"
          onClick={() => removeTable(sIdx, idx)}
        >
          <Trash2Icon className="w-4 h-4 mr-2" /> Remove this service
        </div>
      </section>
      <section className="p-4 pt-0" key={idx}>
        <section className="grid grid-cols-4 gap-4">
          <TimePickerInput
            labelName="Start Time"
            placeholder="00:00"
            useFormik={false}
            defaultValue={vehiclesTimeTable.startTime}
            callback={(time) => {
              handleTableFieldChange(idx, 'startTime', new Date(time));
            }}
          />
          <DateInput
            labelName="Start Date"
            placeholder="Select a date"
            minDate={new Date()}
            useFormik={false}
            defaultValue={vehiclesTimeTable.startDate}
            callback={(date) =>
              handleTableFieldChange(idx, 'startDate', new Date(date))
            }
          />
          <DateInput
            labelName="End Date"
            placeholder="Select a date"
            minDate={vehiclesTimeTable.startDate}
            useFormik={false}
            defaultValue={vehiclesTimeTable.endDate}
            callback={(date) =>
              handleTableFieldChange(idx, 'endDate', new Date(date))
            }
          />
          <CustomFormikDropdownInput
            label="Frequency"
            useFormik={false}
            defaultValue={vehiclesTimeTable.frequency.value}
            placeholder="Frequency"
            options={{
              options: frequencyOptions,
              data: [
                {
                  title: 'All Frequency',
                  options: frequencyOptions,
                },
              ],
            }}
            name="frequency"
            callback={(value) =>
              handleTableFieldChange(idx, 'frequency', value)
            }
          />
          <CustomFormikDropdownInput
            label="Vehicle"
            useFormik={false}
            defaultValue={vehiclesTimeTable.vehicle.value}
            placeholder="Vehicle"
            options={{
              options: vehicle.options,
              data: [
                {
                  title: 'All Vehicle',
                  options: vehicle.options,
                },
              ],
            }}
            name="Vehicle"
            callback={(value) => handleTableFieldChange(idx, 'vehicle', value)}
          />
          <CustomSelect
            name="driver1"
            label="Driver 1"
            fetchData={driver}
            selectProps={{
              placeholder: 'Search...',
              isClearable: true,
            }}
            onChange={(value) => {
              handleTableFieldChange(idx, 'driver1', value.value);
            }}
          />
          <CustomSelect
            name="driver2"
            label="Driver 2"
            fetchData={driver}
            selectProps={{
              placeholder: 'Search...',
              isClearable: true,
              isDisabled: !vehiclesTimeTable.isDriver2,
            }}
            onChange={(value) => {
              handleTableFieldChange(idx, 'driver2', value.value);
            }}
          />
          <CustomSelect
            name="conductor"
            label="Conductor"
            fetchData={conductor}
            selectProps={{
              placeholder: 'Search...',
              isClearable: true,
            }}
            onChange={(value) => {
              handleTableFieldChange(idx, 'conductor', value.value);
            }}
          />
          {/* <CustomFormikDropdownInput
            defaultValue={vehiclesTimeTable?.conductor?.value}
            label="Conductor"
            useFormik={false}
            placeholder="Conductor"
            options={{
              options: conductor.options,
              data: [
                {
                  title: 'All Conductor',
                  options: conductor.options,
                },
              ],
            }}
            name="Conductor"
            callback={(date) => handleTableFieldChange(idx, 'conductor', date)}
          /> */}
          <TextField
            labelName="No of Trips"
            suffix={
              <div
                className="w-full flex items-center justify-center h-full cursor-pointer"
                onClick={() => {
                  if (vehiclesTimeTable.noOfTrips < 99) {
                    handleTableFieldChange(
                      idx,
                      'noOfTrips',
                      vehiclesTimeTable.noOfTrips + 1
                    );
                  }
                }}
              >
                {plusIcon({
                  className: 'w-4 h-4 text-gray-400',
                })}
              </div>
            }
            prefix={
              <div
                className="w-full flex items-center justify-center h-full cursor-pointer"
                onClick={() => {
                  if (vehiclesTimeTable.noOfTrips > 1) {
                    handleTableFieldChange(
                      idx,
                      'noOfTrips',
                      vehiclesTimeTable.noOfTrips - 1
                    );
                  }
                }}
              >
                {minusIcon({
                  className: 'w-4 h-4 text-gray-400',
                })}
              </div>
            }
            placeholder="00"
            name="noOfTrips"
            value={vehiclesTimeTable.noOfTrips.toString()}
            disabled={vehiclesTimeTable.frequency.value === 'radial'}
          />
          <TextField
            labelName="Trips Break"
            placeholder="00:00"
            name="tripsBreak"
            value={vehiclesTimeTable.tripsBreak}
            onBlur={() => {
              handleTableFieldChange(
                idx,
                'tripsBreak',
                formattedTime(vehiclesTimeTable.tripsBreak)
              );
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9:]*$/.test(value) && value.length <= 5) {
                handleTableFieldChange(idx, 'tripsBreak', value);
              }
            }}
            disabled={vehiclesTimeTable.frequency.value === 'radial'}
          />
          <DaysPicker
            days={vehiclesTimeTable.days}
            handleDays={handleTableFieldChange}
            idx
          />
        </section>
      </section>
    </>
  );
}

export function DaysPicker({ days, handleDays, idx, label = 'Select Days' }) {
  const toggleDay = async (day) => {
    const selectedDays = (days[day] = !days[day]);

    handleDays(idx, 'days', selectedDays);
  };

  return (
    <section className="flex flex-col gap-0.5 w-full">
      {label && (
        <label className="to-label c-black v-center" htmlFor="daysPicker">
          Select Days
        </label>
      )}
      <div className="flex items-center gap-2 h-8 justify-start">
        <DayCheck name="M" selected={days.M} onClick={() => toggleDay('M')} />
        <DayCheck name="T" selected={days.T1} onClick={() => toggleDay('T1')} />
        <DayCheck name="W" selected={days.W} onClick={() => toggleDay('W')} />
        <DayCheck name="T" selected={days.T2} onClick={() => toggleDay('T2')} />
        <DayCheck name="F" selected={days.F} onClick={() => toggleDay('F')} />
        <DayCheck name="S" selected={days.S1} onClick={() => toggleDay('S1')} />
        <DayCheck name="S" selected={days.S2} onClick={() => toggleDay('S2')} />
      </div>
    </section>
  );
}

function DayCheck({ name, selected, onClick }) {
  return (
    <div className="w-6 h-6">
      <div
        onClick={onClick}
        className={`flex items-center gap-1 border border-border-primary size-6 rounded-full justify-center text-xs ${
          selected ? 'bg-blue-primary-200 text-white' : 'text-gray-primary'
        }  cursor-pointer`}
      >
        {name}
      </div>
    </div>
  );
}
