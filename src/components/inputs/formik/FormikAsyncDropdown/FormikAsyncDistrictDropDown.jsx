const colourStyles = {
  control: (styles, { isDisabled }) => {
    return {
      background: isDisabled ? "#e0e0e0" : "white",
      display: "flex",
      marginTop: "0.51vw",
      borderRadius: "6px",
      height: "32px",
      border: "1px solid #e0e0e0",
      color: "#000",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "22px",
      letterSpacing: "0.28px",
    };
  },
  menu: () => {
    return {
      fontSize: "12px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      boxShadow: "0 1px 0 rgb(0 0 0 / 6%)",
      boxSizing: "border-box",
      overflowY: "auto",
      position: "absolute",
      width: "100%",
      borderRadius: "0.5vw",
      zIndex: "50",
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      maxHeight: "10vw !important",
      overflowY: "auto !important",
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      fontSize: "12px",
      backgroundColor: isSelected ? "#f2f9fc" : "#fff",
      cursor: "pointer",
      color: "#333",
      padding: "0.51vw 1vw",
    };
  },
  multiValue: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      padding: "0",
    };
  },
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
};

import axios from "axios";
import AxiosInstance from "@/services/baseService";
import { useField, useFormikContext } from "formik";
import debounce from "lodash/debounce";
import { useEffect, useState, useCallback } from "react";
import Select from "react-select";

const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

const FormikAsyncDistrictDropdown = ({
  name,
  label,
  id,
  defaultValue,
  endpoint,
  otherFilters = {},
  callback = () => {},
  isDisabled,
  isRequired,
  filterdFunction,
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

      // let newOption = filterdFunction(data).map((item) => ({
      //   value: item?._id,
      //   label: item?.name?.english,
      // }));
      // filterdFunction={(res) => {
      //   return Object.values(res?.data)?.[0]
      //     ?.districtId;
      // }}
      // setOptions(newOption);
     
    } catch (error) {
      console.error("Error fetching options:", error);
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
    fetchOptions("", defaultValue, otherFilters);
  }, [defaultValue, JSON.stringify(otherFilters)]);

  const selectedValue = props.isMulti
    ? options.filter(({ value }) => field?.value?.includes(value))
    : options.find(({ value }) => value === field.value);

  return (
    <div>
      <label className="to-label c-black" htmlFor={id}>
        {label}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <Select
        {...props}
        id={id}
        classNamePrefix="my-async-select"
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
      {meta.error && !meta.value && !isDisabled ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikAsyncDistrictDropdown;

// import { useField, useFormikContext } from "formik";
// import debounce from "lodash/debounce";
// import { useEffect, useState, useCallback } from "react";
// import Select from "react-select";

// const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

// const FormikAsyncDistrictDropdown = ({
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

//       const { data } = await axios.get(
//         `http://localhost:3001/api/v2/masters/region/districtByRegion/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//    
//       setOptions(data.data);
//     } catch (error) {
//       console.error("Error fetching options:", error);
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
//     fetchOptions("", defaultValue, otherFilters);
//   }, [defaultValue, JSON.stringify(otherFilters)]);

//   const selectedValue = props.isMulti
//     ? options.filter(({ value }) => field?.value?.includes(value))
//     : options.find(({ value }) => value === field.value);
//  
//   return (
//     <div>
//       <label className="to-label c-black" htmlFor={id}>
//         {label}
//         {isRequired && <span style={{ color: "red" }}> *</span>}
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

// export default FormikAsyncDistrictDropdown;
