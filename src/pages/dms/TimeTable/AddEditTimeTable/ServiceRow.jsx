import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';
import MultiSelectDropdown from '@/components/ui/MultiSelectDropdown';
import TextField from './TextField';
import { formattedTime } from '@/utils/dateHelper';
import { DateTimeInput } from './DateTimeInput';
import { minusIcon, plusIcon } from '@/assets/Icons';
import { TableCell } from '@/components/ui/table';
import { DateTimePickerInput } from '@/components/common/DateTimeInputs';

export default function ServiceRow({
  item,
  index,
  handleFieldChange,
  vehicle,
  frequencyOptions,
  route,
  selectedData,
  setSelectedData,
}) {
  const handleIncrement = () => {
    if (item.buses < 99) {
      handleFieldChange(index, 'buses', item.buses + 1);
      handleFieldChange(index, 'frequency', '');
    }
  };

  const handleDecrement = () => {
    if (item.buses > 1) {
      handleFieldChange(index, 'buses', item.buses - 1);
      handleFieldChange(index, 'vehicles', []);
      handleFieldChange(index, 'frequency', '');
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        vehicles: [],
      }));
    }
  };

  const handleFrequencyChange = (value) => {
    handleFieldChange(index, 'frequency', value);

    let newVehiclesTimeTable = [];
    let currentStartTime = new Date(item.startDate);
    let headwayMinutes =
      parseInt(item.headway.split(':')[0]) * 60 +
      parseInt(item.headway.split(':')[1]);
    let haltTime = 0; // Adjust this value based on your requirements

    const currentService = route.outbound.services.find(
      (serviceItem) => serviceItem.service.id === item.service.id
    );
    const isDriver2 = currentService?.category?.distance >= 300 ? true : false;

    // Ensure to use existing timetable data if available, otherwise create new entries
    for (let i = 0; i < item.buses; i++) {
      let existingVehicleTimeTable =
        item.vehiclesTimeTable && item.vehiclesTimeTable[i];
      newVehiclesTimeTable.push({
        startTime: new Date(
          existingVehicleTimeTable?.startTime || currentStartTime.toISOString()
        ),
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        frequency: value,
        vehicle: item.vehicles[i] || existingVehicleTimeTable?.vehicle || '', // Use existing vehicle or autofill if available
        driver1: existingVehicleTimeTable?.driver1 || undefined,
        isDriver2: isDriver2,
        driver2: existingVehicleTimeTable?.driver2 || undefined,
        conductor: existingVehicleTimeTable?.conductor || undefined,
        noOfTrips: existingVehicleTimeTable?.noOfTrips || 1,
        tripsBreak: existingVehicleTimeTable?.tripsBreak || null,
        days: {
          M: true,
          T1: true,
          W: true,
          T2: true,
          F: true,
          S1: true,
          S2: true,
        },
      });

      currentStartTime = new Date(
        currentStartTime.getTime() + headwayMinutes * 60000 + haltTime * 60000
      );
    }

    handleFieldChange(index, 'vehiclesTimeTable', newVehiclesTimeTable);
  };

  return (
    <>
      <TableCell className="bg-[#227FD9] text-white font-semibold truncate text-xs">
        {item.service.name.english}
      </TableCell>
      <TableCell>
        <TextField
          suffix={
            <div
              className="w-full flex items-center justify-center h-full cursor-pointer"
              onClick={handleIncrement}
            >
              {plusIcon({
                className: 'w-4 h-4 text-gray-400',
              })}
            </div>
          }
          prefix={
            <div
              className="w-full flex items-center justify-center h-full cursor-pointer"
              onClick={handleDecrement}
            >
              {minusIcon({
                className: 'w-4 h-4 text-gray-400',
              })}
            </div>
          }
          placeholder="00"
          name="buses"
          value={item.buses.toString()}
          className="col-span-1"
        />
      </TableCell>
      <TableCell>
        <DateTimePickerInput
          defaultValue={item.startDate}
          placeholder="Start Date & Time"
          useFormik={false}
          minDate={new Date(new Date())}
          maxDate={item.endDate}
          onChange={(e) => {
            handleFieldChange(index, 'startDate', new Date(e));
          }}
        />
      </TableCell>
      <TableCell>
        <DateTimePickerInput
          defaultValue={item.endDate}
          placeholder="End Date & Time"
          useFormik={false}
          minDate={item.startDate}
          maxDate={
            new Date(
              new Date(item.startDate).setMonth(new Date().getMonth() + 3)
            )
          }
          onChange={(e) => {
            handleFieldChange(index, 'endDate', new Date(e));
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          placeholder="00:00"
          name="headway"
          value={item.headway}
          onBlur={() => {
            handleFieldChange(index, 'headway', formattedTime(item.headway));
          }}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9:]*$/.test(value) && value.length <= 5) {
              handleFieldChange(index, 'headway', value);
            }
          }}
          disabled={!item.endDate}
        />
      </TableCell>
      <TableCell>
        <MultiSelectDropdown
          options={vehicle.options}
          name="vehicles"
          defaultValue={item.vehicles}
          callback={(value) => {
            handleFieldChange(index, 'vehicles', value);

            let checkVehicles = selectedData.vehicles.find(
              (v) => v.id === value.id
            );

            if (!checkVehicles) {
              setSelectedData((prevState) => ({
                ...prevState,
                vehicles: [...prevState.vehicles, value],
              }));
            }
          }}
          maxSelected={parseInt(item.buses)}
          isDisabled={!item.headway}
        />
      </TableCell>
      <TableCell>
        <CustomFormikDropdownInput
          useFormik={false}
          defaultValue={item?.frequency?.value}
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
          callback={handleFrequencyChange}
          isDisabled={!item.vehicles.length}
        />
      </TableCell>
    </>
  );
}
