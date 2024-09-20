import ServicesData from './ServicesData';
import ServiceRow from './ServiceRow';
import React, { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TableView({
  route,
  setVehicle,
  vehicle,
  resetData,
  driver,
  conductor,
  timeTables,
  setTimeTables,
  selectedData,
  setSelectedData,
}) {
  useEffect(() => {
    if (route === undefined || route === null) {
      resetData();
    } else {
      const service = route?.serviceTypes?.map((service) => ({
        service: service,
        buses: 1,
        startDate: new Date(
          new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
            7,
            0,
            0,
            0
          )
        ),
        endDate: new Date(
          new Date(new Date().setMonth(new Date().getMonth() + 1)).setHours(
            20,
            0,
            0,
            0
          )
        ),
        headway: '00:10',
        vehicles: [],
        frequency: undefined,
        vehiclesTimeTable: [],
      }));
      setTimeTables(service);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const handleFieldChange = (index, fieldName, newValue) => {
    setTimeTables((prevTables) =>
      prevTables?.map((table, i) =>
        i === index ? { ...table, [fieldName]: newValue } : table
      )
    );
  };
  const frequencyOptions = [
    {
      id: '1',
      label: 'Circular',
      value: 'circular',
    },
    {
      id: '2',
      label: 'Radial',
      value: 'radial',
    },
    {
      id: '3',
      label: 'Loop',
      value: 'loop',
    },
  ];

  const BUS_SEATER = {
    'JANRATH 2X3': 48,
    SHATABDI: 52,
  };

  return (
    <>
      <section className="flex flex-col gap-2 p-4 text-xs">
        <div className="font-semibold">Suggestions</div>
        <div>Based on Last 30 days load factor on {route?.name} route.</div>
        {timeTables.length > 0 && (
          <>
            <div>Load Factor:</div>
            <div>Online bookings: </div>

            {timeTables?.map((item, index) => (
              <div key={index}>
                {item?.service?.name?.english}{' '}
                <span className="font-normal">
                  ({BUS_SEATER[item?.service?.name?.english] ?? 'N/A'} Seater):
                </span>
              </div>
            ))}
          </>
        )}
      </section>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="min-w-[150px]">Service</TableHead>
            <TableHead className="min-w-[110px]">Buses</TableHead>
            <TableHead className="min-w-[200px]">Start Date & Time</TableHead>
            <TableHead className="min-w-[200px]">End Date & Time</TableHead>
            <TableHead className="w-[50px]">Headway</TableHead>
            <TableHead className="min-w-[600px]">Vehicles</TableHead>
            <TableHead className="min-w-[150px]">Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeTables.map((item, index) => (
            <TableRow key={index} className="h-[60px]">
              <ServiceRow
                item={item}
                index={index}
                key={index}
                handleFieldChange={handleFieldChange}
                vehicle={vehicle}
                setVehicle={setVehicle}
                frequencyOptions={frequencyOptions}
                route={route}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ServicesData
        timeTables={timeTables}
        frequencyOptions={frequencyOptions}
        setTimeTables={setTimeTables}
        vehicle={vehicle}
        driver={driver}
        conductor={conductor}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </>
  );
}
