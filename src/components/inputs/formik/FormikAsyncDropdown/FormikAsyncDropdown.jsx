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
    /* Ensure that it can be positioned upwards */
    top: 'auto',
    bottom: '100%',
    transform: 'translateY(-4px)',
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

// import AxiosInstance from "@/services/baseService";
// import { useField, useFormikContext } from "formik";
// import debounce from "lodash/debounce";
// import { useEffect, useState } from "react";
// import Select from "react-select";

// const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

// const FormikAsyncDropdown = ({
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
//   const [options, setOptions] = useState([]);
//   // console.log(otherFilters, "otherFilters");
//   const fetchOptions = async (inputValue, defaultValue, filters) => {
//     try {
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
//       // console.log("options", data.data, field.name);
//     } catch (error) {
//       console.error("Error fetching options:", error);
//       return [];
//     }
//   };

//   const debouncedFetchOptions = debounce(async (inputValue, filters) => {
//     await fetchOptions(inputValue, filters);
//   }, 300);

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
//     if (!inputValue) debouncedFetchOptions(defaultValue || "");
//     debouncedFetchOptions(inputValue);
//   };

//   useEffect(() => {
//     fetchOptions("", defaultValue, otherFilters);
//   }, [defaultValue, ...Object.values(otherFilters)]);
//   const selectedValue = props.isMulti
//     ? options.filter(({ value }) => field?.value?.includes(value))
//     : options.find(({ value }) => value === field.value);

//   return (
//     <div>
//       <label className="troo-label c-black" htmlFor={id}>
//         {label}
//         {isRequired && <span style={{ color: "red" }}>*</span>}
//       </label>
//       <Select
//         {...props}
//         id={id}
//         classNamePrefix="my-async-select"
//         name={name}
//         value={selectedValue || null}
//         options={options}
//         onChange={handleChange}
//         onInputChange={handleInputChange}
//         isClearable
//         isLoading={meta.touched && meta.isLoading}
//         isDisabled={meta.isSubmitting || isDisabled}
//         styles={colourStyles}
//       />
//       {meta.error && !meta.value && !isDisabled ? (
//         <div className="error-message">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// export default FormikAsyncDropdown;

// top code hi current code hai

