import * as React from "react";
import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AxiosInstance from '@/services/baseService';
import { useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { useEffect, useState, useCallback } from 'react';
import SelectV from 'react-select';
const colourStyles = {
  control: (styles, { isDisabled }) => ({
    background: isDisabled ? '#e0e0e0' : 'white',
    display: 'flex',
    marginTop: '0.51vw',
    borderRadius: '6px',
    minHeight: '32px',
    height: '100%',
    border: '1px solid #e0e0e0',
    color: '#000',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '22px',
    letterSpacing: '0.28px',
  }),
  menu: (styles) => ({
    ...styles,
    fontSize: '12px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    boxShadow: '0 1px 0 rgb(0 0 0 / 6%)',
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    borderRadius: '0.5vw',
    zIndex: '50',
    /* Ensure that the dropdown opens below the select input */
    top: '100%',   // Set dropdown to open below
    bottom: 'auto', // Disable upward positioning
    transform: 'translateY(0)', // Reset any negative transform
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '10vw !important',
    overflowY: 'auto !important',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    fontSize: '12px',
    backgroundColor: isSelected ? '#f2f9fc' : '#fff',
    cursor: 'pointer',
    color: '#333',
    padding: '0.51vw 1vw',
  }),
  multiValue: (styles) => ({
    padding: '0',
    display: 'flex',
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
};

const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

const CustomOptionSelect = ({ name, label, placeholder, options, className = "" }) => {
  return (
    <div>
      <Label htmlFor={name}>
          {label}{' '}
        </Label>
    
    <Field name={name} className="custom-select-component"> 
      
      {({ field, form }) => (
        <Select
          value={form.values[name]}
          onValueChange={(value) =>{ form.setFieldValue(name, value)}}
        >
          <SelectTrigger className={` ${className}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='dropdown-list-limit'>
            <SelectGroup>
              {/* <SelectLabel>{label}</SelectLabel> */}
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </Field>
    </div>
  );
};


// export const CustomOptionSelectAsync = ({
//   name,
//   label,
//   id,
//   defaultValue,
//   endpoint,
//   otherFilters = {},
//   callback = () => {},
//   isDisabled,
//   isRequired,
//   ...props
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);
//   const [options, setOptions] = useState([] || defaultValue);
//   const [loading, setLoading] = useState(false);

//   const fetchOptions = async (inputValue, defaultValue, filters) => {
//     try {
//       setLoading(true);
//       let params = { limit: 100, ...filters };
//       if (inputValue || defaultValue) {
//         params = {
//           search: inputValue,
//           ...(defaultValue ? { _id: defaultValue } : {}),
//           ...filters,
//         };
//       }
//       const { data } = await AxiosInstance.get(
//         `${endpoint ? endpoint : getDefaultEndpoint(id)}`,
//         { params }
//       );
//       setOptions(data.data);
//     } catch (error) {
//       console.error('Error fetching options:', error);
//       setOptions([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const debouncedFetchOptions = useCallback(
//     debounce(async (inputValue, filters) => {
//       await fetchOptions(inputValue, null, filters);
//     }, 300),
//     []
//   );

//   const handleChange = (selectedOption) => {
//     if (props.isMulti) {
//       const ids = selectedOption.map((option) => option.value);
//       setFieldValue(name, ids);
//       callback(selectedOption);
//       return;
//     }
//     setFieldValue(name, selectedOption?.value || null);
//     callback(selectedOption);
//   };

//   const handleInputChange = (inputValue) => {
//     debouncedFetchOptions(inputValue, otherFilters);
//   };

//   useEffect(() => {
//     fetchOptions('', defaultValue, otherFilters);
//   }, [defaultValue, JSON?.stringify(otherFilters)]);

//   const selectedValue = props?.isMulti
//   ? Array.isArray(options) ? options.filter(({ value }) => field?.value?.includes(value)) : []
//   : Array.isArray(options) ? options.find(({ value }) => value === field?.value) : null;

//   return (
//     <div>
//        <Label htmlFor={name}>
//           {label}{' '}
//         </Label>
        
//       <SelectV
//         {...props}
//         id={id}
//         menuPortalTarget={document?.body}
//         className="custom-select "
//         classNamePrefix="custom-select my-async-select "
//         name={name}
//         value={selectedValue || null}
//         options={options}
//         onChange={handleChange}
//         onInputChange={handleInputChange}
//         isClearable
//         isLoading={meta?.touched && meta?.isLoading}
//         isDisabled={meta?.isSubmitting || isDisabled}
//         styles={colourStyles}
//       />
//       {meta?.error && meta?.touched && !meta?.value && !isDisabled ? (
//         <div className="error-message">{meta?.error}</div>
//       ) : null}
//     </div>
//   );
// };
export const CustomOptionSelectAsync = ({
  name,
  label,
  id,
  defaultValue,
  endpoint,
  otherFilters = {},
  callback = () => {},
  isDisabled,
  isRequired,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchOptions = async (inputValue, defaultValue, filters) => {
  try {
    setLoading(true);
    let params = { limit: 100, ...filters };
    if (inputValue || defaultValue) {
      params = {
        search: inputValue,
        ...(defaultValue ? { _id: defaultValue } : {}),
        ...filters,
      };
    }
    const { data } = await AxiosInstance.get(
      `${endpoint ? endpoint : getDefaultEndpoint(id)}`,
      { params }
    );
    const optionsData = data.data.vehicles.map((vehicle) => ({
      label: vehicle.label, 
      value: vehicle.value, 
    }));
    setOptions(optionsData);
  } catch (error) {
    console.error('Error fetching options:', error);
    setOptions([]);
  } finally {
    setLoading(false);
  }
};

  const debouncedFetchOptions = useCallback(
    debounce(async (inputValue, filters) => {
      await fetchOptions(inputValue, null, filters);
    }, 300),
    []
  );

  const handleChange = (selectedOption) => {
    if (props.isMulti) {
      const ids = selectedOption.map((option) => option.value);
      setFieldValue(name, ids);
      callback(selectedOption);
      return;
    }
    setFieldValue(name, selectedOption?.value || null);
    callback(selectedOption);
  };

  const handleInputChange = (inputValue) => {
    debouncedFetchOptions(inputValue, otherFilters);
  };

  useEffect(() => {
    fetchOptions('', defaultValue, otherFilters);
  }, [defaultValue, JSON?.stringify(otherFilters)]);

const selectedValue = props?.isMulti
  ? Array.isArray(options) ? options.filter(({ value }) => field?.value?.includes(value)) : []
  : Array.isArray(options) ? options.find(({ value }) => value === field?.value) : null;
  return (
    <div>
       <Label htmlFor={name}>
          {label}{' '}
        </Label>
        
      <SelectV
        {...props}
        id={id}
        menuPortalTarget={document?.body}
        className="custom-select "
        classNamePrefix="custom-select my-async-select "
        name={name}
        value={selectedValue || null}
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable
        isLoading={meta?.touched && meta?.isLoading}
        isDisabled={meta?.isSubmitting || isDisabled}
        styles={colourStyles}
      />
      {meta?.error && meta?.touched && !meta?.value && !isDisabled ? (
        <div className="error-message">{meta?.error}</div>
      ) : null}
    </div>
  );
};
export default CustomOptionSelect;
