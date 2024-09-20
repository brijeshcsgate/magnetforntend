import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';
import ServiceSection from './ServiceSection';
import { BusFrontIcon } from 'lucide-react';

export default function ServicesData({
  timeTables,
  frequencyOptions,
  setTimeTables,
  vehicle,
  driver,
  conductor,
}) {
  return (
    <Accordion type="multiple" className="p-4 flex flex-col gap-4">
      {timeTables?.map((services, sIdx) => {
        return (
          <React.Fragment key={sIdx}>
            {services.vehiclesTimeTable.length > 0 && (
              <AccordionItem
                key={sIdx}
                value={`item-${sIdx}`}
                className="border border-border-primary rounded-md !p-0 "
              >
                <AccordionTrigger className="bg-blue-primary-200 p-4 rounded-md rounded-b-none text-white">
                  <div className="flex gap-4 font-semibold text-base items-center justify-center">
                    {services.service.name.english}{' '}
                    <span className="bg-white text-blue-primary-200 px-2 py-1 rounded-md text-xs font-semibold flex gap-1 items-center justify-center">
                      <BusFrontIcon className="w-4 h-4 " />
                      {String(services.vehiclesTimeTable.length).padStart(
                        2,
                        '0'
                      )}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 flex flex-col gap-4">
                  {services.vehiclesTimeTable.map(
                    function (vehiclesTimeTable, idx) {
                      return (
                        <ServiceSection
                          key={idx}
                          setTimeTables={setTimeTables}
                          idx={sIdx}
                          sIdx={idx}
                          vehicle={vehicle}
                          frequencyOptions={frequencyOptions}
                          driver={driver}
                          conductor={conductor}
                          vehiclesTimeTable={vehiclesTimeTable}
                          services={services}
                        />
                      );
                    }
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
          </React.Fragment>
        );
      })}
    </Accordion>
  );
}
