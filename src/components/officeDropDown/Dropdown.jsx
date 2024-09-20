import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
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
import { CheckIcon, chevronDown } from '@/assets/Icons';
import { cn } from '@/lib/utils';
// const getDefaultEndpoint = (id) => `v2/masters/search/${id}`
const Dropdown = ({
  name,
  label,
  id,
  defaultStatus,
  defaultValue,
  placeholder,
  isDisabled,
  isRequired,
  allwasyDisable,
  rest,
  callback,
  options,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  //   const [options,setOptions]=useState()

  const onOpenHandler = () => {
    if (isDisabled) {
      setOpen(false);
    } else {
      if (!allwasyDisable) {
        setOpen(!open);
      }
    }
  };
  useEffect(() => {
    if (isDisabled || rest) {
      setValue('');
    }

    if (defaultStatus) {
      setValue(defaultValue);
    }
  }, [isDisabled, defaultValue, rest]);

  return (
    <div className="w-100">
      <label className="to-label c-black v-center pb-1" htmlFor={id}>
        {label}
        {isRequired && <span style={{ color: 'red' }}>&nbsp;*</span>}
      </label>
      <Popover open={open} onOpenChange={onOpenHandler}>
        <PopoverTrigger asChild>
          <section
            className={`w-full h-8 border border-[#e0e0e0] rounded-md flex justify-between items-center px-[17px] py-[6px] text-xs font-medium ${
              isDisabled || allwasyDisable ? 'bg-disable' : ''
            }`}
          >
            {value ? (
              value
            ) : (
              <span className={`text-[#888080]`}>{placeholder}</span>
            )}
            <span className="h-4 w-4">
              {chevronDown({ className: 'h-4 w-4 -mr-2 text-[#e0e0e0]' })}
            </span>
          </section>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search`} />
            <CommandList>
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.value}
                    onSelect={() => {
                      setValue(option.value === value ? '' : option.value);
                      setFieldValue(
                        name,
                        option.value === value ? '' : option.id
                      );
                      if (callback) {
                        callback();
                      }

                      setOpen(false);
                    }}
                  >
                    <span className="mr-2 h-6 w-6 flex items-center justify-center overflow-auto ">
                      {CheckIcon({
                        className: cn(
                          'h-5 w-5 text-[#393938]',
                          value === option.value ? 'opacity-75' : 'opacity-0'
                        ),
                      })}
                    </span>
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {meta.error && meta.touched && !meta.value && !isDisabled ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};
// options.find((option) => option.value === value)?.label
export default Dropdown;
