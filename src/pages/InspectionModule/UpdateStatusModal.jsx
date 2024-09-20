import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/common/Button/Button';
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
import { APIS } from '@/constants/api.constant';
import { postApi } from '@/services/method';
import { statusData } from '../Vehicles/PreviewVehicle/StatusCombobox';

export default function UpdateStatusModal({
  open,
  setOpen,
  ids,
  status: value,
  setStatus: setValue,
}) {
  const [openCombobox, setOpenCombobox] = useState(false);
  const handleStatusChange = (value) => {
    try {
      const data = {
        ids: ids,
        status: value,
      };

      let backendURL = `${APIS.UPDATE_VEHICLE_STATUS}`;
      postApi(backendURL, data)
        .then((response) => {
          toast.success('Status updated successfully');
        })
        .finally(() => setOpen(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            You can update status of selected vehicles
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 grid-cols-2">
          <div className="text-xs font-medium text-gray-secondary">
            Status :
          </div>
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
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
                          setValue(
                            currentValue === value ? value : currentValue
                          );
                          setOpenCombobox(false);
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
        </div>
        <DialogFooter>
          <Button type="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => handleStatusChange(value)}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
