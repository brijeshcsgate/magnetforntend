import { useField, useFormikContext } from 'formik';
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

/**
 * Renders a multi-select dropdown component with Formik integration.
 *
 * @param {Object} props - The props object.
 * @param {string} props.name - The name of the multi-select field.
 * @param {string} props.label - The label for the multi-select.
 * @param {Array<{value: string, label: string}>} props.options - The options for the multi-select.
 * @param {Function} [props.callback] - The callback function to be called on multi-select selection. Defaults to a no-op function.
 * @param {boolean} [props.isDisabled] - Indicates if the multi-select is disabled. Defaults to false.
 * @param {boolean} [props.isRequired] - Indicates if the multi-select is required. Defaults to false.
 * @param {string} [props.placeholder] - The placeholder text for the input field. Defaults to "Select".
 * @param {number} [props.maxSelected] - The maximum number of selectable items. Defaults to 99.
 * @param {Array<{value: string, label: string}>} [props.defaultValue] - The default selected options. Defaults to an empty array.
 * @param {Object} props.props - Additional props for the component.
 * @returns {JSX.Element} The rendered multi-select dropdown component.
 */
export default function MultiSelectDropdown({
  name,
  label,
  options,
  callback = () => {},
  isDisabled = false,
  isRequired = false,
  placeholder = 'Select',
  maxSelected = 99,
  defaultValue = [],
  useFormik = true,
  ...props
}) {
  const { setFieldValue } = useFormik
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFormikContext()
    : {};
  const [meta] = useFormik
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useField(name)
    : [{ value: defaultValue }, {}];
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selected, setSelected] = React.useState([]);

  // Initialize selected options based on defaultValue
  React.useEffect(() => {
    const initialSelected = options.filter((option) =>
      defaultValue.some((d) => d.value === option.value)
    );
    setSelected(initialSelected);
    // setFieldValue(name, initialSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleUnselect = (option) => {
    if (!isDisabled) {
      const newSelected = selected.filter((s) => s.value !== option.value);
      setSelected(newSelected);
      if (useFormik) setFieldValue(name, newSelected);
      callback(newSelected);
    }
  };

  const handleKeyDown = (e) => {
    if (!isDisabled) {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
            if (useFormik) setFieldValue(name, newSelected);
            callback(newSelected);
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    }
  };

  const selectables = options.filter(
    (option) => !selected.some((s) => s.value === option.value)
  );

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-0.5 w-full', props.className)}
    >
      <label
        className={`to-label c-black v-center ${
          isDisabled ? 'opacity-50' : ''
        }`}
      >
        {label}
        {isRequired && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <Command
        onKeyDown={handleKeyDown}
        className={`overflow-visible bg-transparent relative ${
          isDisabled ? 'cursor-not-allowed' : ''
        }`}
      >
        <div
          className={`group min-h-8 border ${
            isDisabled ? 'cursor-not-allowed opacity-50' : ''
          } rounded-md text-xs px-[17px] py-[6px] font-medium border-border-primary`}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => (
              <Badge key={option.value}>
                {option.label}
                {!isDisabled && (
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </Badge>
            ))}
            {isDisabled && (
              <span className="text-[#7c7d7e] font-medium text-xs mt-0.5">
                {placeholder}
              </span>
            )}
            {!isDisabled && (
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => {
                  setOpen(false);
                }}
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                className="ml-2 flex-1 bg-transparent outline-none placeholder:text-[#7c7d7e] font-medium mt-0.5"
              />
            )}
          </div>
        </div>
        <div className="relative">
          <CommandList>
            {open && selectables.length > 0 && !isDisabled ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-white text-popover-foreground shadow-md outline-none animate-in max-h-[175px] overflow-y-auto scrollbar">
                <CommandGroup className="h-full overflow-auto z-50">
                  {selectables.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        if (selected.length < maxSelected) {
                          setInputValue('');
                          const newSelected = [...selected, option];
                          setSelected(newSelected);
                          if (useFormik) setFieldValue(name, newSelected);
                          callback(newSelected);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
      {useFormik && meta.error && meta.touched && !isDisabled ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}
