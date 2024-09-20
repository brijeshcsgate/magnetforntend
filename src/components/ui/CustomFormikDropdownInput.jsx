import React, { useEffect } from 'react';
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
import { useField, useFormikContext } from 'formik';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { Label } from './label';

/**
 * A custom Formik dropdown input component that provides a label, prefix, and options
 * for a dropdown field. It also supports a callback function, a default value, and
 * disabled state. The component uses the Popover and Command components from the UI library
 * to display the dropdown options and handle selection. It also displays an error message
 * if the field is invalid.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - name {string} - The name of the field.
 *   - label {string} - The label for the field.
 *   - lablePrefix {ReactNode} - An optional prefix for the label.
 *   - defaultValue {string} - The default value for the field.
 *   - callback {function} - An optional callback function to be called when the field value changes.
 *   - isDisabled {boolean} - Whether the field is disabled.
 *   - isRequired {boolean} - Whether the field is required.
 *   - options {Object} - The options for the dropdown field.
 *   - placeholder {string} - The placeholder for the dropdown field.
 *   - labelColor {string} - The color of the label.
 *   - useFormik {boolean} - Whether to use Formik for form handling.
 * @return {JSX.Element} - The CustomFormikDropdownInput component.
 */
export default function CustomFormikDropdownInput({
  name,
  label,
  lablePrefix,
  defaultValue,
  callback = () => {},
  isDisabled = false,
  isRequired,
  options,
  placeholder = 'Select',
  labelColor,
  useFormik = true,
  ...props
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : {};
  const [field, meta] = useFormik
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useField(name)
    : [{ value: defaultValue }, {}];
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ? defaultValue : '');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      if (useFormik) formikContext.setFieldValue(name, defaultValue);
    } else if (useFormik) {
      formikContext.setFieldValue(name, field.value);
      setValue(field.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, defaultValue]);

  const handleSelect = (currentValue) => {
    if (!isDisabled) {
      setValue(currentValue === value ? currentValue : currentValue);
      if (useFormik) formikContext.setFieldValue(name, currentValue);
      const callbackValue = options.options.find(
        (data) => data.value === currentValue
      );
      callback(callbackValue);
      setOpen(false);
    }
  };

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-0.5 w-full', props.className)}
    >
      <Label
        className={cn(
          'to-label c-black v-center mb-1',
          labelColor && labelColor,
          isDisabled && 'opacity-50'
        )}
      >
        {lablePrefix ? lablePrefix : null} {label}
        {isRequired && <span className="text-red-500">&nbsp;*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isDisabled}>
          <section
            className={cn(
              'w-full h-8 border rounded-md flex justify-between items-center px-[17px] py-[6px] text-xs font-medium',
              isDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'border-border-primary bg-white'
            )}
          >
            {value ? (
              options.options.find((option) => option.value === value)?.label
            ) : (
              <span className="text-[#7c7d7e] font-medium text-xs">
                {placeholder}
              </span>
            )}
            <span className="h-4 w-4">
              <ChevronDownIcon
                className={cn('h-4 w-4', isDisabled && 'opacity-50')}
              />
            </span>
          </section>
        </PopoverTrigger>
        {!isDisabled && (
          <PopoverContent className="max-w-md p-0">
            <Command>
              <CommandInput placeholder={`Search`} />
              <CommandList>
                <CommandEmpty>Not found.</CommandEmpty>
                {options?.data.map((d, idx) => (
                  <CommandGroup heading={d?.title} key={idx}>
                    {d.options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSelect}
                      >
                        <span className="mr-2 h-6 w-6 flex items-center justify-center overflow-auto ">
                          <CheckIcon
                            className={cn(
                              'h-5 w-5 text-[#393938]',
                              value === option.value
                                ? 'opacity-75'
                                : 'opacity-0'
                            )}
                          />
                        </span>
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
      {useFormik && meta.error && meta.touched && !isDisabled ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}