import AxiosInstance from '@/services/baseService';
import { useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';

const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

const FormikAsyncDropdown = ({
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
  const [options, setOptions] = useState([] || defaultValue);
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
      // console.log(`async drop down url-${name}->`, endpoint);
      const { data } = await AxiosInstance.get(
        `${endpoint ? endpoint : getDefaultEndpoint(id)}`,
        { params }
      );
      setOptions(data.data);
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
  }, [defaultValue, JSON.stringify(otherFilters)]);

  const selectedValue = props.isMulti
    ? options.filter(({ value }) => field?.value?.includes(value))
    : options.find(({ value }) => value === field.value);
  // console.log(`async drop down url before-${name}->`, endpoint);
  return (
    <div>
      <label className="to-label c-black" htmlFor={id}>
        {label}
        {isRequired && <span style={{ color: 'red' }}> *</span>}
      </label>
      <Select
        {...props}
        id={id}
        menuPortalTarget={document.body}
        className="custom-select "
        classNamePrefix="custom-select my-async-select "
        name={name}
        value={selectedValue || null}
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable
        isLoading={meta.touched && meta.isLoading}
        isDisabled={meta.isSubmitting || isDisabled}
        styles={colourStyles}
      />
      {meta.error && meta.touched && !meta.value && !isDisabled ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikAsyncDropdown;

// import { useMemo, useState } from "react";
// import Select from "react-select";
// import debounce from "lodash/debounce";
// import { useField, useFormikContext } from "formik";

// import AxiosInstance from "@/services/baseService";

// const colourStyles = {
//   control: (styles, { isDisabled }) => {
//     return {
//       background: isDisabled ? "#e0e0e0" : "white",
//       display: "flex",
//       marginTop: "0.51vw",
//       borderRadius: "6px",
//       height: "32px",
//       border: "1px solid #e0e0e0",
//       color: "#000",
//       fontSize: "12px",
//       fontStyle: "normal",
//       fontWeight: "500",
//       lineHeight: "22px",
//       letterSpacing: "0.28px",
//     };
//   },
//   menu: () => {
//     return {
//       fontSize: "12px",
//       backgroundColor: "white",
//       border: "1px solid #ccc",
//       boxShadow: "0 1px 0 rgb(0 0 0 / 6%)",
//       boxSizing: "border-box",
//       overflowY: "auto",
//       position: "absolute",
//       width: "100%",
//       borderRadius: "0.5vw",
//       zIndex: "1",
//     };
//   },
//   menuList: (styles) => {
//     return {
//       ...styles,
//       maxHeight: "10vw !important",
//       overflowY: "auto !important",
//     };
//   },
//   option: (styles, { isDisabled, isFocused, isSelected }) => {
//     return {
//       fontSize: "12px",
//       backgroundColor: isSelected ? "#f2f9fc" : "#fff",
//       cursor: "pointer",
//       color: "#333",
//       padding: "0.51vw 1vw",
//     };
//   },
//   multiValue: (styles, { isDisabled, isFocused, isSelected }) => {
//     return {
//       padding: "0",
//     };
//   },
//   indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
// };

// const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

// const FormikAsyncDropdown = ({
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
//   const [options, setOptions] = useState([]);

//   const fetchOptions = async (
//     inputValue,
//     defaultValue,
//     filters,
//     retryCount = 0
//   ) => {
//     let params = { limit: 100, ...filters };
//     if (inputValue || defaultValue) {
//       params = {
//         search: inputValue,
//         ...(defaultValue ? { _id: defaultValue } : {}),
//         ...filters,
//       };
//     }

//     try {
//       const { data } = await AxiosInstance.get(
//         `${endpoint ? endpoint : getDefaultEndpoint(id)}`,
//         { params }
//       );

//       setOptions(data.data);
//       // console.log("options", data.data, field.name);
//     } catch (error) {
//       if (retryCount < 3) {
//         // Retry up to 3 times
//         // console.log(`Retrying... Attempt ${retryCount + 1}`);
//         return fetchOptions(inputValue, defaultValue, filters, retryCount + 1);
//       } else {
//         // console.error(
//         //   "Max retries exceeded. Returning empty array. Error fetching options:",
//         //   error
//         // );
//         setOptions([]);
//         return [];
//       }
//     }
//   };

//   const debouncedFetchOptions = debounce(async (inputValue, filters) => {
//     await fetchOptions(inputValue, filters);
//   }, 300);

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
//     if (!inputValue) debouncedFetchOptions(defaultValue || "");
//     debouncedFetchOptions(inputValue);
//   };

//   useMemo(() => {
//     fetchOptions("", defaultValue, otherFilters);
//   }, [defaultValue, ...Object.values(otherFilters)]);

//   const selectedValue = props.isMulti
//     ? options.filter(({ value }) => field?.value?.includes(value))
//     : options.find(({ value }) => value === field.value);

//   return (
//     <div className="troo-input-field">
//       <label className="troo-label c-black" htmlFor={id}>
//         {label}
//         {isRequired && <span style={{ color: "red" }}>*</span>}
//       </label>
//       <Select
//         {...props}
//         id={id}
//         classNamePrefix="my-async-select"
//         name={name}
//         value={selectedValue || null}
//         options={options}
//         onChange={handleChange}
//         onInputChange={handleInputChange}
//         isClearable
//         isLoading={meta.touched && meta.isLoading}
//         isDisabled={meta.isSubmitting || isDisabled}
//         styles={colourStyles}
//       />
//       {meta.error && meta.touched && !isDisabled ? (
//         <div className="error-message">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// export default FormikAsyncDropdown;
