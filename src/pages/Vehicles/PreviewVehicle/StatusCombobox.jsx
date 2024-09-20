import { VehicleService } from '@/services/VehicleService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { editIcon } from '@/assets/Icons';

export const statusData = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'disabled',
    label: 'Disabled',
  },
  {
    value: 'in workshop',
    label: 'In Workshop',
  },
  {
    value: 'out of service',
    label: 'Out of Service',
  },
];
export default function StatusCombobox({
  id,
  status: value,
  setStatus: setValue,
}) {
  const [open, setOpen] = useState(false);

  const handleStatusChange = (value) => {
    VehicleService.updateVehicleById(
      id,
      {
        status: value,
      },
      handleUpdateVehicleSuccess
    );
  };

  const handleUpdateVehicleSuccess = () => {
    toast.success('Vehicle Status updated successfully');
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="heading-400-10 text-gray-secondary flex gap-1 p-1 rounded-md  hover:bg-gray-quaternary/10 cursor-pointer items-center justify-center group">
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                value === statusData[0].value && 'bg-green-500',
                value === statusData[1].value && 'bg-gray-500',
                value === statusData[2].value && 'bg-orange-500',
                value === statusData[3].value && 'bg-red-500'
              )}
            />{' '}
            {value
              ? statusData.find((s) => s?.value === value)?.label
              : 'Select Status...'}
            <div className="group-hover:visible invisible">
              {editIcon({ width: 12, height: 12 })}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Status..." />
            <CommandList>
              <CommandEmpty>No Status found.</CommandEmpty>
              <CommandGroup>
                {statusData.map((s) => (
                  <CommandItem
                    key={s.value}
                    value={s.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? value : currentValue);
                      setOpen(false);
                      handleStatusChange(
                        currentValue === value ? value : currentValue
                      );
                    }}
                  >
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full mr-2',
                        s.value === statusData[0].value && 'bg-green-500',
                        s.value === statusData[1].value && 'bg-gray-500',
                        s.value === statusData[2].value && 'bg-orange-500',
                        s.value === statusData[3].value && 'bg-red-500'
                      )}
                    />
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
